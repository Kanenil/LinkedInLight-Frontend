import React from "react"
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper"
import AddButton, {AddButtonVariant2} from "../../elements/buttons/AddButton"
import defaultBg from "../../assets/default-background.jpg";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import {useQueries, useQuery} from "@tanstack/react-query";
import Loader from "../shared/Loader";
import {companyQuery} from "../../constants/combinedQueries";
import CompanyService from "../../services/companyService";
import {ButtonVariant3} from "../../elements/buttons/Button";
import Show from "../../elements/shared/Show";
import CompanySectionNavigation from "./CompanySectionNavigation";

const CompanyPreview = ({company, isAdmin, isAdminPreview = false, searchParams = []}) => {
    const {industry: {name: industryName}, followers, isLoading} = useQueries({
        queries: companyQuery(company.id, company.industryId).map((value) => ({
            ...value
        })),
        combine: (results) => {
            return {
                industry: results[0].data ?? {},
                followers: results[1].data ?? 0,
                isLoading: results.some(val => val.isLoading)
            }
        },
    });
    const {data: isFollower, isLoading: isFollowerLoading, refetch} = useQuery({
        queryFn: ({queryKey}) => CompanyService.getIsFollower(queryKey[1]),
        queryKey: ["isFollower", company.id],
        select: ({data}) => data,
    },)

    if (isLoading || isFollowerLoading)
        return <Loader/>;

    const onFollow = () => !isAdminPreview && CompanyService.follow(company.id).then(refetch);
    const onUnfollow = () => CompanyService.unfollow(company.id).then(refetch);

    return (
        <>
            <ConditionalWrapper condition={isAdminPreview}>
                <div className='bg-white'>
                    <div className='w-full md:container lg:w-[1170px] flex flex-row mx-auto py-4'>
                        <h1 className='text-[#2D2A33] font-jost text-2xl'>
                            Preview as user
                        </h1>

                        <AddButton
                            className='ml-auto'
                            withIcon={false}
                            to={`/j4y/company/${company.id}`}
                        >
                            Preview as admin
                        </AddButton>
                    </div>
                </div>
            </ConditionalWrapper>
            <div className='flex flex-col md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
                <div className='w-full md:w-9/12 flex flex-col gap-5'>
                    <div className="rounded-lg overflow-hidden bg-white pb-6">
                        <div
                            className='h-[200px] w-full'
                            style={{background: `url(${defaultBg})`}}
                        />
                        <div className='-mt-12 ml-10 flex items-center max-h-[100px] max-w-[100px] bg-white p-2 rounded-lg'>
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

                        <div className='flex flex-col ml-10 mt-4 font-jost text-[#2D2A33]'>
                            <h1 className='text-xl font-bold'>{company.companyName}</h1>

                            <h3 className='font-light text-lg break-words text-wrap'>
                                {company.tagline}
                            </h3>

                            <div
                                className="flex flex-row mt-2 gap-0.5 md:gap-2 text-sm md:text-base font-jost text-[#7F7F7F] font-light">
                                <h4 className="pr-1 border-r-[1px] border-r-[#24459A]">
                                    {industryName}
                                </h4>

                                <h4 className="px-1 border-r-[1px] border-r-[#24459A]">
                                    {followers} followers
                                </h4>

                                <h4>
                                    {company.organizationSize}
                                </h4>
                            </div>

                            <div className="inline-flex gap-4 mt-6">
                                <Show>
                                    <Show.When isTrue={isFollower}>
                                        <ButtonVariant3 onClick={onUnfollow} className="px-5 py-1">
                                            Unfollow
                                        </ButtonVariant3>
                                    </Show.When>

                                    <Show.Else>
                                        <AddButtonVariant2 onClick={onFollow} className="px-5">
                                            Follow
                                        </AddButtonVariant2>
                                    </Show.Else>
                                </Show>
                            </div>
                        </div>
                    </div>

                    <CompanySectionNavigation company={company} isAdmin={isAdmin} searchParams={searchParams}/>
                </div>
            </div>
        </>
    )
}

export default CompanyPreview
