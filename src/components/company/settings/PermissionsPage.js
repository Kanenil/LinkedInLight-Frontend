import React from "react";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import CompanyNavButton from "../CompanyNavButton";
import {AddButtonVariant2} from "../../../elements/buttons/AddButton";
import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const cols = ['User profile', 'Status', 'Action']

const PermissionsPage = ({company, admins}) => {

    console.log(admins)
    return (
        <div className="bg-white rounded-lg py-6">
            <div className="inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50">
                <Link to={`/j4y/company/${company.id}/settings`} className="my-auto">
                    <ArrowLeftIcon className="text-[#24459A] stroke-2 w-5 h-5"/>
                </Link>

                <h1 className="font-jost text-xl text-[#2D2A33] font-medium">Page Access Management</h1>
            </div>

            <div className="flex flex-row w-full px-14 py-4">
                <CompanyNavButton className="md:w-fit px-5 border-b-2" isActive={true}>
                    Page administrators
                </CompanyNavButton>

                <AddButtonVariant2 iconClass="w-4 h-4 stroke-2" className="ml-auto text-sm">
                    Add administrator
                </AddButtonVariant2>
            </div>

            <div className="flex flex-row [&>h1]:flex-grow [&>h1]:text-center flex-grow justify-center font-medium font-jost text-[#2D2A33] bg-[#F0F1F3] border-t-[1px] border-b-[1px] border-b-[#24459A]/20 border-t-[#24459A]/20 py-4">
                {cols.map(col => (
                    <h1 key={`col-${col}`}>{col}</h1>
                ))}
            </div>

            <div className="mt-2">
                <div className="flex flex-col gap-2">
                    {admins.map(({userId, image, firstName, lastName, currentPosition, role}) => (
                        <div
                            key={`admin-${userId}`}
                            className="mx-10 flex flex-row [&>div]:flex-grow [&>div]:mx-auto flex-grow justify-center font-medium font-jost text-[#2D2A33] py-4"
                        >
                            <div className="flex flex-row gap-3 max-w-[30%]">
                                <div
                                    className="overflow-hidden max-h-12 max-w-12 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                                    <img className="object-contain"
                                         src={image ? APP_ENV.UPLOADS_URL + "/" + image : defaultImage}
                                         alt="image"/>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h1 className="font-jost font-medium">{firstName} {lastName}</h1>

                                    <h3>{currentPosition}</h3>
                                </div>
                            </div>


                            <div className="max-w-[25%] my-auto">
                                <div className="w-fit px-2 py-1 rounded-lg bg-[#F0F1F3] text-[#2D2A33] font-medium font-jost">{role}</div>
                            </div>

                            <div className="flex flex-row gap-3 max-w-[8%]">
                                <ConditionalWrapper condition={role !== 'Owner'}>
                                    <button className="my-auto">
                                        <PencilIcon className="w-5 h-5 text-[#24459A] stroke-1"/>
                                    </button>

                                    <button className="my-auto">
                                        <TrashIcon className="w-5 h-5 text-[#24459A] stroke-1"/>
                                    </button>
                                </ConditionalWrapper>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}
export default PermissionsPage;