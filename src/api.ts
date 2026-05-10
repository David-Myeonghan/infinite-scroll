import api from './fetcher';

export type Product = {
	id: number;
	title: string;
	price: number;
};

type GetProductsResponse = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};

type GetProductsParams = {
	limit?: number;
	skip?: number;
	select?: string; // comma-separated
};

export const getProducts = ({
	limit = 10,
	skip,
	select,
}: GetProductsParams = {}) =>
	api.get<GetProductsResponse>('/products', {
		params: { limit, skip, select },
	});

// EXAMPLE
type AddProductBody = {
	title: string;
	price: number;
};
export const addProduct = (body: AddProductBody) =>
	api.post<Product>('/products/add', { body });
