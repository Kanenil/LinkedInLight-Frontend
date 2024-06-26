import React, {useEffect, useState} from 'react'
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import PeopleMayKnow from "./sections/PeopleMayKnow";
import {useNavigate} from "react-router";
import AbstractDetails from "./AbstractDetails";
import {details} from "../../constants/details";

const DetailsPage = ({user, isOwner, detail}) => {
    const [selected, setSelected] = useState(null);
    const imageUrl = user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage;
    const navigator = useNavigate();

    const onClickBack = () => {
        navigator(`/j4y/${user.profileUrl}`, { state: detail });
    }

    useEffect(() => {
        if(!isOwner)
            navigator(-1);
    }, [isOwner])

    useEffect(() => {
        window.scrollTo (0,0);
    }, []);

    useEffect(() => {
        setSelected(details.find(page => page.route.includes(detail)))
    }, [detail])

    const commonProps = {
        user,
        isOwner,
        onClickBack,
    }

    return (
        <React.Fragment>
            <main className='bg-[#E7E7E7] flex-grow'>
                <div className="bg-white py-2" style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
                    <div className="mx-auto w-full md:w-[1170px]">
                        <div className="flex flex-row ml-8 md:ml-0 gap-[40px]">
                            <div className="border-[1px] overflow-hidden border-[#2D2A33] bg-[#E7E7E7] rounded-full w-[40px] h-[40px]">
                                <img className="object-contain" src={imageUrl} alt="image"/>
                            </div>

                            <div className="flex flex-col font-jost text-[#2D2A33]">
                                <h1 className="text-lg font-medium">{user?.firstName} {user?.lastName}</h1>

                                <ConditionalWrapper condition={user?.headline}>
                                    <h3 className="text-sm font-light mt-1">
                                        {user?.headline}
                                    </h3>
                                </ConditionalWrapper>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row mt-4 mb-20 md:my-8 mx-auto w-full md:w-[1170px]">
                    <div className="w-full md:w-8/12">
                        {
                            selected &&
                            React.cloneElement(<AbstractDetails/>, {
                                key: `details-${selected.route[0]}`,
                                ...selected.props,
                                ...commonProps
                            })
                        }
                    </div>

                    <div className="hidden md:block w-4/12 ml-10">
                        <PeopleMayKnow margin=""/>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
export default DetailsPage;