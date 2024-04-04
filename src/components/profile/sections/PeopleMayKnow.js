import PlusIcon from "../../../elements/icons/PlusIcon";
import {Link} from "react-router-dom";
import ArrowRightIcon from "../../../elements/icons/ArrowRightIcon";
import AddButton from "../../../elements/buttons/AddButton";

const PeopleMayKnow = ({peopleMayKnow, margin = "mt-2.5"}) => {
    return (
        <div className={`flex flex-col bg-white rounded-lg px-5 pt-5 ${margin}`}>
            <h1 className="font-jost text-xl text-[#2D2A33] font-medium">People you may know</h1>

            {peopleMayKnow.map((person, index) => <div key={`peopleMayKnow-${index}`}
                                                       className="mt-2.5 py-2.5 border-[#24459A80] border-t-[0.5px]">
                <div className="flex flex-row">
                    <div
                        className="rounded-full overflow-hidden w-10 h-10 border-[1px] border-[#2D2A33] bg-[#E7E7E7]">
                        <img className="object-contain" src={person.image} alt="image"/>
                    </div>

                    <div className="flex flex-col ml-2.5 font-jost text-[#2D2A33]">
                        <h1 className="font-medium text-lg">{person.username}</h1>

                        <h3 className="flex flex-row font-light">
                            {person.position}
                        </h3>

                        <AddButton onClick={() => {}}>
                            Add contact
                        </AddButton>
                    </div>
                </div>
            </div>)}

            <Link to={'/in'}
                  className="mt-2.5 py-3 border-[#A7ACBA] border-t-[0.5px] flex flex-row justify-center gap-4 font-jost text-[#2D2A33] font-light">
                Show all

                <ArrowRightIcon className="fill-[#2D2A33] w-2.5"/>
            </Link>
        </div>
    )
}
export default PeopleMayKnow;