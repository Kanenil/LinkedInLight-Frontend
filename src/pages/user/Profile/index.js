import defaultBg from '../../../assets/default-background.jpg'
import defaultImage from '../../../assets/default-image.jpg'
import CameraIcon from "../../../elements/CameraIcon/CameraIcon";
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import PencilIcon from "../../../elements/PencilIcon/PencilIcon";
import PlusIcon from "../../../elements/PlusIcon/PlusIcon";
import {Link} from "react-router-dom";
import ArrowRightIcon from "../../../elements/ArrowRightIcon/ArrowRightIcon";
import OpenToButton from "../../../components/OpenToButton/OpenToButton";
import EyeIcon from "../../../elements/EyeIcon/EyeIcon";
import PeopleIcon from "../../../elements/PeopleIcon/PeopleIcon";
import Slider from "../../../components/Slider/Slider";

const peopleMayKnow = [
    {
        username: 'User Name_01',
        position: 'Position - Company Name',
        image: defaultImage
    },
    {
        username: 'User Name_02',
        position: 'Position - Company Name',
        image: defaultImage
    },
    {
        username: 'User Name_03',
        position: 'Position - Company Name',
        image: defaultImage
    },
    {
        username: 'User Name_04',
        position: 'Position - Company Name',
        image: defaultImage
    },
    {
        username: 'User Name_05',
        position: 'Position - Company Name',
        image: defaultImage
    }
]

