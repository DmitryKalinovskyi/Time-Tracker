import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: any = "") {
    // Get the initial value from localStorage or use the provided initialValue
    const getInitialValue = () => {
        const storedValue = localStorage.getItem(key);
        return JSON.parse(storedValue ?? initialValue); // Parse directly here
    };

    const [value, setValue] = useState(getInitialValue);

    // Update localStorage whenever the state changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;