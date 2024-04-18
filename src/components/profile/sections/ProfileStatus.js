import EyeIcon from "../../../elements/icons/EyeIcon";
import Slider from "../../shared/Slider";
import ProfileButton from "../../../elements/buttons/ProfileButton";
import {useEffect, useState} from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import {asyncFilter} from "../../../utils/converters";
import ProfileService from "../../../services/profileService";
import {useQueryClient} from "@tanstack/react-query";
import useMobileDetector from "../../../hooks/useMobileDetector";

const suggestions = [
    {
        title: "Where do you currently work?",
        description: "Add at least one position and become more visible to potential employers on <span className=\"font-medium\">Job for You!</span>",
        buttonTitle: "Add position",
        to: "edit/experience",
        width: 220,
        condition: async function(queryClient, user) {
            const {data} = await queryClient.fetchQuery({
                queryFn: ({queryKey}) => ProfileService.getExperiencesByProfileUrl(queryKey[1]),
                queryKey: ['experiences', user.profileUrl],
            })
            return data.filter(val => val.currentlyWorking).length === 0;
        }
    },
    {
        title: "What is your field of work?",
        description: "By specifying your field of work, you have a chance to get 2.5 times more views of your profile",
        buttonTitle: "Add field of work",
        to: "edit/intro",
        width: 220,
        condition: 'industry'
    },
    {
        title: "Add a profile picture",
        description: "Add a photo and make your profile more visible to employers on <span className=\"font-medium\">Job for You!</span>\n",
        buttonTitle: "Add photo",
        to: "edit/image",
        width: 220,
        condition: 'image'
    },
    {
        title: "Add skills",
        description: "Highlight your key competencies and unique abilities, catching the attention of potential employers",
        buttonTitle: "Add skills",
        to: "edit/skill",
        width: 220,
        condition: async function(queryClient, user) {
            const {data} = await queryClient.fetchQuery({
                queryFn: ({queryKey}) => ProfileService.getSkillsByProfileUrl(queryKey[1]),
                queryKey: ['skills', user.profileUrl],
            })
            return data.length === 0;
        }
    },
    {
        title: "Highlight your uniqueness",
        description: "Add a short description to highlight your personality or work experience",
        buttonTitle: "Add description",
        to: "edit/general-information",
        width: 220,
        condition: 'about'
    }
]

const SliderItem = ({title, description, buttonTitle, to}) => {
    return (
        <div
            className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
            <h1 className="font-medium text-sm">{title}</h1>

            <h3 dangerouslySetInnerHTML={{__html: description}} className="min-h-[48px] mt-2.5 text-xs font-light"/>

            <div className="flex justify-center mt-4 mb-4">
                <ProfileButton title={buttonTitle} to={to}/>
            </div>
        </div>
    )
}

const ProfileStatus = ({user, isOwner}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (user) {
            asyncFilter(suggestions, async (suggestion) => {
                if(typeof suggestion.condition === 'function')
                    return await suggestion.condition(queryClient, user);

                return await new Promise((resolve) => {
                    const userValue = user[suggestion.condition];
                    resolve(userValue === "" || userValue === null || userValue?.length === 0);
                });
            }).then(resp => {
                setFilteredSuggestions(resp);
            })
        }
    }, [user])

    const maxLevel = suggestions.length;

    const {isMobile} = useMobileDetector();

    return (
        <ConditionalWrapper condition={filteredSuggestions.length > 0 && isOwner}>
            <div
                className="rounded-lg bg-white overflow-hidden px-6 md:px-10 py-8">
                <div>
                    <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Profile status</h1>

                    <div className="flex flex-row items-center gap-2.5 mt-2">
                        <EyeIcon className="h-4"/>

                        <h3 className="text-sm font-roboto font-light text-[#7D7D7D]">This section is
                            only visible to you</h3>
                    </div>

                    <div className="pt-4">
                        <div className="flex flex-row font-roboto font-medium ">
                            <h1 className="text-[#2D2A33]">Level:</h1>

                            <h3 className="ml-6 text-[#24459A]">{maxLevel - filteredSuggestions.length}</h3>

                            <h3 className="ml-auto text-[#24459A]">{maxLevel - filteredSuggestions.length}/{maxLevel}</h3>
                        </div>

                        <div className="mt-2.5 flex flex-row gap-4">
                            {Array.from(Array(maxLevel - filteredSuggestions.length).keys()).map(val =>
                                <div key={`fill-level-${val}`} className="h-2 w-full bg-[#24459A]"/>
                            )}
                            {Array.from(Array(maxLevel - (maxLevel - filteredSuggestions.length)).keys()).map(value =>
                                <div key={`level-${value}`}
                                     className="h-2 w-full bg-[#E5E9F4]"/>
                            )}
                        </div>

                        <h3 className="mt-2.5 font-jost font-light">
                            Level up your <span className="font-medium">Job For You</span> experience by filling in all your
                            details and find the perfect job for you
                        </h3>
                    </div>
                </div>

                <ConditionalWrapper condition={filteredSuggestions.length > 0}>
                    <Slider className="mt-2.5" perPage={isMobile?1:3}
                            onReset={user}
                            containerClass="flex flex-row gap-6 w-fit [&>*:nth-child(n+1)]:ml-3.5 md:[&>*:nth-child(n+1)]:ml-0">
                        {filteredSuggestions.map((suggestion, index) =>
                            <SliderItem key={`suggestion-${index}`} {...suggestion}/>
                        )}
                    </Slider>
                </ConditionalWrapper>
            </div>
        </ConditionalWrapper>
    )
}
export default ProfileStatus;