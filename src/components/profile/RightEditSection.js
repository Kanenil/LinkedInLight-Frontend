import PencilIcon from "../../elements/icons/PencilIcon";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";

const RightEditSection = () => {
    const blocks = [
        {title: 'Language', border: ''},
        {title: 'Public profile', border: 'pt-3 border-t-[0.5px] border-[#24459A80]'},
        {
            title: 'URL',
            border: 'pt-2.5 border-t-[0.5px] border-[#24459A80]',
            optional: 'www.job4you.com/in/user-name-1988a12b9'
        }
    ]

    const EditBlock = ({title, onClickHandler, optional, border}) => {
        return (
            <div className={`flex flex-col mx-5 mt-5 ${border}`}>
                <div className="flex flex-row">
                    <h3 className="font-jost text-[#2D2A33] text-xl">{title}</h3>

                    <button onClick={onClickHandler} className="ml-auto mr-1.5">
                        <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                    </button>
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