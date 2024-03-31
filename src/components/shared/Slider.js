import React, {useEffect, useState} from "react";
import ChevronLeftIcon from "../../elements/icons/ChevronLeftIcon";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {useTranslation} from "react-i18next";

const Slider = ({
                    onReset,
                    initialIndex = 0,
                    perPage = 1,
                    children,
                    className,
                    containerClass,
                    isNewDesignStyle = false
                }) => {
    const {t} = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const calculateWidth = () => {
        const additionMinus = (currentIndex > 0 ? 25 + (currentIndex - 1) * 25 : 0);
        return currentIndex * -width - additionMinus;
    }

    const width = children[0].props.width;
    const items = children.length;
    const leftLimit = 0;
    const rightLimit = items - perPage;

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [onReset])

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
                <ConditionalWrapper condition={isNewDesignStyle}>
                    <button onClick={() => setCurrentIndex(val => val - 1)}
                            className="z-10 absolute left-7 -bottom-5 flex flex-row items-center pt-[5px] py-[25px] gap-2.5 font-light text-lg text-[#615E64] text-center hover:underline transition duration-500 ease-in-out">
                        <ChevronLeftIcon className="h-3 fill-[#615E64]" style={{transform: "rotate(360deg)"}}/>
                        <span>{t('slider.back')}</span>
                    </button>
                </ConditionalWrapper>
                <ConditionalWrapper condition={!isNewDesignStyle}>
                    <ManipulateButton onClickHandler={() => setCurrentIndex(val => val - 1)}
                                      position="-left-6 top-16"
                    />
                </ConditionalWrapper>
            </ConditionalWrapper>
            <div className={className}
                 style={{transform: `translateX(${calculateWidth()}px)`, transition: "transform 0.6s ease-in-out"}}>
                <div className={containerClass}>
                    {children}
                </div>
            </div>
            <ConditionalWrapper condition={currentIndex !== rightLimit && rightLimit > 0}>
                <ConditionalWrapper condition={isNewDesignStyle}>
                    <button onClick={() => setCurrentIndex(val => val + 1)}
                            className="z-10 absolute right-1 -bottom-5 flex items-center flex-row pt-[5px] py-[25px] gap-2.5 font-light text-lg text-[#615E64] text-center hover:underline transition duration-500 ease-in-out">
                        <span>{t('slider.next')}</span>
                        <ChevronLeftIcon className="h-3 fill-[#615E64]" style={{transform: "rotate(180deg)"}}/>
                    </button>
                </ConditionalWrapper>
                <ConditionalWrapper condition={!isNewDesignStyle}>
                    <ManipulateButton onClickHandler={() => setCurrentIndex(val => val + 1)}
                                      position="-right-8 top-16"
                                      rotate={180}
                    />
                </ConditionalWrapper>
            </ConditionalWrapper>
        </div>

    )
}
export default Slider;