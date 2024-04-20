import {useCallback, useEffect, useRef, useState} from "react";

const useOverflow = () => {
    const [isOverflow, setIsOverflow] = useState(false);
    const containerRef = useRef(null);
    const contentRef = useCallback(node => {
        if (!node) return;
        const resizeObserver = new ResizeObserver(() => {
            setIsOverflow(node?.offsetHeight > containerRef.current?.offsetHeight);
        });
        resizeObserver.observe(node);
    }, []);

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