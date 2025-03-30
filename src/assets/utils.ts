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

export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
};

export const getDogs = async (dogIds: string[], callback: (dogs: Dog[]) => void) => {
    const response = await getData('/dogs', 'POST', JSON.stringify(dogIds));

    if (response.ok) {
        const dogs = await response.json();
        callback(dogs);
    }
}
