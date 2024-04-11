import {Link} from "react-router-dom";
import {UserGroupIcon} from "@heroicons/react/24/outline";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import ConnectionService from "../../services/connectionService";

const ManageNetwork = () => {
    const {data: connectionsList, isLoading: connectionsListLoading} = useQuery({
        queryFn: () => ConnectionService.getConnections(),
        queryKey: ['connections'],
        select: ({data}) => data
    })

    return (
        <div className="py-4 h-full bg-white rounded-b-lg">
            <h1 className="mx-4 font-jost text-lg">Manage my network</h1>

            <Link className="flex flex-row items-center gap-3 font-jost hover:bg-gray-50 px-4 py-2" to="connections">
                <UserGroupIcon className="w-6 h-6"/>
                <span>Connections</span>

                <span className="ml-auto">{!connectionsListLoading && connectionsList.length}</span>
            </Link>
        </div>
    )
}
export default ManageNetwork;