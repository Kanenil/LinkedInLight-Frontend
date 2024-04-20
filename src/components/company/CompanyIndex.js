import React from "react";
import CompanyCreatePost from "./posts/CompanyCreatePost";
import CompanySectionNavigation from "./CompanySectionNavigation";
import CompanyControlMenu from "./CompanyControlMenu";

const CompanyIndex = ({company, followersCount, searchParams}) => {
    return (
        <div className='flex flex-col md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
            <div className='md:w-2/6 rounded-lg flex flex-col overflow-hidden bg-white h-fit'>
                <CompanyControlMenu company={company} followersCount={followersCount}/>
            </div>
            <div className='mt-5 md:mt-0 md:w-5/6 md:ml-5 flex flex-col gap-5'>
                <CompanyCreatePost company={company} searchParams={searchParams}/>

                <CompanySectionNavigation company={company} searchParams={searchParams}/>
            </div>
        </div>
    )
}
export default CompanyIndex;