import React from "react";
import {useParams} from "react-router";
import {Helmet} from "react-helmet-async";
import {useQueries} from "@tanstack/react-query";
import {companyPageQuery} from "../../constants/combinedQueries";

const CompanyPage = () => {
    const {companyId} = useParams();

    const {company} = useQueries({
        queries: companyPageQuery(companyId).map((value) => ({
            ...value
        })),
        combine: (results) => {
            return {
                company: results[0].data ?? {}
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
                    <div className="w-2/6 rounded-lg overflow-hidden h-[500px] bg-red-500 w-full">
                        <div className="h-[100px] w-full bg-blue-400"></div>

                    </div>
                    <div className="w-5/6 ml-10 h-[500px] bg-blue-400 w-full">

                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
export default CompanyPage;