import {useState, useEffect, useCallback} from 'react';

export const useSyncCallback = (callback) => {
    const [proxyState, setProxyState] = useState({current: false});
    const [parameters, setParameters] = useState();

    const Func = useCallback((val) => {
        setParameters(val);
        setProxyState({current: true});
    }, []);

    useEffect(() => {
        if (proxyState.current === true) {
            setProxyState({current: false});
        }
    }, [proxyState]);

    useEffect(() => {
        proxyState.current && callback(parameters);
    });

    return Func;
};
