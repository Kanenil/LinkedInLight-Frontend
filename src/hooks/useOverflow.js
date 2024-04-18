import {useEffect, useRef, useState} from "react";

const useOverflow = () => {
    const [isOverflow, setIsOverflow] = useState(false);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        function toggleScrollbar() {
            setIsOverflow(contentRef.current?.offsetHeight > containerRef.current?.offsetHeight);
        }
        
        if(contentRef.current && containerRef.current)
            toggleScrollbar();
        else
            setIsOverflow(true)

        window.addEventListener('resize', toggleScrollbar);

        return () => {
            window.removeEventListener('resize', toggleScrollbar);
        };
    }, [contentRef, containerRef]);

    return { isOverflow, containerRef, contentRef };
}
export default useOverflow;