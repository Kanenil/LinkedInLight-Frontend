import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible, closeOnClickOutside = true, callback = null) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            if(closeOnClickOutside)
                setIsComponentVisible(false);
            else
                callback(event.target);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}