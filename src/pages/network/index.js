import React from "react";
import ManageNetwork from "../../components/network/ManageNetwork";
import {Helmet} from "react-helmet-async";

const MyNetwork = () => {

    return (
        <React.Fragment>
            <Helmet>
                <title>My Network</title>
            </Helmet>
            <main className='bg-[#E7E7E7]'>
                <div className="flex flex-row my-8 mx-auto w-[1170px]">
                    <div className="w-3/12">
                        <div className="rounded-t-lg overflow-hidden">
                            <div className="flex flex-col gap-2.5">
                                <ManageNetwork/>
                            </div>
                        </div>
                    </div>
                    <div className="w-9/12 ml-10">
                        <div className="h-[500px] bg-white rounded-lg"></div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
export default MyNetwork;