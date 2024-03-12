import bg from "../../../assets/home-background.png";
import jfy from "../../../assets/job-for-you.png";
import ArrowRightIcon from "../../../elements/ArrowRightIcon/ArrowRightIcon";
import CertificateIcon from "../../../elements/CertificateIcon/CertificateIcon";
import GroupIcon from "../../../elements/GroupIcon/GroupIcon";
import LightIcon from "../../../elements/LightIcon/LightIcon";
import LikeIcon from "../../../elements/LikeIcon/LikeIcon";
import FramedClickableText from "../../../elements/FramedClickableText/FramedClickableText";
import HiddenContent from "../../../elements/HiddenContent/HiddenContent";
import Modal from "../../../components/Modal/Modal";
import {useState} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";

const Home = () => {
    const [isVisible, setIsVisible] = useState(false)

    const openModal = () => {
        setIsVisible(true);
    };

    return (
        <main className="h-full">
            <section className="mx-auto w-[1170px] mt-36 mb-40">
                <img src={jfy} alt="Job for you"/>

                <h1 className="mt-[60px] text-center text-base text-white">
                    where we <strong>boost</strong> your potential,{" "}
                    <strong>reframe</strong> your career, and <strong>unite</strong>{" "}
                    professionals for unparalleled <br/> opportunities in the job market
                </h1>

                <button
                    onClick={openModal}
                    className="mt-12 flex gap-4 text-3xl font-semibold text-white ml-auto px-[71px] py-[10px] bg-[#0A48DBB2] rounded-full">
                    Get started
                    <ArrowRightIcon className="w-[16px] h-[16px] fill-white my-auto"/>
                </button>
            </section>
            <Modal setIsVisible={setIsVisible} isVisible={isVisible} onClose={() => console.log("Closing")}>
                <div className="flex flex-col h-full pt-[40px] px-[50px] pb-[69px]">
                    <h1 className="font-bold text-4xl text-[#2D2A33]">Which are you?</h1>

                    <div className="flex flex-row mt-[30px] gap-[40px]">
                        <Link to={routes.signUp} className="bg-[#E6E6E6] rounded-lg border-[1px] border-[#4869BC] py-[30px] px-[50px]">
                            <h1 className="text-left font-semibold text-3xl text-[#2D2A33]">Talent</h1>

                            <h3 className="font-light text-xl text-[#2D2A33] mt-[10px]">I’m here to work and learn</h3>
                        </Link>

                        <button className="bg-[#E6E6E6] rounded-lg border-[1px] border-[#4869BC] py-[30px] px-[50px]">
                            <h1 className="text-left font-semibold text-3xl text-[#2D2A33]">Business</h1>

                            <h3 className="font-light text-xl text-[#2D2A33] mt-[10px]">I need to find an employee</h3>
                        </button>
                    </div>
                </div>
            </Modal>
            <section className="bg-white py-24">
                <div className="flex flex-row mx-auto gap-[30px] w-[1170px] justify-center">
                    <div className="flex flex-row mr-5">
                        <CertificateIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                        <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                            <h1 className="font-bold text-3xl text-[#585359]">95 000</h1>

                            <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                registered companies
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-row mr-5">
                        <GroupIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                        <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                            <h1 className="font-bold text-3xl text-[#585359]">450 000</h1>

                            <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                job seekers
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-row mr-5">
                        <LightIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                        <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                            <h1 className="font-bold text-3xl text-[#585359]">17 000</h1>

                            <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                registered courses
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-row mr-5">
                        <LikeIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                        <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                            <h1 className="font-bold text-3xl text-[#585359]">98%</h1>

                            <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                satisfied users
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className="absolute top-0 left-0 z-[-1] h-full w-full"
                style={{background: `url(${bg})`}}
            />
            <div
                className="absolute top-0 left-0 z-[-1] h-full w-full"
                style={{
                    background: `linear-gradient(90deg, rgba(88, 83, 89, 0.6) 0%, rgba(45, 42, 51, 0.8) 100%)`,
                }}
            />
            <div className="font-thin w-full bg-zinc-200 text-2xl">
                <div className="text-center text-4xl py-20">
                    Choose the job of your dreams with{" "}
                    <span className="font-normal">Job for You</span>
                </div>

                <div className="ml-20">Popular Searches:</div>
                <div className="my-5 w-11/12 mx-auto">
                    <FramedClickableText>Finance</FramedClickableText>
                    <FramedClickableText>Information Technology</FramedClickableText>
                    <FramedClickableText>Media and Communications</FramedClickableText>
                    <FramedClickableText>Purchasing</FramedClickableText>
                    <FramedClickableText>
                        Military and Protective Services
                    </FramedClickableText>
                    <FramedClickableText>Real Estate</FramedClickableText>
                    <FramedClickableText>Product Management</FramedClickableText>
                    <FramedClickableText>Entrepreneurship</FramedClickableText>
                    <FramedClickableText>Education</FramedClickableText>
                    <FramedClickableText>
                        Community and Social Services
                    </FramedClickableText>
                    <FramedClickableText>Arts and Design</FramedClickableText>
                    <FramedClickableText>Marketing</FramedClickableText>
                    <FramedClickableText>Human Resources</FramedClickableText>
                    <FramedClickableText>Administrative Assistant</FramedClickableText>
                    <FramedClickableText>Business Development</FramedClickableText>
                    <FramedClickableText>Engineering</FramedClickableText>
                    <FramedClickableText>
                        Program and Project Management
                    </FramedClickableText>
                    <HiddenContent></HiddenContent>
                </div>
            </div>
        </main>
    );
};
export default Home;
