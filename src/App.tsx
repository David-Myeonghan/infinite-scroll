import { useEffect, useState } from 'react';
import './App.css';
import { getProducts, type Product } from './api';

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [pageOffset, setPageOffset] = useState(0);
	const [data, setData] = useState<Array<Product>>([]);

	useEffect(() => {
		let cancelled = false;

		const getData = async () => {
			const { products } = await getProducts({ skip: pageOffset * 10 });
			if (cancelled) return;
			setData((prev) => [...prev, ...products]);
			setPageOffset((prev) => prev + 1);
			setIsLoading(false);
		};
		getData();

		return () => {
			cancelled = true;
		};
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<ul>
			{data.map((product) => (
				<li key={product.id}>
					{product.title} / {product.price}
				</li>
			))}
		</ul>
	);
}

export default App;
