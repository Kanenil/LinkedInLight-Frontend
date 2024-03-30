import bg from "../../assets/home-background.png";
import jfy from "../../assets/job-for-you.png";
import ArrowRightIcon from "../../elements/icons/ArrowRightIcon";
import CertificateIcon from "../../elements/icons/CertificateIcon";
import GroupIcon from "../../elements/icons/GroupIcon";
import LightIcon from "../../elements/icons/LightIcon";
import LikeIcon from "../../elements/icons/LikeIcon";
import FramedClickableText from "../../elements/text/FramedClickableText";
import HiddenContent from "../../components/home/HiddenContent";
import React from "react";
import {Link} from "react-router-dom";
import {routes} from "../../constants/routes";
import {Helmet} from "react-helmet-async";
import home1 from "../../assets/home1-illustration.jpg";
import home2 from "../../assets/home2-illustration.jpg";
import home3 from "../../assets/home3-illustration.png";
import home4 from "../../assets/home4-illustration.png";
import home5 from "../../assets/home5-illustration.png";
import home6 from "../../assets/home6-illustration.png";
import ChevronLeftIcon from "../../elements/icons/ChevronDownIcon";
import Slider from "../../components/shared/Slider";
import {designedFor, popularSearches, whyChoose} from "./data";
import {useTranslation} from "react-i18next";

const SliderItem = ({title, description}) => {
    return (
        <div className="w-[570px] h-[354px] flex flex-col gap-[40px]">
            <h1 className="ml-[15px] text-[30px] leading-[48px] font-medium text-[#2E467E]">{title}</h1>

            <h3 dangerouslySetInnerHTML={{__html: description}}
                className="ml-[15px] font-light text-[22px] leading-[35.2px] text-[#2D2A33] w-[540px]"/>
        </div>
    )
}

