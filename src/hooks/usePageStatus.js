import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";

export const usePageStatus = () => {
    const [pageStates, setPageStates] = useState({
        edit: "",
        details: ""
    })
    const {blockId, id, profileURL} = useParams();
    const location = useLocation();

    const getBlockId = () => {
        if(location.pathname.includes("edit") && location.pathname.includes("details")) {
            const startIndex = location.pathname.indexOf("details") + "details/".length;
            return location.pathname.substring(startIndex, location.pathname.indexOf('/', startIndex));
        }
        return blockId;
    }

    useEffect(() => {
        setPageStates({
            details: location.pathname.includes("details") ? getBlockId() : "",
            edit: location.pathname.includes("edit") ? blockId : ""
        })
    }, [blockId]);

    return { edit: pageStates.edit, details: pageStates.details, id, profileURL }
}