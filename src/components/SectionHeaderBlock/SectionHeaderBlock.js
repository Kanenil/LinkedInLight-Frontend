import PencilIcon from "../../elements/PencilIcon/PencilIcon";
import ProfileButton from "../ProfileButton/ProfileButton";

const SectionHeaderBlock = ({title, buttonTitle, onPencilClick, onAddClick, margin}) => {
    return (
        <div className={`flex flex-row font-jost ${margin}`}>
            <h1 className="font-medium text-2xl text-[#2D2A33]">{title}</h1>

            <button
                onClick={onPencilClick}
                className="ml-3.5">
                <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
            </button>

            <div className="ml-auto">
                <ProfileButton title={buttonTitle} onClickHandler={onAddClick}/>
            </div>
        </div>
    )
}
export default SectionHeaderBlock;