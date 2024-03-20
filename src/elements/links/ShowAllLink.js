import ArrowRightIcon from "../icons/ArrowRightIcon";
import {Link} from "react-router-dom";
import React from "react";

const ShowAllLink = ({ title, to }) => {
    return (
        <Link to={to}
              className="flex justify-center border-[#A7ACBA] border-t-[0.5px] py-2.5 hover:bg-gray-500/10">
            <div className="flex flex-row items-center gap-2.5">
                <span className="font-jost text-[#2D2A33] font-light">{ title }</span>

                <ArrowRightIcon className="h-2.5 fill-[#2D2A33]"/>
            </div>
        </Link>
    )
}
export default ShowAllLink;