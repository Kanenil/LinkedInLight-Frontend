import React, {useEffect} from 'react'
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import PeopleMayKnow from "./sections/PeopleMayKnow";
import {peopleMayKnow} from "../../pages/profile/mock";
import {useNavigate} from "react-router";
import AbstractDetails from "./AbstractDetails";
import {details} from "../../constants/details";

const DetailsPage = ({user, detail}) => {
    const selected = details.find(page => page.route.includes(detail));
    const imageUrl = user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage;
    const navigator = useNavigate();

    const onClickBack = () => {
        navigator('/in', { state: detail });
    }

    useEffect(() => {
        window.scrollTo (0,0);
    }, []);

    const commonProps = {
        user,
        onClickBack,
    }

    return (
        <React.Fragment>
            <main className='bg-[#E7E7E7] flex-grow'>
                <div className="bg-white py-2" style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
                    <div className="mx-auto w-[1170px]">
                        <div className="flex flex-row gap-[40px]">
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

                <div className="flex flex-row my-8 mx-auto w-[1170px]">
                    <div className="w-8/12">
                        {
                            React.cloneElement(<AbstractDetails/>, {
                                key: `details-${selected.route[0]}`,
                                ...{...selected.props, ...commonProps}
                            })
                        }
                    </div>

                    <div className="w-4/12 ml-10">
                        <PeopleMayKnow margin="" peopleMayKnow={peopleMayKnow}/>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
export default DetailsPage;