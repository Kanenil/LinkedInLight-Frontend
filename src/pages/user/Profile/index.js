import defaultBg from '../../../assets/default-background.jpg'
import defaultImage from '../../../assets/default-image.jpg'
import CameraIcon from "../../../elements/CameraIcon/CameraIcon";
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import PencilIcon from "../../../elements/PencilIcon/PencilIcon";
import PlusIcon from "../../../elements/PlusIcon/PlusIcon";
import {Link} from "react-router-dom";
import ArrowRightIcon from "../../../elements/ArrowRightIcon/ArrowRightIcon";

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
        })
    }, [])

    return (
        <section className='flex-grow bg-[#E7E7E7]'>
            <div className="flex flex-row mt-8 mx-auto w-[1170px]">
                <div className="w-8/12 h-96">
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

                                        <button className="ml-6 text-[#24459A] font-medium">
                                            Contact information
                                        </button>
                                    </div>
                                    <div className="flex flex-row mt-1 font-jost text-[#24459A] text-sm">
                                        <h3 className="font-medium">Contacts:</h3>

                                        <h4 className="ml-4">*****</h4>
                                    </div>
                                    <div className="flex flex-row gap-4 mt-4">
                                        <button
                                            className="bg-[#24459A] rounded-full py-1.5 px-6 font-jost text-white text-sm hover:bg-[#112861]">Open
                                            to
                                        </button>

                                        <button
                                            className="border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">Add
                                            profile section
                                        </button>

                                        <button
                                            className="border-[#7D88A4] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#7D88A4] text-sm">More
                                        </button>
                                    </div>
                                </div>
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
                                    <div className="flex justify-center items-center p-5 bg-[#EAECF3] font-bold text-[#2D2A33]">
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
                                    <div className="flex justify-center items-center p-5 bg-[#EAECF3] font-bold text-[#2D2A33]">
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
                            <div key={`peopleMayKnow-${index}`} className="mt-2.5 py-2.5 border-[#24459A80] border-t-[0.5px]">
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

                                        <button className="group flex flex-row gap-2.5 items-center mt-2.5 w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF]">
                                            <PlusIcon className="fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-2"/>

                                            Connect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Link to={'/in'} className="mt-2.5 py-3 border-[#A7ACBA] border-t-[0.5px] flex flex-row justify-center gap-4 font-jost text-[#2D2A33] font-light">
                            Show all

                            <ArrowRightIcon className="fill-[#2D2A33] w-2.5"/>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Profile;