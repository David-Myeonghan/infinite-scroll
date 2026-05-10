import { useCallback, useEffect, useRef, useState } from 'react';
import { getProducts, type Product } from '../api';
import Contents from '../components/Contents';

/**
 * Stable Observer 패턴
 * - observer는 한 번만 등록 (useCallback([]))
 * - fetch는 별도 effect에서 pageOffset 변경에 반응
 * - 함수형 setState로 stale closure 방지
 * - cancellation flag로 StrictMode 중복 방지
 */
export default function StableObserver() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [pageOffset, setPageOffset] = useState(0);
	const [data, setData] = useState<Array<Product>>([]);
	const observerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let cancelled = false;
		getProducts({ skip: pageOffset * 10 }).then(({ products }) => {
			if (cancelled) return;
			setData((prev) => [...prev, ...products]);
			setIsLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [pageOffset]);

	const onIntersect = useCallback<IntersectionObserverCallback>((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setIsLoading(true);
				setPageOffset((prev) => prev + 1);
			}
		});
	}, []);

	useEffect(() => {
		const el = observerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(onIntersect);
		observer.observe(el);
		return () => observer.disconnect();
	}, [onIntersect]);

	return (
		<>
			<h2>Stable Observer 패턴</h2>
			<Contents data={data} />
			{isLoading && <div>Loading...</div>}
			<div
				ref={observerRef}
				style={{ height: 30, width: '100%', background: '#cce5ff' }}
			/>
		</>
	);
}
