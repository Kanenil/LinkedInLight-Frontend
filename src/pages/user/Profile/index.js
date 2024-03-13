import defaultBg from '../../../assets/default-background.jpg'
import defaultImage from '../../../assets/default-image.jpg'
import CameraIcon from "../../../elements/CameraIcon/CameraIcon";
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import PencilIcon from "../../../elements/PencilIcon/PencilIcon";

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
                        <div className="flex flex-col gap-6">
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
                                        <button className="bg-[#24459A] rounded-full py-1.5 px-6 font-jost text-white text-sm">Open to</button>

                                        <button className="border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">Add profile section</button>

                                        <button className="border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm">More</button>
                                    </div>
                                </div>
                            </div>

                            <div className=" h-96 bg-red-500">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12 h-96 ml-10 bg-blue-500">

                </div>
            </div>
        </section>
    )
}
export default Profile;