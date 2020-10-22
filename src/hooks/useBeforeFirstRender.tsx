import { useState, useEffect } from 'react';

export const useBeforeFirstRender = (func: Function) => {
    const [hasRendered, setHasRendered] = useState(false)
    useEffect(() => setHasRendered(true), []);
    if (!hasRendered) {
        func()
    }
}