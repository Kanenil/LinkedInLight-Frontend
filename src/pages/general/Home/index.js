import bg from "../../../assets/home-background.png"
import jfy from "../../../assets/job-for-you.png"
import ArrowRightIcon from "../../../elements/ArrowRightIcon/ArrowRightIcon";
import CertificateIcon from "../../../elements/CertificateIcon/CertificateIcon";

const Home = () => {

    return (
        <main className="h-full">
            <section className="mx-auto w-[1170px] mt-36 mb-40">
                <img src={jfy} alt="Job for you"/>

                <h1 className="mt-[60px] text-center text-base text-white">
                    where we <strong>boost</strong> your potential, <strong>reframe</strong> your career,
                    and <strong>unite</strong> professionals for unparalleled <br/> opportunities in the job market
                </h1>

                <button className="mt-12 flex gap-4 text-3xl font-semibold text-white ml-auto px-[71px] py-[10px] bg-[#0A48DBB2] rounded-full">
                    Get started
                    <ArrowRightIcon className="w-[16px] h-[16px] fill-white my-auto"/>
                </button>
            </section>
            <section className="bg-white py-24">
                <div className="flex flex-row mx-auto w-[1170px]">
                    <div className="flex flex-row">
                        <CertificateIcon className="fill-[#0A48DB] w-[60px] h-[70px] my-auto" />
                        <div className="flex flex-col gap-4 ml-8 max-w-[170px]">
                            <h1 className="font-bold text-3xl text-[#585359]">95 000</h1>

                            <h3 className="font-medium text-lg text-[#585359] text-wrap">registered companies</h3>
                        </div>
                    </div>
                </div>
            </section>
            <div className="absolute top-0 left-0 z-[-1] h-full w-full" style={{background: `url(${bg})`}}/>
            <div className="absolute top-0 left-0 z-[-1] h-full w-full"
                 style={{background: `linear-gradient(90deg, rgba(88, 83, 89, 0.6) 0%, rgba(45, 42, 51, 0.8) 100%)`}}/>
        </main>

    )
}
export default Home;