import bg from "../../assets/home-background.png";
import jfy from "../../assets/job-for-you.png";
import ArrowRightIcon from "../../elements/icons/ArrowRightIcon";
import CertificateIcon from "../../elements/icons/CertificateIcon";
import GroupIcon from "../../elements/icons/GroupIcon";
import LightIcon from "../../elements/icons/LightIcon";
import LikeIcon from "../../elements/icons/LikeIcon";
import FramedClickableText from "../../elements/text/FramedClickableText";
import HiddenContent from "../../components/home/HiddenContent";
import React, {useLayoutEffect, useState} from "react";
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
import {useTranslation} from "react-i18next";

const SliderItem = ({title, description}) => {
    return (
        <div className="w-[90vw] md:w-[33vw] h-fit flex flex-col gap-[40px]">
            <h1 className="ml-[15px] text-lg md:text-[30px] md:leading-[48px] font-medium text-[#2E467E] w-[85vw] md:w-[28vw]">{title}</h1>

            <h3 dangerouslySetInnerHTML={{__html: description}}
                className="ml-[15px] font-light text-wrap lg:text-[22px] lg:leading-[35.2px] h-fit text-[#2D2A33] w-[85vw] md:w-[28vw]"/>
        </div>
    )
}

const calculateWidth = (width) => (width * (width > 760 ? 33 : 90)) / 100

