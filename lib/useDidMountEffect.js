import { useEffect, useRef } from 'react';

const useDidMountEffect = (fn, dependencies) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) fn();
        else didMount.current = true;
    }, dependencies);
};

export default useDidMountEffect;
