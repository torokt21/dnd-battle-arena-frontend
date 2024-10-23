import { useCallback, useEffect, useState } from "react";

export default function useResource<T>(props: { url: string }) {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<T>();
	const [error, setError] = useState(false);

	const fetchResource = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(process.env.REACT_APP_API_URL + props.url);
			const data = await response.json();
			setResult(data);
		} catch (error) {
			setError(true);
		}
		setLoading(false);
	}, [props.url]);

	const refetch = () => {
		fetchResource();
	};

	useEffect(() => {
		fetchResource();
	}, [fetchResource]);

	return { loading, result, error, refetch };
}
