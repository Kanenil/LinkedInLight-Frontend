import {Helmet} from "react-helmet-async";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import ConnectionService from "../../services/connectionService";
import LoopIcon from "../../elements/icons/LoopIcon";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import {Link} from "react-router-dom";
import SecondaryButton from "../../elements/buttons/SecondaryButton";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";

const Connections = () => {
    const {data: connectionsList, isLoading: connectionsListLoading} = useQuery({
        queryFn: () => ConnectionService.getConnections(),
        queryKey: ['connections'],
        select: ({data}) => data
    })

    return (
        <React.Fragment>
            <Helmet>
                <title>My Connections</title>
            </Helmet>
            <main className='flex-grow bg-[#E7E7E7]'>
                <div className="flex flex-row my-8 mx-auto w-[1170px]">
                    <div className="min-h-[30vh] w-full bg-white rounded-lg">
                        <div className="pt-6 px-6 pb-3 flex flex-row border-b-2 border-b-gray-200">
                            <h1 className="font-jost text-xl">
                                {!connectionsListLoading && connectionsList.length} Connections
                            </h1>

                            <div className="ml-auto my-auto relative">
                                <input type="text" placeholder="Search"
                                       className="border-[1px] border-[#2D2A33] rounded-sm w-[200px] pl-10 text-xs"/>

                                <LoopIcon className="absolute left-4 top-2.5 fill-[#2D2A33] h-3"/>
                            </div>
                        </div>

                        <ConditionalWrapper condition={!connectionsListLoading}>
                            <div className="flex flex-col">
                                {
                                    connectionsList?.map(connection => (
                                        <div
                                            key={`connection-${connection.id}`}
                                            className="flex flex-row px-4 gap-3 border-b-gray-200 border-b-2"
                                        >
                                            <div
                                                className="overflow-hidden h-20 w-20 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                                                <img className="object-contain"
                                                     src={connection.user?.image ? APP_ENV.UPLOADS_URL + "/" + connection.user?.image : defaultImage}
                                                     alt="image"/>
                                            </div>

                                            <div className="flex flex-col gap-1 mt-1.5">
                                                <Link to={`/j4y/${connection.user.profileUrl}`} className="font-jost text-lg font-medium">{connection.user.firstName} {connection.user.lastName}</Link>

                                                <h3>{connection.user.headline}</h3>
                                            </div>

                                            <div className="flex flex-row gap-3 items-center ml-auto">
                                                <div className="px-2 py-4">
                                                    <SecondaryButton onClick={() => {}}>
                                                        Message
                                                    </SecondaryButton>
                                                </div>

                                                <button className="hover:bg-gray-100 rounded-full p-1">
                                                    <EllipsisHorizontalIcon className="w-6 h-6"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </ConditionalWrapper>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
export default Connections;