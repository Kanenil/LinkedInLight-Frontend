import React, {useEffect, useState} from "react";
import {profileService} from "../../services/profileService";
import {useDispatch, useSelector} from "react-redux";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {useLocation, useParams} from "react-router";
import {Helmet} from "react-helmet-async";
import StandardProfilePage from "../../components/profile/StandardProfilePage";
import EditModalPage from "../../components/profile/EditModalPage";
import ImageCropProvider from "../../providers/ImageCropProvider";
import DetailsPage from "../../components/profile/DetailsPage";

const Profile = () => {
    const [user, setUser] = useState();
    const [pageStates, setPageStates] = useState({
        edit: "",
        details: ""
    })
    const currentUser = useSelector(state => state.CurrentUser);
    const dispatch = useDispatch();
    const {blockId, id} = useParams();
    const location = useLocation();

    const getAndSaveUserState = () => {
        profileService.profile().then(({data}) => {
            dispatch({
                type: 'SET_USER',
                current_user: data
            });
            setUser(data);
        }).catch()
    }

    useEffect(() => {
        if (!currentUser || !currentUser.email) {
            getAndSaveUserState();
        } else {
            setUser(currentUser);
        }
    }, [currentUser])

    const getBlockId = () => {
        if(location.pathname.includes("edit") && location.pathname.includes("details")) {
            const startIndex = location.pathname.indexOf("details") + "details/".length;
            return location.pathname.substring(startIndex, location.pathname.indexOf('/', startIndex));
        }
        return blockId;
    }

    useEffect(() => {
        setPageStates({
            details: location.pathname.includes("details") ? getBlockId() : "",
            edit: location.pathname.includes("edit") ? blockId : ""
        })
    }, [blockId]);

    return (
        <React.Fragment>
            <Helmet>
                <title>Profile</title>
            </Helmet>

            <ConditionalWrapper condition={pageStates.edit}>
                <ImageCropProvider>
                    <EditModalPage editModal={pageStates.edit} user={user} id={id} onSaveCallback={getAndSaveUserState}/>
                </ImageCropProvider>
            </ConditionalWrapper>

            <ConditionalWrapper condition={pageStates.details}>
                <DetailsPage detail={pageStates.details} user={user} />
            </ConditionalWrapper>

            <ConditionalWrapper condition={!pageStates.details}>
                <StandardProfilePage user={user} />
            </ConditionalWrapper>
        </React.Fragment>
    )
}
export default Profile;