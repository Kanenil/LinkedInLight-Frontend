import React from "react";
import {useParams} from "react-router";
import {Helmet} from "react-helmet-async";
import {useQueries} from "@tanstack/react-query";
import {companyPageQuery} from "../../constants/combinedQueries";
import {APP_ENV} from "../../env";
import defaultBg from "../../assets/default-background.jpg";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

const CompanyPage = () => {
    const {companyId} = useParams();

    const links = [
        {
            title: 'Home',
            to: `/j4y/company/${companyId}`,
            isHasBorder: false
        },
        {
            title: 'Settings',
            to: `/j4y/company/${companyId}/settings`,
            isHasBorder: true
        },
        {
            title: 'Edit page',
            to: `/j4y/company/${companyId}/edit`
        }
    ]

    const {company, followersCount} = useQueries({
        queries: companyPageQuery(companyId).map((value) => ({
            ...value
        })),
        combine: (results) => {
            return {
                company: results[0].data ?? {},
                followersCount: results[1].data ?? 0
            }
        },
    });

    return (
        <React.Fragment>
            <Helmet>
                <title>{company.companyName}</title>
            </Helmet>
            <main className='flex-grow bg-[#E7E7E7]'>
                <div className="flex flex-row my-8 mx-auto w-[1170px]">
                    <div className="w-2/6 rounded-lg flex flex-col overflow-hidden bg-white h-fit w-full">
                        <div className="h-[100px] w-full" style={{background: `url(${defaultBg})`}}/>
                        <div className="-mt-12 ml-6 flex items-center max-h-[100px] max-w-[100px] bg-white">
                            <img className="object-contain" src={`${APP_ENV.UPLOADS_URL}/${company.logoImg}`}
                                 alt="company-logo"/>
                        </div>

                        <div className="flex flex-col mx-6 mt-8 font-jost text-[#2D2A33]">
                            <h1 className="text-xl font-bold">
                                {company.companyName}
                            </h1>
                            <h3 className="font-extralight text-lg break-words text-wrap">
                                {company.tagline}
                            </h3>
                        </div>

                        <h4 className="mx-6 mt-4 font-jost text-[#7F7F7F] font-light">{followersCount} followers</h4>

                        <div className="flex flex-col mx-6 my-6">
                            {links.map(({to, title, isHasBorder}) => (
                                <NavLink
                                    to={to}
                                    className={({isActive}) => classNames("font-jost text-lg py-3 hover:underline", {
                                        "text-[#2D2A33] font-light": !isActive,
                                        "text-[#24459A] font-medium": isActive,
                                        "border-b-[#24459A]/50 border-b-[1px]": isHasBorder
                                    })}
                                >
                                    {title}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    {/*<div className="w-5/6 ml-10 h-[500px] bg-blue-400 w-full">*/}

                    {/*</div>*/}
                </div>
            </main>
        </React.Fragment>
    )
}
export default CompanyPage;