const Home = () => {
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <Helmet>
                <title>{t('home.title')}</title>
            </Helmet>
            <main className="flex-grow">
                <section className="mx-auto w-[1170px] mt-36 mb-40">
                    <img src={jfy} alt="Job for you"/>

                    <h1 className="mt-[60px] mx-auto w-[765px] text-center text-base text-white">
                        {t('home.whereWe')} <strong>{t('home.boost')}</strong> {t('home.potential')},{" "}
                        <strong>{t('home.reframe')}</strong> {t('home.career')}, {t('home.and')}{" "}
                        <strong>{t('home.unite')}</strong>{" "}
                        {t('home.professionals')}
                    </h1>

                    <Link
                        to={routes.signUp}
                        className="mt-12 flex gap-4 text-3xl font-semibold text-white w-fit ml-auto px-[71px] py-[10px] bg-[#0A48DBB2] hover:bg-[#24459A] rounded-full transition duration-500 ease-in-out">
                        {t('home.getStarted')}
                        <ArrowRightIcon className="w-[16px] h-[16px] fill-white my-auto"/>
                    </Link>
                </section>
                <section className="bg-white py-24">
                    <div className="flex flex-row mx-auto gap-[30px] w-[1170px] justify-center">
                        <div className="flex flex-row mr-5">
                            <CertificateIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                                <h1 className="font-bold text-3xl text-[#585359]">95 000</h1>

                                <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                    {t('home.registeredCompanies')}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row mr-5">
                            <GroupIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                                <h1 className="font-bold text-3xl text-[#585359]">450 000</h1>

                                <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                    {t('home.jobSeekers')}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row mr-5">
                            <LightIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                                <h1 className="font-bold text-3xl text-[#585359]">17 000</h1>

                                <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                    {t('home.registeredCourses')}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row mr-5">
                            <LikeIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                                <h1 className="font-bold text-3xl text-[#585359]">98%</h1>

                                <h3 className="font-medium text-lg text-[#585359] text-wrap">
                                    {t('home.satisfiedUsers')}
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
                <div className="font-thin w-full bg-zinc-200 text-2xl pt-[60px] pb-[80px]">
                    <div className="text-center text-4xl py-20">
                        {t('home.dreamJob')}{" "}
                        <span className="font-medium">Job for You</span>
                    </div>

                    <div className="mx-auto w-[1170px]">
                        <div className="text-lg uppercase font-light">Popular Searches:</div>
                        <div className="mt-2.5 mx-auto">
                            {popularSearches.map((val, index) =>
                                <FramedClickableText key={`popularSearches-${index}`}>{val}</FramedClickableText>
                            )}
                            <HiddenContent></HiddenContent>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row mx-auto w-[1170px] pt-[80px] pb-[60px]">
                    <div className="flex flex-col gap-[50px] w-[568px] pr-[15px]">
                        <h3 className="text-[#2E467E] text-5xl font-medium">
                            Who is <span className="font-bold">Job for You</span> designed for?
                        </h3>

                        <div className="flex flex-col gap-[20px]">
                            {designedFor.map((val, index) =>
                                <div
                                    key={`designedFor-${index}`}
                                    className="flex flex-row py-2.5 px-4 bg-[#F1F1F1]"
                                >
                                    <h1 className="text-lg text-[#2D2A33] font-light">{val}</h1>

                                    <ChevronLeftIcon className="ml-auto w-5 fill-[#4F7BE2]"
                                                     style={{transform: "rotate(-90deg)"}}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mx-auto">
                        <img className="w-fit h-fit" src={home1} alt="designed-for-illustration"/>
                    </div>
                </div>
                <div className="flex flex-col gap-[50px] mx-auto w-[1170px] pt-[60px] pb-[80px]">
                    <h1 className="text-[#2D2A33] font-light text-4xl text-center">
                        Why choose <span className="font-bold">Job for You</span> for your job search?
                    </h1>

                    <div className="flex flex-row items-center gap-[30px] ">
                        <div className="mx-auto">
                            <img className="w-fit h-fit" src={home2} alt="designed-for-illustration"/>
                        </div>

                        <div className="overflow-hidden">
                            <Slider
                                className="flex flex-col mx-auto w-[570px] h-[354px] my-auto pt-[12px] px-[15px]"
                                containerClass="flex flex-row gap-6 w-fit"
                                isNewDesignStyle={true}
                            >
                                {whyChoose.map((choose, index) =>
                                    <SliderItem key={`whyChoose-${index}`} {...choose}/>
                                )}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="bg-[#E7E7E7] w-full pt-[80px] h-[1188px] px-[13px] flex flex-row gap-[30px]">
                    <img className="w-fit h-fit" src={home3} alt="find-job-illustration"/>

                    <div className="flex flex-col items-center gap-[60px]">
                        <div className="flex flex-col mr-auto gap-[5px] text-[#2E467E]">
                            <h1 className="font-semibold text-[50px] leading-[80px]">Find a Job</h1>
                            <h3 className="font-light text-[44px] leading-[70.4px]">without leaving Home</h3>
                            <h3 className="font-light text-[44px] leading-[70.4px]">with <span className="font-medium">Job for You</span>
                            </h3>
                        </div>

                        <h3 className="text-[#2D2A33] font-light text-[30px] w-[570px] leading-[48px]">
                            Explore remote positions and international opportunities with us, connecting skilled
                            individuals with the world during challenging times. Your career journey continues,
                            regardless of borders, with our support.
                        </h3>

                        <Link to={routes.signUp}
                              className="mt-[20px] ml-auto flex flex-row gap-[20px] items-center border-[1px] border-[#0A48DB] py-2 px-7 rounded-full text-[#2E467E] text-xl font-semibold">
                            <span>Find a Job</span>
                            <ArrowRightIcon className="w-5 fill-[#2E467E]"/>
                        </Link>
                    </div>
                </div>
                <div
                    className="flex flex-row mt-[-230px] mb-[102px] justify-center gap-[35px] pt-[80px] px-2.5 pb-[40px]">
                    <div
                        className="relative flex flex-col bg-white w-[360px] h-[460px] rounded-tl-[100px] rounded-bl-[10px]"
                        style={{boxShadow: "0px 1px 6px 0px #2D2A3340"}}>
                        <img className="absolute left-1/4 -top-20 w-fit h-fit" src={home4} alt="sign-up"/>

                        <h1 className="mt-[100px] mx-[25px] text-[#4E79E0] text-[24px] leading-[38.4px] text-center font-bold">
                            Sign Up
                        </h1>

                        <h3 className="text-[#2D2A33] mx-[25px] mt-[25px] text-[16px] leading-[25.6px] text-center">
                            Join Job for You by registering through the 'Sign Up' button in the top right corner of the
                            screen or the 'Get started' button in the top of the screen. Additionally, we've prepared a
                            step-by-step guide to make the registration process smoother for you.
                        </h3>

                        <Link to="/"
                              className="flex flex-row items-center justify-center mt-auto mb-[25px] w-fit mx-auto gap-[10px] py-[5px] px-[15px] rounded-full bg-[#0A48DBB2] text-center text-[16px] leading-[24px] font-semibold text-white">
                            <span>How to sign up</span>
                            <ChevronLeftIcon className="fill-white w-[18px] h-[15.75px]"
                                             style={{transform: "rotate(-90deg)"}}/>
                        </Link>
                    </div>

                    <div className="relative bg-white w-[360px] h-[460px]"
                         style={{boxShadow: "0px 1px 6px 0px #2D2A3340"}}>
                        <img className="absolute left-1/4 -top-20 w-fit h-fit" src={home5}
                             alt="complete-profile"/>

                        <h1 className="font-raleway mt-[100px] mx-[25px] text-[#4E79E0] text-[24px] leading-[38.4px] text-center font-bold">
                            Complete profile
                        </h1>

                        <h3 className="text-[#2D2A33] mx-[25px] mt-[25px] text-[16px] leading-[25.6px] text-center">
                            To enhance your profile, upload your CV or resume. Alternatively, manually input your
                            education, work experience, and skills directly into your profile. For guidance on providing
                            accurate information, check out our tutorial crafted to assist you in presenting your
                            qualifications effectively.
                        </h3>

                        <Link to="/"
                              className="flex flex-row items-center justify-center mt-[30px] w-fit mx-auto gap-[10px] py-[5px] px-[15px] rounded-full bg-[#0A48DBB2] text-center text-[16px] leading-[24px] font-semibold text-white">
                            <span>Watch tutorial</span>
                            <ChevronLeftIcon className="fill-white w-[18px] h-[15.75px]"
                                             style={{transform: "rotate(-90deg)"}}/>
                        </Link>
                    </div>

                    <div className="relative bg-white w-[360px] h-[460px] rounded-tr-[100px] rounded-br-[10px]"
                         style={{boxShadow: "0px 1px 6px 0px #2D2A3340"}}>
                        <img className="absolute left-1/4 -top-20 w-fit h-fit" src={home6}
                             alt="land-your-dream-job"/>

                        <h1 className="font-raleway mt-[100px] mx-[25px] text-[#4E79E0] text-[24px] leading-[38.4px] text-center font-bold">
                            Land your dream job
                        </h1>

                        <h3 className="text-[#2D2A33] mx-[25px] mt-[25px] text-[16px] leading-[25.6px] text-center">
                            Explore our Jobs section to discover opportunities tailored to your experience and
                            education. Our platform uses the details you provide to match you with suitable job options.
                            Submit applications and secure your next career move!
                        </h3>

                        <Link to="/"
                              className="flex flex-row items-center justify-center mt-[82px] w-fit mx-auto gap-[10px] py-[5px] px-[15px] rounded-full bg-[#0A48DBB2] text-center text-[16px] leading-[24px] font-semibold text-white">
                            <span>Find a Job</span>
                            <ChevronLeftIcon className="fill-white w-[18px] h-[15.75px]"
                                             style={{transform: "rotate(-90deg)"}}/>
                        </Link>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
};
export default Home;
