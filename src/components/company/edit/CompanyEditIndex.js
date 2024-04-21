import {useNavigate, useParams} from "react-router";
import {Link, useSearchParams} from "react-router-dom";
import useCompany from "../../../hooks/useCompany";
import Loader from "../../shared/Loader";
import React from "react";
import {Helmet} from "react-helmet-async";
import CompanyControlMenu from "../CompanyControlMenu";
import Show from "../../../elements/shared/Show";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {pages} from "./editPages";

const CompanyEditIndex = () => {
    const {companyId} = useParams();
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    const {company, followersCount, isAdmin, isLoading, admins} = useCompany(companyId);

    if (isLoading)
        return <Loader/>;

    if (!isAdmin)
        return navigator(-1);

    return (
        <>
            <Helmet>
                <title>{company.companyName}</title>
            </Helmet>
            <main className='flex-grow bg-[#E7E7E7]'>
                <div className='flex flex-col md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
                    <div className='md:w-2/6 rounded-lg flex flex-col overflow-hidden bg-white h-fit'>
                        <CompanyControlMenu company={company} followersCount={followersCount}/>
                    </div>
                    <div className='mt-5 md:mt-0 md:w-5/6 md:ml-5 flex flex-col gap-5'>
                        <Show>
                            <Show.When isTrue={!searchParams.has('section')}>
                                <div className="bg-white rounded-lg px-7 py-6">
                                    <div className="pb-4 border-b-[1px] border-b-[#24459A]/50">
                                        <h1 className="font-jost text-xl text-[#2D2A33] font-medium">Edit page</h1>
                                    </div>

                                    <div className="mt-2 flex flex-col gap-1">
                                        {
                                            pages.map(({title, description, to}) => (
                                                <Link
                                                    to={`?section=${to}`}
                                                    key={`edit-${title}`}
                                                    className="flex flex-row rounded-lg p-2 hover:bg-[#24459A]/10"
                                                >
                                                    <div
                                                        className="flex flex-col gap-1 font-jost max-w-[60%] text-start">
                                                        <h1 className="text-[#2D2A33] font-medium text-lg">{title}</h1>
                                                    </div>

                                                    <ArrowRightIcon
                                                        className="ml-auto my-auto text-[#24459A] stroke-2 w-5 h-5"/>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Show.When>

                            {
                                pages.map(page => (
                                    <Show.When
                                        key={`whenEditing-${page.to}`}
                                        isTrue={searchParams.get('section') === page.to}
                                    >
                                        {React.cloneElement(page.component, {
                                            company,
                                            admins
                                        })}
                                    </Show.When>
                                ))
                            }
                        </Show>
                    </div>
                </div>
            </main>
        </>
    )
}
export default CompanyEditIndex;