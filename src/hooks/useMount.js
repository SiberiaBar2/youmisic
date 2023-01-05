import { useEffect } from "react";

export const useMount = (callBack) => {
    useEffect(() => {
      callBack();
    }, []);
};
