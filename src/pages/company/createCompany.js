import React from "react";
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router";
import {Helmet} from "react-helmet-async";

const CreateCompany = () => {
    const navigator = useNavigate();

    return (
        <React.Fragment>
            <Helmet>
                <title>New company</title>
            </Helmet>
            <main className='flex-grow bg-[#E7E7E7]'>
                <section className="bg-white">
                    <div className="flex flex-col gap-1 py-2.5 mx-auto w-[1170px]">
                        <button onClick={() => navigator(-1)} className="flex flex-row gap-5 w-fit hover:underline">
                            <ArrowLeftIcon className="text-[#24459A] w-5 h-5"/>

                            <span className="font-jost font-medium text-xl">Back</span>
                        </button>

                        <h3 className="font-jost text-[#2D2A33] text-lg">Let’s get started with a few details about your company</h3>
                    </div>
                </section>

            </main>
        </React.Fragment>
    )
}
export default CreateCompany;