const Profile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        profileService.profile().then(({data}) => {
            setUser(data)
        }).catch()
    }, [])

    return (
        <main className='bg-[#E7E7E7]'>
            <div className="flex flex-row my-8 mx-auto w-[1170px]">
                <div className="w-8/12">
                    <div className="rounded-t-lg overflow-hidden">
                        <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col bg-white rounded-b-lg">
                                <div className="relative w-full h-48" style={{background: `url(${defaultBg})`}}>
                                    <button
                                        className="absolute flex justify-center items-center rounded-full bg-white w-10 h-10 top-3 right-5">
                                        <CameraIcon/>
                                    </button>

                                    <button
                                        className="absolute left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                                        <img className="object-contain" src={defaultImage} alt="image"/>
                                    </button>
                                </div>
                                <div className="ml-10 mr-8 mt-14 mb-4">
                                    <div className="flex flex-row">
                                        <h1 className="font-bold text-2xl text-[#2D2A33]">{user?.firstName} {user?.lastName}</h1>

                                        <button className="ml-6">
                                            <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                                        </button>

                                        <h1 className="ml-auto font-jost text-[#2D2A33] font-bold mt-auto">Company</h1>
                                    </div>
                                    <h1 className="font-jost font-light text-[#2D2A33] mt-1">
                                        student at IT STEP Academy
                                    </h1>
                                    <div className="flex flex-row mt-1.5 font-jost text-sm">
                                        <h3 className="text-[#7F7F7F]">Ternopil City, Ukraine</h3>

                                        <button className="ml-6 text-[#24459A] font-medium hover:underline">
                                            Contact information
                                        </button>
                                    </div>
                                    <div className="flex flex-row mt-1 font-jost text-[#24459A] text-sm">
                                        <h3 className="font-medium">Contacts:</h3>

                                        <h4 className="ml-4">*****</h4>
                                    </div>
                                    <div className="flex flex-row gap-4 mt-4">
                                        <OpenToButton/>

                                        <button
                                            className="border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                            Add profile section
                                        </button>

                                        <button
                                            className="border-[#7D88A4] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#7D88A4] text-sm">
                                            More
                                        </button>
                                    </div>
                                </div>
                            </div>

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
                                            Level up your <span className="font-medium">Job For You</span> experience by filling in all your details and find the perfect job for you
                                        </h3>
                                    </div>
                                </div>

                                <Slider className="mt-2.5" width={220} initialIndex={1} items={5} perPage={3} containerClass="flex flex-row gap-6 w-fit">
                                    <div className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
                                        <h1 className="font-medium text-sm">Where do you currently work?</h1>

                                        <h3 className="mt-2.5 text-xs font-light">
                                            Add at least one position and become more visible to potential employers on <span className="font-medium">Job for You!</span>
                                        </h3>

                                        <div className="flex justify-center">
                                            <button
                                                className="border-[#24459A] mt-5 border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                                Add position
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
                                        <h1 className="font-medium text-sm">What is your field of work?</h1>

                                        <h3 className="mt-2.5 text-xs font-light">
                                            By specifying your field of work, you have a chance to get 2.5 times more views of your profile
                                        </h3>

                                        <div className="flex justify-center">
                                            <button
                                                className="border-[#24459A] mt-5 border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                                Add field of work
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
                                        <h1 className="font-medium text-sm">Add a profile picture</h1>

                                        <h3 className="mt-2.5 text-xs font-light">
                                            Add a photo and make your profile more visible to employers on <span className="font-medium">Job for You!</span>
                                        </h3>

                                        <div className="flex justify-center">
                                            <button
                                                className="border-[#24459A] mt-5 border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                                Add photo
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
                                        <h1 className="font-medium text-sm">Add skills</h1>

                                        <h3 className="mt-2.5 text-xs font-light">
                                            Highlight your key competencies and unique abilities, catching the attention of potential employers
                                        </h3>

                                        <div className="flex justify-center">
                                            <button
                                                className="border-[#24459A] mt-5 border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                                Add skills
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg">
                                        <h1 className="font-medium text-sm">Highlight your uniqueness</h1>

                                        <h3 className="mt-2.5 text-xs font-light">
                                            Add a short description to highlight your personality or work experience
                                        </h3>

                                        <div className="flex justify-center">
                                            <button
                                                className="border-[#24459A] mt-5 border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                                Add description
                                            </button>
                                        </div>
                                    </div>
                                </Slider>
                            </div>

                            <div className="rounded-lg bg-white overflow-hidden pt-8">
                                <div className="mx-10">
                                    <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Analytics</h1>

                                    <div className="flex flex-row items-center gap-2.5 mt-2">
                                        <EyeIcon className="h-4"/>

                                        <h3 className="text-sm font-roboto font-light text-[#7D7D7D]">This section is
                                            only visible to you</h3>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-7 py-2 mx-10 mt-2.5">
                                    <div className="flex flex-row w-[230px] gap-2.5 py-4">
                                        <PeopleIcon/>

                                        <div className="flex flex-col font-jost text-[#2D2A33] gap-2.5">
                                            <h1 className="font-medium text-lg">1 profile views</h1>

                                            <h3 className="font-light">Discover who's viewed your profile.</h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-row w-[230px] gap-2.5 py-4">
                                        <PeopleIcon/>

                                        <div className="flex flex-col font-jost text-[#2D2A33] gap-2.5">
                                            <h1 className="font-medium text-lg">1 profile views</h1>

                                            <h3 className="font-light">Discover who's viewed your profile.</h3>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/in"
                                      className="flex justify-center border-[#A7ACBA] border-t-[0.5px] py-2.5 hover:bg-gray-500/10">
                                    <div className="flex flex-row items-center gap-2.5">
                                        <span className="font-jost text-[#2D2A33] font-light">Show all analytics</span>

                                        <ArrowRightIcon className="h-2.5 fill-[#2D2A33]"/>
                                    </div>
                                </Link>
                            </div>

                            <div className="rounded-lg bg-white overflow-hidden pt-8">
                                <div className="flex flex-row font-jost mx-10">
                                    <h1 className="font-medium text-2xl text-[#2D2A33]">Activity</h1>

                                    <button className="ml-3.5">
                                        <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                                    </button>

                                    <button
                                        className="ml-auto border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                        Create a post
                                    </button>
                                </div>

                                <div className="flex flex-row gap-5 mt-4 mx-10">
                                    <button
                                        className="bg-[#24459A] font-jost text-white font-sm rounded-full py-1 px-5">
                                        Posts
                                    </button>

                                    <button
                                        className="border-[1px] border-[#24459A] font-jost font-sm text-[#556DA9] rounded-full py-1 px-5">
                                        Images
                                    </button>
                                </div>

                                <div className="flex flex-row gap-7 py-2 mx-10 mt-2.5">
                                    {Array.of([1, 2, 3, 4].map((number) =>
                                        <div key={`activity-${number}`}
                                             className="flex flex-col w-[160px] gap-2.5 py-4">
                                            <div className="bg-[#D9D9D9] w-[100px] h-[100px]"/>

                                            <div
                                                className="flex flex-row items-center font-jost text-xs font-light mt-2.5 gap-1">
                                                <span>Published</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"
                                                     viewBox="0 0 1 1" fill="none">
                                                    <path
                                                        d="M0 0.503906C0 0.389974 0.0358073 0.293945 0.107422 0.21582C0.182292 0.13444 0.283203 0.09375 0.410156 0.09375C0.540365 0.09375 0.642904 0.132812 0.717773 0.210938C0.792643 0.289062 0.830078 0.386719 0.830078 0.503906C0.830078 0.614583 0.792643 0.708984 0.717773 0.787109C0.642904 0.865234 0.540365 0.904297 0.410156 0.904297C0.283203 0.904297 0.182292 0.865234 0.107422 0.787109C0.0358073 0.708984 0 0.614583 0 0.503906Z"
                                                        fill="#2D2A33"/>
                                                </svg>

                                                <span>when</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"
                                                     viewBox="0 0 1 1" fill="none">
                                                    <path
                                                        d="M0 0.503906C0 0.389974 0.0358073 0.293945 0.107422 0.21582C0.182292 0.13444 0.283203 0.09375 0.410156 0.09375C0.540365 0.09375 0.642904 0.132812 0.717773 0.210938C0.792643 0.289062 0.830078 0.386719 0.830078 0.503906C0.830078 0.614583 0.792643 0.708984 0.717773 0.787109C0.642904 0.865234 0.540365 0.904297 0.410156 0.904297C0.283203 0.904297 0.182292 0.865234 0.107422 0.787109C0.0358073 0.708984 0 0.614583 0 0.503906Z"
                                                        fill="#2D2A33"/>
                                                </svg>

                                                <span>privacy</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/in"
                                      className="flex justify-center border-[#A7ACBA] border-t-[0.5px] py-2.5 hover:bg-gray-500/10">
                                    <div className="flex flex-row items-center gap-2.5">
                                        <span className="font-jost text-[#2D2A33] font-light">Show all activity</span>

                                        <ArrowRightIcon className="h-2.5 fill-[#2D2A33]"/>
                                    </div>
                                </Link>
                            </div>

                            <div className="rounded-lg bg-white py-8 px-10">
                                <div className="flex flex-row font-jost">
                                    <h1 className="font-medium text-2xl text-[#2D2A33]">Education</h1>

                                    <button className="ml-3.5">
                                        <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                                    </button>

                                    <button
                                        className="ml-auto border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                        Add education
                                    </button>
                                </div>

                                <div className="mt-2.5 py-2.5 flex flex-row gap-5">
                                    <div
                                        className="flex justify-center items-center p-5 bg-[#EAECF3] font-bold text-[#2D2A33]">
                                        logo
                                    </div>

                                    <div className="py-[5px] font-jost">
                                        <h1 className="font-medium text-[#2D2A33]">IT STEP Academy</h1>

                                        <h3 className="font-light text-[#556DA9] mt-2.5">2021 - 2024</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white py-8 px-10">
                                <div className="flex flex-row font-jost">
                                    <h1 className="font-medium text-2xl text-[#2D2A33]">Experience</h1>

                                    <button className="ml-3.5">
                                        <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                                    </button>

                                    <button
                                        className="ml-auto border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">
                                        Add experience
                                    </button>
                                </div>

                                <div className="mt-2.5 py-2.5 flex flex-row gap-5">
                                    <div
                                        className="flex justify-center items-center p-5 bg-[#EAECF3] font-bold text-[#2D2A33]">
                                        logo
                                    </div>

                                    <div className="py-[5px] font-jost">
                                        <h1 className="font-medium text-[#2D2A33]">Company Name</h1>

                                        <h3 className="font-light text-[#556DA9] mt-2.5">2021 - 2024</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12 ml-10">
                    <div className="flex flex-col bg-white rounded-lg pb-5">
                        <div className="flex flex-row mx-5 mt-5">
                            <h3 className="font-jost text-[#2D2A33] text-xl">Language</h3>

                            <button className="ml-auto mr-1.5">
                                <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                            </button>
                        </div>

                        <div className="flex flex-row mx-5 mt-5 pt-3 border-t-[0.5px] border-[#24459A80]">
                            <h3 className="font-jost text-[#2D2A33] text-xl">Public profile</h3>

                            <button className="ml-auto mr-1.5">
                                <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                            </button>
                        </div>

                        <div className="flex flex-col mx-5 mt-5 pt-2.5 border-t-[0.5px] border-[#24459A80]">
                            <div className="flex flex-row">
                                <h3 className="font-jost text-[#2D2A33] text-xl">URL</h3>

                                <button className="ml-auto mr-1.5">
                                    <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                                </button>
                            </div>

                            <h3 className="font-jost text-[#7D7D7D] text-sm">www.job4you.com/in/user-name-1988a12b9</h3>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2.5 bg-white rounded-lg px-5 pt-5">
                        <h1 className="font-jost text-xl text-[#2D2A33] font-medium">People you may know</h1>

                        {peopleMayKnow.map((person, index) =>
                            <div key={`peopleMayKnow-${index}`}
                                 className="mt-2.5 py-2.5 border-[#24459A80] border-t-[0.5px]">
                                <div className="flex flex-row">
                                    <div
                                        className="rounded-full overflow-hidden w-10 h-10 border-[1px] border-[#2D2A33] bg-[#E7E7E7]">
                                        <img className="object-contain" src={person.image} alt="image"/>
                                    </div>

                                    <div className="flex flex-col ml-2.5 font-jost text-[#2D2A33]">
                                        <h1 className="font-medium text-lg">{person.username}</h1>

                                        <h3 className="flex flex-row font-light">
                                            {person.position}
                                        </h3>

                                        <button
                                            className="group flex flex-row gap-2.5 items-center mt-2.5 w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF]">
                                            <PlusIcon
                                                className="fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-2"/>

                                            Add contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Link to={'/in'}
                              className="mt-2.5 py-3 border-[#A7ACBA] border-t-[0.5px] flex flex-row justify-center gap-4 font-jost text-[#2D2A33] font-light">
                            Show all

                            <ArrowRightIcon className="fill-[#2D2A33] w-2.5"/>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Profile;