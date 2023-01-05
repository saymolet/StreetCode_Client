import { DependencyList, useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
const useAsyncInternal = (func: Function, deps: DependencyList = [], initialLoading = true) => {
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState<never | undefined>();
    const [value, setValue] = useState<never | undefined>();

    const execute = useCallback(async (...params: never[]) => {
        setLoading(true);

        try {
            const data = await func(...params);

            setValue(data);
            setError(undefined);

            return data;
        } catch (err: any) {
            setError(err);
            setValue(undefined);

            return await Promise.reject(error);
        } finally {
            setLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, func]);

    return {
        loading,
        error,
        value,
        execute,
    };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const useAsync = (func: Function, deps: DependencyList = [], cb?: () => void) => {
    const { execute, ...state } = useAsyncInternal(func, deps);

    useEffect(() => {
        execute().then((data) => cb ?? (() => console.log(data)));
    }, [cb, execute]);

    return state;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const useAsyncFn = (func: Function, deps: DependencyList = []) => useAsyncInternal(
    func,
    deps,
    false,
);
