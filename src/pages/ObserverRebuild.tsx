import { useCallback, useEffect, useRef, useState } from 'react';
import { getProducts, type Product } from '../api';
import Contents from '../components/Contents';

/**
 * Observer Rebuild 패턴 (chained useCallback)
 * - fetchData/callback이 매 렌더 재생성 → observer가 페이지마다 disconnect/reconnect
 * - 재생성 시 observer가 sync로 callback 발사 → sentinel 보이면 자동 연속 트리거
 * - 단점: stale closure 위험, observer churn, StrictMode 중복
 */
export default function ObserverRebuild() {
	const observerRef = useRef<HTMLDivElement>(null);
	const [pageOffset, setPageOffset] = useState(0);
	const [data, setData] = useState<Array<Product>>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		const { products } = await getProducts({ skip: pageOffset * 10 });
		setData([...data, ...products]);
		setPageOffset(pageOffset + 1);
		setIsLoading(false);
	}, [pageOffset, data]);

	const callback = useCallback<IntersectionObserverCallback>(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !isLoading) {
					fetchData();
				}
			});
		},
		[fetchData, isLoading],
	);

	useEffect(() => {
		const el = observerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(callback);
		observer.observe(el);
		return () => observer.disconnect();
	}, [callback]);

	return (
		<>
			<h2>Observer Rebuild 패턴</h2>
			<Contents data={data} />
			{isLoading && <div>Loading...</div>}
			<div
				ref={observerRef}
				style={{ height: 30, width: '100%', background: '#ffcccc' }}
			/>
		</>
	);
}
