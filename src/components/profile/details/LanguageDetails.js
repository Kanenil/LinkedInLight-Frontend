import React, {useEffect, useState} from "react";
import ArrowRightIcon from "../../../elements/icons/ArrowRightIcon";
import {Link} from "react-router-dom";
import PlusIcon from "../../../elements/icons/PlusIcon";
import {profileService} from "../../../services/profileService";
import PencilButton from "../../../elements/buttons/PencilButton";

const LanguageDetails = ({user, onClickBack}) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        profileService
            .getLanguages()
            .then(({data}) => {
                if(data.length === 0)
                    onClickBack();

                setLanguages(data)
            })
    }, [user])

    return (
        <div className="flex flex-col gap-2.5 rounded-lg bg-white py-8 px-10">
            <div className="flex flex-row items-center font-jost pb-2.5 border-b-[0.5px] border-[#24459A80]">
                <button onClick={onClickBack}>
                    <ArrowRightIcon className="w-4 mr-3.5 fill-[#24459A]" style={{transform: `rotate(180deg)`}}/>
                </button>

                <h1 className="font-medium text-2xl text-[#2D2A33]">Languages</h1>

                <Link to='edit/language' className="ml-auto">
                    <PlusIcon className="w-4 fill-[#556DA9]"/>
                </Link>
            </div>
            {
                languages.map((language, index) =>
                    <div
                        key={`languages-${language.name}-${index}`}
                        className="flex flex-row items-start justify-start gap-[20px] isolate"
                    >
                        <h1 className="w-20 h-26 font-jost font-normal text-lg leading-26 text-gray-800 flex-none">{language.name}</h1>

                        <PencilButton to={`edit/language/${language.id}`} />
                    </div>
                )
            }
        </div>
    )
}
export default LanguageDetails;