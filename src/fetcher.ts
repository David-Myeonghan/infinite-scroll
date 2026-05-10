const BASE_URL = 'https://dummyjson.com'; // import from somewhere

type QueryParams = Record<string, string | number | boolean | undefined>;

type RequestOptions = Omit<RequestInit, 'body' | 'method'> & {
	params?: QueryParams;
};

type WriteOptions = RequestOptions & {
	body?: unknown; // 기본 body 타입은 좁음(plain object 없음) → unknown으로 넓힘
};

async function fetcher<T>(
	method: string,
	path: string,
	options: WriteOptions = {},
	baseUrl: string = BASE_URL,
): Promise<T> {
	const { params, body, headers } = options;

	const url = new URL(path, baseUrl);
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined) {
				url.searchParams.set(key, String(value));
			}
		}
	}

	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (response.ok !== true) {
		throw new Error(`${response.status}`, { cause: response });
	}

	return response.json();
}

const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		fetcher<T>('GET', path, options),
	post: <T>(path: string, options?: WriteOptions) =>
		fetcher<T>('POST', path, options),
	put: <T>(path: string, options?: WriteOptions) =>
		fetcher<T>('PUT', path, options),
	patch: <T>(path: string, options?: WriteOptions) =>
		fetcher<T>('PATCH', path, options),
	delete: <T>(path: string, options?: WriteOptions) =>
		fetcher<T>('DELETE', path, options),
};

export default api;
