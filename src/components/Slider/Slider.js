import {useState} from "react";
import ArrowRightIcon from "../../elements/ArrowRightIcon/ArrowRightIcon";
import ChevronLeftIcon from "../../elements/ChevronLeftIcon/ChevronLeftIcon";

const Slider = ({ initialIndex = 0, items, perPage, width, children, className, containerClass }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const calculateWidth = () => {
        return currentIndex * -width - (currentIndex > 0? 25 + (currentIndex - 1) * 25: 0)
    }

    const leftLimit = 0;
    const rightLimit = items - perPage;

    return (
        <div className="relative">
            {
                currentIndex !== leftLimit &&
                <button onClick={() => setCurrentIndex(val => val - 1)}
                        className="z-10 absolute -left-6 top-16">
                    <ChevronLeftIcon className="fill-[#24459A] h-8"/>
                </button>
            }
            <div className={`${className}`} style={{transform: `translateX(${calculateWidth()}px)`, transition: "transform 0.6s ease-in-out"}}>
                <div className={containerClass}>
                    {children}
                </div>
            </div>
            {
                currentIndex !== rightLimit &&
                <button onClick={() => setCurrentIndex(val => val + 1)}
                        className="z-10 absolute -right-8 top-16">
                    <ChevronLeftIcon className="fill-[#24459A] h-8" style={{transform:"rotate(180deg)"}}/>
                </button>
            }
        </div>

    )
}
export default Slider;