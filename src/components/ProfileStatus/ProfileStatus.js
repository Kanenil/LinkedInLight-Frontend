import EyeIcon from "../../elements/EyeIcon/EyeIcon";
import Slider from "../Slider/Slider";
import ProfileButton from "../ProfileButton/ProfileButton";

const suggestions = [
    {
        title: "Where do you currently work?",
        description: "Add at least one position and become more visible to potential employers on <span className=\"font-medium\">Job for You!</span>",
        buttonTitle: "Add position",
        width: 220
    },
    {
        title: "What is your field of work?",
        description: "By specifying your field of work, you have a chance to get 2.5 times more views of your profile",
        buttonTitle: "Add field of work",
        width: 220
    },
    {
        title: "Add a profile picture",
        description: "Add a photo and make your profile more visible to employers on <span className=\"font-medium\">Job for You!</span>\n",
        buttonTitle: "Add photo",
        width: 220
    },
    {
        title: "Add skills",
        description: "Highlight your key competencies and unique abilities, catching the attention of potential employers",
        buttonTitle: "Add skills",
        width: 220
    },
    {
        title: "Highlight your uniqueness",
        description: "Add a short description to highlight your personality or work experience",
        buttonTitle: "Add description",
        width: 220
    }
]

const SliderItem = ({title, description, buttonTitle, onButtonClick}) => {
    return (
        <div
            className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
            <h1 className="font-medium text-sm">{title}</h1>

            <h3 dangerouslySetInnerHTML={{__html: description}} className="mt-2.5 text-xs font-light"/>

            <div className="flex justify-center mt-4 mb-4">
                <ProfileButton title={buttonTitle} onClickHandler={onButtonClick}/>
            </div>
        </div>
    )
}

const ProfileStatus = ({ user }) => {
    return (
        <div className="rounded-lg bg-white overflow-hidden px-10 py-8">
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

                        <h3 className="ml-6 text-[#24459A]">*****</h3>

                        <h3 className="ml-auto text-[#24459A]">*/7</h3>
                    </div>

                    <div className="mt-2.5 flex flex-row gap-4">
                        <div className="h-2 w-full bg-[#24459A]"/>
                        {Array.from(Array(6).keys()).map(value =>
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

            <Slider className="mt-2.5" initialIndex={1} perPage={3} containerClass="flex flex-row gap-6 w-fit">
                {suggestions.map((suggestion, index) =>
                    <SliderItem key={`suggestion-${index}`} {...suggestion}/>
                )}
            </Slider>
        </div>
    )
}
export default ProfileStatus;