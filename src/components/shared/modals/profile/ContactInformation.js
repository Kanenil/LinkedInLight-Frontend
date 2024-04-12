import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import React from "react";
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper";
import PencilButton from "../../../../elements/buttons/PencilButton";
import {ArrowTopRightOnSquareIcon, EnvelopeIcon, EyeIcon, MapPinIcon} from "@heroicons/react/24/outline";
import {APP_ENV} from "../../../../env";
import {Link} from "react-router-dom";


const ContactInformation = ({onClose, isOwner, user}) => {

    console.log(user)

    return (
        <div className="flex flex-col gap-2 px-7 py-5 w-[480px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="flex flex-row py-2.5 border-b-[1px] border-b-[#24459A]">
                <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">{user.firstName} {user.lastName}</h1>

                <button onClick={onClose} className="ml-auto">
                    <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                </button>
            </div>

            <div className="flex flex-row mt-4">
                <h3 className="font-jost text-[#2D2A33] text-lg">Contact information</h3>

                <ConditionalWrapper condition={isOwner}>
                    <PencilButton className="ml-auto" to={`/j4y/${user.profileUrl}/edit/contact-information`}/>
                </ConditionalWrapper>
            </div>

            <div className="flex flex-col mt-4 gap-4">
                <div className="flex flex-row gap-2.5 items-center">
                    <ArrowTopRightOnSquareIcon className="ml-2 text-[#2D2A33] w-7 h-7"/>

                    <div className="flex flex-col">
                        <h1 className="text-[#2D2A33] font-medium font-jost">{isOwner?'Your profile':'Profile'}</h1>

                        <Link onClick={onClose} to={`${APP_ENV.FRONTEND_URL}/j4y/${user.profileUrl}`} className="text-[#24459A] text-sm font-medium hover:underline">
                            {`${APP_ENV.FRONTEND_URL}/j4y/${user.profileUrl}`}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-row gap-2.5 items-center">
                    <MapPinIcon className="ml-2 text-[#2D2A33] w-7 h-7"/>

                    <div className="flex flex-col">
                        <h1 className="text-[#2D2A33] font-medium font-jost">Address</h1>

                        <h3 className="text-[#24459A] cursor-pointer text-sm font-medium hover:underline">
                            {user.city}, {user.country}
                        </h3>
                    </div>
                </div>

                <div className="flex flex-row gap-2.5 items-center">
                    <EnvelopeIcon className="ml-2 text-[#2D2A33] w-7 h-7"/>

                    <div className="flex flex-col">
                        <h1 className="text-[#2D2A33] font-medium font-jost">Email</h1>

                        <Link to={`email:${user.email}`} className="text-[#24459A] font-medium hover:underline">
                            {user.email}
                        </Link>
                    </div>
                </div>
            </div>

            <ConditionalWrapper condition={isOwner}>
                <div className="flex flex-row gap-3 mt-4 items-center">
                    <EyeIcon className="w-4 h-4 text-[#7D7D7D]"/>
                    <span className="font-jost font-light">Everybody in <strong className="font-medium">Job For You</strong></span>
                </div>
            </ConditionalWrapper>
        </div>
    )
}
export default ContactInformation;