import React, {useEffect, useState} from "react";
import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import PeopleMayKnow from "../sections/PeopleMayKnow";
import {peopleMayKnow} from "../../../pages/profile/mock";
import ArrowRightIcon from "../../../elements/icons/ArrowRightIcon";
import {Link} from "react-router-dom";
import PlusIcon from "../../../elements/icons/PlusIcon";
import {profileService} from "../../../services/profileService";
import PencilButton from "../../../elements/buttons/PencilButton";

const LanguageDetails = ({user}) => {
    const [languages, setLanguages] = useState([]);

    const imageUrl = user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage;

    useEffect(() => {
        profileService
            .getLanguages()
            .then(({data}) => setLanguages(data))
    }, [user])

    return (
        <main className='bg-[#E7E7E7] flex-grow'>
            <div className="bg-white py-2" style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
                <div className="mx-auto w-[1170px]">
                    <div className="flex flex-row gap-[40px]">
                        <div className="border-[1px] overflow-hidden border-[#2D2A33] bg-[#E7E7E7] rounded-full w-[40px] h-[40px]">
                            <img className="object-contain" src={imageUrl} alt="image"/>
                        </div>

                        <div className="flex flex-col font-jost text-[#2D2A33]">
                            <h1 className="text-lg font-medium">{user?.firstName} {user?.lastName}</h1>

                            <ConditionalWrapper condition={user?.headline}>
                                <h3 className="text-sm font-light mt-1">
                                    {user?.headline}
                                </h3>
                            </ConditionalWrapper>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row my-8 mx-auto w-[1170px]">
                <div className="w-8/12">
                    <div className="flex flex-col gap-2.5 rounded-lg bg-white py-8 px-10">
                        <div className="flex flex-row items-center font-jost pb-2.5 border-b-[0.5px] border-[#24459A80]">
                            <Link to='/in'>
                                <ArrowRightIcon className="w-4 mr-3.5 fill-[#24459A]" style={{transform: `rotate(180deg)`}}/>
                            </Link>

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
                </div>

                <div className="w-4/12 ml-10">
                    <PeopleMayKnow margin="" peopleMayKnow={peopleMayKnow}/>
                </div>
            </div>
        </main>
    )
}
export default LanguageDetails;