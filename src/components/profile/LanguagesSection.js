import React, {useEffect, useState} from "react";
import {profileService} from "../../services/profileService";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import EyeIcon from "../../elements/icons/EyeIcon";
import PencilIcon from "../../elements/icons/PencilIcon";
import {Link} from "react-router-dom";
import PencilButton from "../../elements/buttons/PencilButton";

const LanguagesSection = ({ user }) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        profileService
            .getLanguages()
            .then(({data}) => setLanguages(data))
    }, [user])

    const dot = <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
        <path d="M0 5.06024C0 3.65462 0.441767 2.46988 1.3253 1.50602C2.249 0.502008 3.49398 0 5.06024 0C6.66667 0 7.93173 0.481928 8.85542 1.44578C9.77912 2.40964 10.241 3.61446 10.241 5.06024C10.241 6.4257 9.77912 7.59036 8.85542 8.55422C7.93173 9.51807 6.66667 10 5.06024 10C3.49398 10 2.249 9.51807 1.3253 8.55422C0.441767 7.59036 0 6.4257 0 5.06024Z" fill="#24459A"/>
    </svg>

    return (
        <ConditionalWrapper condition={languages.length > 0}>
            <div className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="mx-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Languages</h1>

                        <PencilButton to=' '/>
                    </div>


                    <div className="flex flex-row items-center gap-2.5 mt-2">
                        <EyeIcon className="h-4"/>

                        <h3 className="text-sm font-roboto font-light text-[#7D7D7D]">
                            This section can be viewed by your contacts on <span className="font-medium">Job for You</span>
                        </h3>
                    </div>

                    <div className="flex flex-row justify-start items-center mt-2.5 gap-[25px] py-[5px]">
                        {
                            languages.map((language, index) =>
                                <React.Fragment>
                                    {dot}
                                    <div className="flex flex-col border-b-[0.5px] border-[#24459A80] text-[#2D2A33] gap-[5px] pb-2.5 w-1/2">
                                        <h1 className="font-jost font-medium">{language.name}</h1>

                                        <h3 className="font-jost text-sm font-light">{language.proficiency}</h3>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        </ConditionalWrapper>
    )
}
export default LanguagesSection;