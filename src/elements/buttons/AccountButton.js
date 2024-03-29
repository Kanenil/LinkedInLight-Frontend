import ArrowDownIcon from "../icons/ArrowDownIcon";
import defaultImage from '../../assets/default-image.jpg'
import React, {useEffect, useState} from "react";
import {profileService} from "../../services/profileService";
import {Link} from "react-router-dom";
import useComponentVisible from "../../hooks/componentVisible";
import {useAuth} from "../../hooks/auth";
import ConditionalWrapper from "../shared/ConditionalWrapper";
import {APP_ENV} from "../../env";
import {useSelector} from "react-redux";

const AccountButton = () => {
    const [user, setUser] = useState();
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const {logout} = useAuth();

    const currentUser = useSelector(state => state.CurrentUser);

    useEffect(() => {
        profileService.profile().then(({data}) => {
            setUser(data)
        })
    }, [currentUser]);

    const defaultRoutes = [
        {
            to: '/in',
            title: 'Settings & Privacy'
        },
        {
            to: '/in',
            title: 'Language'
        },
        {
            to: '/in',
            title: 'Help'
        }
    ]

    const imageUrl = user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage;

    const LinkedText = ({ to, title, onClickHandler }) => {
        return (
            <React.Fragment>
                <ConditionalWrapper condition={to}>
                    <Link className="hover:underline active:font-normal active:no-underline" to={to}>
                        {title}
                    </Link>
                </ConditionalWrapper>
                <ConditionalWrapper condition={onClickHandler}>
                    <button onClick={onClickHandler} className="hover:underline active:font-normal active:no-underline" to={to}>
                        {title}
                    </button>
                </ConditionalWrapper>
            </React.Fragment>
        )
    }

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setIsComponentVisible((val) => !val)}
                    className="flex flex-row items-end border-l-2 border-[#24459A73] pl-10">
                <div className="w-8 h-8 overflow-hidden rounded-full my-auto border-2 border-[#2D2A33]">
                    <img alt="image" className="object-contain"
                         src={imageUrl}/>
                </div>

                <ArrowDownIcon className="ml-1 w-3.5 fill-[#24459A]"/>
            </button>
            <ConditionalWrapper condition={isComponentVisible}>
                <div className="absolute flex flex-col bg-white -left-32 rounded-l-lg rounded-b-lg  top-14 p-5 z-20"
                     style={{boxShadow: "0px 1px 6px 0px #00000040"}}>
                    <div className="flex flex-row gap-2.5">
                        <div className="rounded-full min-w-10 overflow-hidden border-[1px] border-[#2D2A33] w-10 h-10">
                            <img alt="image" className="object-contain"
                                 src={imageUrl}/>
                        </div>

                        <div className="font-jost">
                            <h1 className="font-medium">{user?.firstName} {user?.lastName}</h1>

                            <ConditionalWrapper condition={user?.headline}>
                                <h3 className="font-light text-sm">{user?.headline}</h3>
                            </ConditionalWrapper>
                        </div>
                    </div>
                    <Link
                        className="border-[#24459A] w-[172px] mt-2.5 mb-1 text-center border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm"
                        to={'/in/profile'}>
                        View Profile
                    </Link>

                    <div
                        className="flex flex-col gap-1 mt-1 mb-1 pb-1 pt-2.5 border-t-[0.5px] border-[#24459A80] font-jost font-light text-[#2D2A33]">
                        {defaultRoutes.map((route, index) =>
                            <LinkedText key={`accountDefaultRoute-${index}`} {...route}/>
                        )}
                    </div>

                    <div
                        className="mt-1 pt-2.5 mb-1 pb-1 border-t-[0.5px] border-[#24459A80] font-jost font-light text-[#2D2A33]">
                        <LinkedText to="/in" title="Posts & Activity"/>
                    </div>

                    <div
                        className="mt-1 pt-2.5 mb-1 pb-1 border-t-[0.5px] border-[#24459A80] font-jost font-light text-[#2D2A33]">
                        <LinkedText onClickHandler={() => logout()} title="Exit" />
                    </div>
                </div>
            </ConditionalWrapper>
        </div>
    )
}
export default AccountButton;