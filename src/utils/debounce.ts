import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
    const [debounceSearch, setDebounceSearch] = useState(value);

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            setDebounceSearch(value)
        }, delay);

        return () => clearTimeout(searchTimeout)
    }, [delay, value]);

    return debounceSearch;
}