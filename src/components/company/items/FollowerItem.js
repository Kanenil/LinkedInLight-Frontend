import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import React from "react";
import AddButton from "../../../elements/buttons/AddButton";

const FollowerItem = ({image, firstName, lastName, headline, profileUrl}) => {
    return (
        <div className="bg-white flex flex-col rounded-lg py-6 mx-auto md:mx-0">
            <div className="px-10">
                <div
                    className="overflow-hidden mx-auto h-20 w-20 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                    <img className="object-contain"
                         src={image ? APP_ENV.UPLOADS_URL + "/" + image : defaultImage}
                         alt="image"/>
                </div>

                <div className="flex flex-col mx-auto gap-1">
                    <h1 className="font-jost text-2xl font-medium">{firstName} {lastName}</h1>

                    <h3>{headline}</h3>
                </div>
            </div>

            <div className="mt-10 px-3 w-full">
                <AddButton className="w-full justify-center text-lg" withIcon={false} to={`/j4y/${profileUrl}`}>
                    To profile
                </AddButton>
            </div>
        </div>
    )
}
export default FollowerItem;