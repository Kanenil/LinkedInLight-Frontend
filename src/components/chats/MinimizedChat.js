import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {useQuery} from "@tanstack/react-query";
import ProfileService from "../../services/profileService";
import React, {useState} from "react";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Show from "../../elements/shared/Show";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import MinimizedChatsList from "./MinimizedChatsList";

const MinimizedChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data} = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    });
    const imageUrl = data?.image ? APP_ENV.UPLOADS_URL + "/" + data?.image : defaultImage;

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="fixed z-20 w-80 bg-white rounded-t-xl flex flex-col left-[75vw] bottom-0"
             style={{boxShadow: "0px 2px 10px rgba(71, 77, 92, 0.25)"}}>
            <button onClick={toggleOpen} className="w-full py-2 border-b-[1px] border-b-[#B4BFDD]">
                <Show>
                    <Show.When isTrue={isOpen}>
                        <ChevronDownIcon className="mx-auto w-5 h-5"/>
                    </Show.When>

                    <Show.Else>
                        <ChevronUpIcon className="mx-auto w-5 h-5"/>
                    </Show.Else>
                </Show>
            </button>

            <div className="flex flex-row gap-5 items-center px-4 py-2">
                <div className="w-8 h-8 overflow-hidden rounded-full my-auto border-2 border-[#2D2A33]">
                    <img alt="image" className="object-contain"
                         src={imageUrl}/>
                </div>

                <h1 className="font-jost font-medium">Messages</h1>

                <div className="ml-auto items-center gap-5 flex flex-row">
                    <h3 className="text-3xl -mt-3 font-mono">...</h3>
                    <PencilSquareIcon className="w-6 h-6"/>
                </div>
            </div>

            <ConditionalWrapper condition={isOpen}>
                <MinimizedChatsList/>
            </ConditionalWrapper>
        </div>
    )
}
export default MinimizedChat;