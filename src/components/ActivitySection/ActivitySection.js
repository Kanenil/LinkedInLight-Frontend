import {Link} from "react-router-dom";
import ArrowRightIcon from "../../elements/ArrowRightIcon/ArrowRightIcon";
import SectionHeaderBlock from "../SectionHeaderBlock/SectionHeaderBlock";
import classNames from "classnames";
import {useState} from "react";

const ActivitySection = ({title, buttonTitle, onPencilClick, onAddClick, blocks, activeBlock}) => {
    const [currentBlock, setCurrentBlock] = useState(activeBlock);

    const dot = (
        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"
             viewBox="0 0 1 1" fill="none">
            <path
                d="M0 0.503906C0 0.389974 0.0358073 0.293945 0.107422 0.21582C0.182292 0.13444 0.283203 0.09375 0.410156 0.09375C0.540365 0.09375 0.642904 0.132812 0.717773 0.210938C0.792643 0.289062 0.830078 0.386719 0.830078 0.503906C0.830078 0.614583 0.792643 0.708984 0.717773 0.787109C0.642904 0.865234 0.540365 0.904297 0.410156 0.904297C0.283203 0.904297 0.182292 0.865234 0.107422 0.787109C0.0358073 0.708984 0 0.614583 0 0.503906Z"
                fill="#2D2A33"/>
        </svg>
    )

    const ActivityContentItem = ({ published, when, privacy }) => {
        return (
            <div className="flex flex-col w-[160px] gap-2.5 py-4 animate-scaleIn">
                <div className="bg-[#D9D9D9] w-[100px] h-[100px]"/>

                <div
                    className="flex flex-row items-center font-jost text-xs font-light mt-2.5 gap-1">
                    <span>{published}</span>
                    {dot}
                    <span>{when}</span>
                    {dot}
                    <span>{privacy}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-lg bg-white overflow-hidden pt-8">
            <SectionHeaderBlock
                title={title}
                buttonTitle={buttonTitle}
                onPencilClick={onPencilClick}
                onAddClick={onAddClick}
                margin="mx-10"
            />

            <div className="flex flex-row gap-5 mt-4 mx-10">
                {blocks.map((block, index) =>
                    <button
                        key={`block-${block.name}-${index}`}
                        onClick={() => setCurrentBlock(block.name)}
                        className={classNames("font-jost font-sm rounded-full py-1 px-5", {
                            "bg-[#24459A] text-white": block.name === currentBlock,
                            "border-[1px] border-[#24459A] text-[#556DA9]": block.name !== currentBlock
                        })}
                    >
                        {block.name}
                    </button>
                )}
            </div>

            <div className="flex flex-row gap-7 py-2 mx-10 mt-2.5">
                {
                    blocks
                        .find(element => element.name === activeBlock)
                        .content
                        .map((content, index) =>
                            <ActivityContentItem {...content} key={`ActivityContent-${index}`}/>
                        )
                }
            </div>

            <Link to="/in"
                  className="flex justify-center border-[#A7ACBA] border-t-[0.5px] py-2.5 hover:bg-gray-500/10">
                <div className="flex flex-row items-center gap-2.5">
                    <span className="font-jost text-[#2D2A33] font-light">Show all activity</span>

                    <ArrowRightIcon className="h-2.5 fill-[#2D2A33]"/>
                </div>
            </Link>
        </div>
    )
}
export default ActivitySection;