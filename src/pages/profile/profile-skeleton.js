import useMobileDetector from "../../hooks/useMobileDetector";
import Show from "../../elements/shared/Show";
import React from "react";

const ProfileSectionSkeleton = () => {
    return (
        <div className="flex flex-col bg-white rounded-b-lg">
            <div className="relative w-full flex items-center justify-center h-48 animate-pulse bg-gray-300">
                <svg className="w-10 h-10 text-gray-200"
                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 20 18">
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>

                <div
                    className="absolute left-10 md:left-16 flex items-center justify-center overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-gray-400">
                    <svg className="w-16 h-16 text-gray-200"
                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 20 18">
                        <path
                            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
            </div>

            <div className="ml-6 md:ml-10 mr-8 mt-16 mb-4">
                <div className={`flex flex-row`}>
                    <h1 className="font-bold text-2xl text-[#2D2A33]">
                        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-[280px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </h1>
                </div>
            </div>
        </div>
    )
}

const ProfileSkeleton = () => {
    const {isMobile} = useMobileDetector();

    return (
        <main className='bg-[#E7E7E7] flex-grow'>
            <Show>
                <Show.When isTrue={!isMobile}>
                    <div className="flex flex-row my-8 mx-auto w-[1170px]">
                        <div className="w-8/12">
                            <div className="rounded-t-lg overflow-hidden">
                                <div className="flex flex-col gap-2.5">
                                    <ProfileSectionSkeleton/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Show.When>

                <Show.Else>
                    <div className="flex flex-col gap-2.5 mb-24">
                        <ProfileSectionSkeleton/>
                    </div>
                </Show.Else>
            </Show>
        </main>
    )
}
export default ProfileSkeleton;