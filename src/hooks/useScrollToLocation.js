import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export const useScrollToLocation = () => {
    const location = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        if (location.state && location.state) {
            const targetId = location.state;
            let iteration = 0;

            const waitForOffsetTop = () => {
                const el = document.getElementById(targetId);
                if (el && el.offsetTop > 0) {
                    window.scrollTo(0, el.offsetTop - 60); // 60 px - sticky header
                    iteration = 5;
                    navigator('', {state: null})
                } else if (iteration < 5) {
                    setTimeout(waitForOffsetTop, 30);
                    iteration++;
                }
            };

            waitForOffsetTop();
        }
    }, [location])
}