const Home = () => {
    const [size, setSize] = useState(calculateWidth(window.innerWidth));
    const {t, i18n} = useTranslation();
    const font = i18n.language.includes('uk') ? 'font-light font-jost' : '';

    const popularSearches = t("home.popularSearches", {returnObjects: true});
    const designedFor = t("home.designedFor", {returnObjects: true});
    const whyChoose = t("home.whyChooseSlider", {returnObjects: true});

    useLayoutEffect(() => {
        function updateSize() {
            setSize(calculateWidth(window.innerWidth));
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{t('home.title')}</title>
            </Helmet>
            <main className="flex-grow">
                <section className="w-full px-5 sm:mx-auto sm:container md:w-[1170px] mt-36 mb-40">
                    <img className="object-contain" src={jfy} alt="Job for you"/>

                    <h1 className={`mt-[60px] [&>strong]:font-bold mx-auto md:w-[765px] text-center text-sm sm:text-base font-light text-white ${font}`}
                        dangerouslySetInnerHTML={{__html: t('home.slogan')}}/>

                    <Link
                        to={routes.signUp}
                        className="mt-12 flex gap-4 text-lg md:text-3xl font-semibold text-white w-fit ml-auto px-8 md:px-[71px] py-4 md:py-[10px] bg-[#0A48DBB2] hover:bg-[#24459A] rounded-full transition duration-500 ease-in-out">
                        {t('home.getStarted')}
                        <ArrowRightIcon className="w-[16px] h-[16px] fill-white my-auto"/>
                    </Link>
                </section>
                <section className="bg-white py-10 md:py-24">
                    <div
                        className="flex flex-row flex-wrap lg:flex-nowrap mx-2 sm:mx-auto gap-6 sm:gap-[30px] w-full sm:container md:w-[1170px] justify-center">
                        <div className="flex flex-row max-w-40 sm:mr-5 sm:max-w-full">
                            <CertificateIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-5 md:ml-8 w-full sm:max-w-[170px]">
                                <h1 className="font-bold text-xl sm:text-3xl text-[#585359]">95 000</h1>

                                <h3 className="font-medium text-sm sm:text-lg text-[#585359] text-wrap">
                                    {t('home.registeredCompanies')}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row max-w-40 sm:mr-5 sm:max-w-full">
                            <GroupIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-5 sm:ml-8 w-full sm:max-w-[170px]">
                                <h1 className="font-bold text-xl sm:text-3xl text-[#585359]">450 000</h1>

                                <h3 className="font-medium text-sm sm:text-lg text-[#585359] text-wrap">
                                    {t('home.jobSeekers')}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row max-w-40 sm:mr-5 sm:max-w-full">
                            <LightIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-5 md:ml-8 w-full sm:max-w-[170px]">
                                <h1 className="font-bold text-xl sm:text-3xl text-[#585359]">17 000</h1>

                                <h3 className="font-medium text-sm sm:text-lg text-[#585359] text-wrap">
                                    {t('home.registeredCourses')}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row max-w-40 sm:mr-5 sm:max-w-full">
                            <LikeIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto"/>
                            <div className="flex flex-col gap-4 ml-5 md:ml-8 w-full sm:max-w-[170px]">
                                <h1 className="font-bold text-xl sm:text-3xl text-[#585359]">98%</h1>

                                <h3 className="font-medium text-sm sm:text-lg text-[#585359] text-wrap">
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
                <section className="font-thin w-full bg-zinc-200 text-2xl pb-7 sm:pt-[60px] sm:pb-[80px]">
                    <div className={`text-center text-4xl py-6 md:py-20 ${font}`}>
                        {t('home.dreamJob')}{" "}
                        <span className="font-medium">Job for You</span>
                    </div>

                    <div className="mx-4 sm:container sm:mx-auto md:w-[1170px]">
                        <div className={`text-lg uppercase font-light ${font}`}>{t('home.popularSearchesText')}</div>
                        <div className={`mt-2.5 mx-auto ${font}`}>
                            {popularSearches.map((val, index) =>
                                <FramedClickableText key={`popularSearches-${index}`}>{val}</FramedClickableText>
                            )}
                            <HiddenContent></HiddenContent>
                        </div>
                    </div>
                </section>
                <section className="flex flex-row sm:mx-auto sm:container md:mx-auto md:w-[1170px] pt-[80px] pb-[60px]">
                    <div className="flex flex-col mx-4 gap-[50px] sm:w-[568px] pr-[15px]">
                        <h3 className="text-[#2E467E] text-4xl sm:text-5xl [&>strong]:font-bold sm:leading-[70px]"
                            dangerouslySetInnerHTML={{__html: t('home.whoIs')}}/>

                        <div className={`flex flex-col gap-[20px] ${font}`}>
                            {designedFor.map((val, index) =>
                                <div
                                    key={`designedFor-${index}`}
                                    className="flex flex-row py-2.5 px-4 bg-[#F1F1F1]"
                                >
                                    <h1 className="text-lg text-[#2D2A33]">{val}</h1>

                                    <ChevronLeftIcon className="ml-auto w-5 fill-[#4F7BE2]"
                                                     style={{transform: "rotate(-90deg)"}}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:block mx-auto my-auto">
                        <img className="w-fit h-fit" src={home1} alt="designed-for-illustration"/>
                    </div>
                </section>
                <section
                    className="flex flex-col gap-[50px] px-8 sm:mx-auto sm:container md:mx-auto md:w-[1170px] pt-[60px] pb-[80px]">
                    <h1 className={`text-[#2D2A33] text-2xl md:text-4xl text-center [&>strong]:font-bold ${font}`}
                        dangerouslySetInnerHTML={{__html: t('home.whyChoose')}}/>

                    <div className="flex flex-col px-4 md:flex-row md:px-0 items-center gap-[30px] ">
                        <div className="mx-auto">
                            <img className="w-fit h-fit" src={home2} alt="designed-for-illustration"/>
                        </div>

                        <div className="overflow-hidden">
                            <Slider
                                className="flex flex-col mx-auto w-[90vw] h-[40vh] sm:h-[25vh] md:w-[33vw] md:h-[45vh] lg:h-[50vh] my-auto pt-[12px] px-[15px]"
                                containerClass="flex flex-row gap-6 w-fit"
                                isNewDesignStyle={true}
                            >
                                {whyChoose.map((choose, index) =>
                                    <SliderItem key={`whyChoose-${index}`} {...choose} width={size}/>
                                )}
                            </Slider>
                        </div>
                    </div>
                </section>
                <section className="bg-[#E7E7E7] pt-[80px] h-[950px] md:h-[1188px] lg:px-[13px]">
                    <div className="container mx-auto lg:mx-0 flex flex-row gap-[30px]">
                        <div className="hidden lg:block max-w-[60vw] mt-auto">
                            <img className="object-contain w-fit h-fit" src={home3} alt="find-job-illustration"/>
                        </div>

                        <div className="flex flex-col items-center gap-[60px] mx-auto lg:mx-0">
                            <div className="flex flex-col mr-auto ml-4 md:ml-0 gap-[5px] text-[#2E467E]">
                                <h1 className="font-semibold text-4xl leading-[60px] md:text-[50px] md:leading-[80px]">{t('home.findJob')}</h1>
                                <h3 className="font-light text-4xl leading-[50px] md:text-[44px] md:leading-[70.4px]">{t('home.dontOutHome')}</h3>
                                <h3 className="font-light text-4xl leading-[50px] md:text-[44px] md:leading-[70.4px]">{t('home.with')}
                                    <span
                                        className="font-medium">Job for You</span></h3>
                            </div>

                            <h3 className={`text-[#2D2A33] font-light mx-4 md:ml-0 text-2xl md:text-[30px] md:w-[570px] md:leading-[48px] ${font}`}>
                                {t('home.explore')}
                            </h3>

                            <Link to={routes.signUp}
                                  className="mt-[20px] ml-auto mr-4 md:mr-0 flex flex-row gap-[20px] items-center border-[1px] border-[#0A48DB] py-2 px-7 rounded-full text-[#2E467E] hover:border-2 text-xl hover:font-semibold">
                                <span>{t('home.findJobButton')}</span>
                                <ArrowRightIcon className="w-5 fill-[#2E467E]"/>
                            </Link>
                        </div>
                    </div>

                </section>
                <section
                    className="flex flex-row -mt-32 sm:-mt-52 mb-44 justify-center gap-[35px] pt-16 px-2.5 pb-0 sm:pb-10">
                    <div className="flex flex-col bg-white w-[360px] h-[28rem] md:h-[33rem] lg:h-[30rem] rounded-t-[100px] rounded-b-[10px] md:rounded-tr-[0px] md:rounded-br-[0px] md:rounded-tl-[100px] md:rounded-bl-[10px]"
                         style={{boxShadow: "0px 1px 6px 0px #2D2A3340"}}>
                        <img className="mx-auto -mt-20 w-fit h-fit" src={home4} alt="sign-up"/>

                        <h1 className="mt-6 mx-[25px] text-[#4E79E0] text-[24px] leading-[38.4px] text-center font-bold">
                            {t('home.cards.card1.title')}
                        </h1>

                        <h3 className={`text-[#2D2A33] mx-2.5 lg:mx-[25px] mt-[25px] text-base lg:text-[16px] lg:leading-[25.6px] text-center [&>strong]:font-bold ${font}`}
                            dangerouslySetInnerHTML={{__html: t('home.cards.card1.description')}}/>

                        <Link to="/"
                              className="mt-auto flex flex-row items-center justify-center mt-auto mb-[25px] w-fit mx-auto gap-[10px] py-[5px] px-[15px] rounded-full bg-[#0A48DBB2] text-center text-[16px] leading-[24px] hover:bg-[#24459A] transition duration-500 ease-in-out font-semibold text-white">
                            <span>{t('home.cards.card1.button')}</span>
                            <ChevronLeftIcon className="fill-white w-[18px] h-[15.75px]"
                                             style={{transform: "rotate(-90deg)"}}/>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:flex-col bg-white w-[360px] h-[28rem] md:h-[33rem] lg:h-[30rem]"
                         style={{boxShadow: "0px 1px 6px 0px #2D2A3340"}}>
                        <img className="mx-auto -mt-20 w-fit h-fit" src={home5}
                             alt="complete-profile"/>

                        <h1 className="mt-6 mx-[25px] text-[#4E79E0] text-[24px] leading-[38.4px] text-center font-bold">
                            {t('home.cards.card2.title')}
                        </h1>

                        <h3 className={`text-[#2D2A33] mx-2.5 lg:mx-[25px] mt-[25px] lg:text-[16px] lg:leading-[25.6px] text-center [&>strong]:font-bold ${font}`}
                            dangerouslySetInnerHTML={{__html: t('home.cards.card2.description')}}/>

                        <Link to="/"
                              className="mt-auto flex flex-row items-center justify-center mt-auto mb-[25px] w-fit mx-auto gap-[10px] py-[5px] px-[15px] rounded-full bg-[#0A48DBB2] text-center text-[16px] leading-[24px] hover:bg-[#24459A] transition duration-500 ease-in-out font-semibold text-white">
                            <span>{t('home.cards.card2.button')}</span>
                            <ChevronLeftIcon className="fill-white w-[18px] h-[15.75px]"
                                             style={{transform: "rotate(-90deg)"}}/>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:flex-col bg-white w-[360px] h-[28rem] md:h-[33rem] lg:h-[30rem] rounded-tr-[100px] rounded-br-[10px]"
                         style={{boxShadow: "0px 1px 6px 0px #2D2A3340"}}>
                        <img className="mx-auto -mt-20 w-fit h-fit" src={home6}
                             alt="complete-profile"/>

                        <h1 className="mt-6 mx-[25px] text-[#4E79E0] text-[24px] leading-[38.4px] text-center font-bold">
                            {t('home.cards.card3.title')}
                        </h1>

                        <h3 className={`text-[#2D2A33] mx-2.5 lg:mx-[25px] mt-[25px] lg:text-[16px] lg:leading-[25.6px] text-center [&>strong]:font-bold ${font}`}
                            dangerouslySetInnerHTML={{__html: t('home.cards.card3.description')}}/>

                        <Link to="/"
                              className="mt-auto flex flex-row items-center justify-center mt-auto mb-[25px] w-fit mx-auto gap-[10px] py-[5px] px-[15px] rounded-full bg-[#0A48DBB2] text-center text-[16px] leading-[24px] hover:bg-[#24459A] transition duration-500 ease-in-out font-semibold text-white">
                            <span>{t('home.cards.card3.button')}</span>
                            <ChevronLeftIcon className="fill-white w-[18px] h-[15.75px]"
                                             style={{transform: "rotate(-90deg)"}}/>
                        </Link>
                    </div>
                </section>
            </main>
        </React.Fragment>
    );
};
export default Home;
