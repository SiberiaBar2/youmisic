// import { useState, useEffect } from "react";

// export function useDebounce(value, delay = 300) {
//     const [debouncedValue, setDebouncedValue] = useState(value);
//       useEffect(() => {
//         const handler = window.setTimeout(() => {
//           setDebouncedValue(value);
//         }, delay);
//         return () => {
//           clearTimeout(handler);
//         };
//     }, [value, delay]);
//     return debouncedValue;
// }

import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后设置一个定时器
        let timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一个的effect执行完后执行
        return () => clearTimeout(timeout);
    }, [delay, value]);

    return debouncedValue;
};