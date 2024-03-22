import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import PencilButton from "../../../elements/buttons/PencilButton";
import React from "react";

const RightEditSection = () => {
    const blocks = [
        {title: 'Language', border: '', to: ' '},
        {title: 'Public profile', border: 'pt-3 border-t-[0.5px] border-[#24459A80]', to: ' '},
        {
            title: 'URL',
            border: 'pt-2.5 border-t-[0.5px] border-[#24459A80]',
            to: ' ',
            optional: 'www.job4you.com/in/user-name-1988a12b9'
        }
    ]

    const EditBlock = ({title, to, optional, border}) => {
        return (
            <div className={`flex flex-col mx-5 mt-5 ${border}`}>
                <div className="flex flex-row">
                    <h3 className="font-jost text-[#2D2A33] text-xl">{title}</h3>

                    <PencilButton to={to} className="ml-auto mr-1.5"/>
                </div>

                <ConditionalWrapper condition={optional}>
                    <h3 className="font-jost text-[#7D7D7D] text-sm">{optional}</h3>
                </ConditionalWrapper>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-white rounded-lg pb-5">
            {blocks.map((block, index) =>
                <EditBlock key={`rightEditSection-${index}`} {...block}/>
            )}
        </div>
    )
}
export default RightEditSection;