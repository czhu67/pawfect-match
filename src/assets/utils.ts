export const getData = async (endpoint: string, method: string, body?: string) => {
	const response = await fetch(`https://frontend-take-home-service.fetch.com${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body,
		redirect: 'follow',
		credentials: 'include',
	});

	return response;
};

export interface Sort {
	breed?: string;
	name?: string;
	age?: string;
}
