import { Fragment } from 'react/jsx-runtime';
import type { Product } from '../api';

interface ContentsProps {
	data: Array<Product>;
}
export default function Contents({ data }: ContentsProps) {
	return (
		<>
			<table>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
				{data.map((product) => (
					<tr>
						<Fragment key={product.id}>
							<td>{product.title}</td>
							<td>{product.price}</td>
						</Fragment>
					</tr>
				))}
			</table>
		</>
	);
}
