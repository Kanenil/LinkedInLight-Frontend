import {useState} from "react";
import ChevronLeftIcon from "../../elements/ChevronLeftIcon/ChevronLeftIcon";
import ConditionalWrapper from "../../elements/ConditionalWrapper/ConditionalWrapper";

const Slider = ({initialIndex = 0, perPage, children, className, containerClass}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const getWithFromChild = (child) => {
        const regex = /w-\[(\d+)px\]/;
        const match = regex.exec(child.props.className);

        return match[1];
    }

    const calculateWidth = () => {
        return currentIndex * -width - (currentIndex > 0 ? 25 + (currentIndex - 1) * 25 : 0)
    }

    const width = children[0].props.width;
    const items = children.length;
    const leftLimit = 0;
    const rightLimit = items - perPage;

    const ManipulateButton = ({onClickHandler, position, rotate = 0}) => {
        return (
            <button onClick={onClickHandler}
                    className={`z-10 absolute ${position}`}>
                <ChevronLeftIcon className="fill-[#24459A] h-8" style={{transform: `rotate(${rotate}deg)`}}/>
            </button>
        )
    }

    return (
        <div className="relative">
            <ConditionalWrapper condition={currentIndex !== leftLimit}>
                <ManipulateButton onClickHandler={() => setCurrentIndex(val => val - 1)}
                                  position="-left-6 top-16"
                />
            </ConditionalWrapper>
            <div className={className}
                 style={{transform: `translateX(${calculateWidth()}px)`, transition: "transform 0.6s ease-in-out"}}>
                <div className={containerClass}>
                    {children}
                </div>
            </div>
            <ConditionalWrapper condition={currentIndex !== rightLimit}>
                <ManipulateButton onClickHandler={() => setCurrentIndex(val => val + 1)}
                                  position="-right-8 top-16"
                                  rotate={180}
                />
            </ConditionalWrapper>
        </div>

    )
}
export default Slider;