import { useRef, useState, useEffect } from "react";

const NUMS = {
    ZERO: 0,
    ONE: 1,
};

export const useStateSync = (initValue) => {

    const ref = useRef(NUMS.ZERO);
    const callFRef = useRef();
    const setFuncRef = useRef();
    const [state, setState] = useState(initValue);
    if (!ref.current) {
        ref.current = NUMS.ONE;
        setFuncRef.current = (newData, callF) => {
            callFRef.current = callF;
            setState(newData);
            return Promise.resolve(newData);
        };
    }
    useEffect(() => {
        callFRef.current?.(state);
    }, [state]);
    return [state, setFuncRef.current];
};
