import defaultBg from "../../assets/default-background.jpg";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import AddButton from "../../elements/buttons/AddButton";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import React, {useState} from "react";
import CompanyCreatePost from "./posts/CompanyCreatePost";
import CompanySectionNavigation from "./CompanySectionNavigation";

const CompanyIndex = ({company, followersCount, searchParams}) => {
    const links = [
        {
            title: "Home",
            to: `/j4y/company/${company.id}`,
            isHasBorder: false,
        },
        {
            title: "Settings",
            to: `/j4y/company/${company.id}/settings`,
            isHasBorder: true,
        },
        {
            title: "Edit page",
            to: `/j4y/company/${company.id}/edit`,
        },
    ]

    return (
        <div className='flex flex-col md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
            <div className='md:w-2/6 rounded-lg flex flex-col overflow-hidden bg-white h-fit'>
                <div
                    className='h-[100px] w-full'
                    style={{background: `url(${defaultBg})`}}
                />
                <div className='-mt-12 ml-6 flex items-center max-h-[100px] max-w-[100px] bg-white'>
                    <img
                        className='object-contain'
                        src={
                            company.logoImg
                                ? `${APP_ENV.UPLOADS_URL}/${company.logoImg}`
                                : defaultImage
                        }
                        alt='company-logo'
                    />
                </div>

                <div className='flex flex-col mx-6 mt-8 font-jost text-[#2D2A33]'>
                    <h1 className='text-xl font-bold'>{company.companyName}</h1>
                    <h3 className='font-extralight text-lg break-words text-wrap'>
                        {company.tagline}
                    </h3>
                </div>

                <h4 className='mx-6 mt-4 font-jost text-[#7F7F7F] font-light'>
                    {followersCount} followers
                </h4>

                <div className="mt-5 mx-4">
                    <AddButton
                        withIcon={false}
                        to={`/j4y/company/${company.id}?preview=true`}
                    >
                        Preview as user
                    </AddButton>
                </div>

                <div className='flex flex-col mx-6 my-6'>
                    {links.map(({to, title, isHasBorder}) => (
                        <NavLink
                            key={`navLink-${title}`}
                            to={to}
                            className={({isActive}) =>
                                classNames("font-jost text-lg py-3 hover:underline", {
                                    "text-[#2D2A33] font-light": !isActive,
                                    "text-[#24459A] font-medium": isActive,
                                    "border-b-[#24459A]/50 border-b-[1px]": isHasBorder,
                                })
                            }
                        >
                            {title}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='mt-5 md:mt-0 md:w-5/6 md:ml-5 flex flex-col gap-5'>
                <CompanyCreatePost company={company} searchParams={searchParams}/>

                <CompanySectionNavigation company={company} searchParams={searchParams}/>
            </div>
        </div>
    )
}
export default CompanyIndex;