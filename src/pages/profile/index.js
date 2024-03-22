import React, {useEffect, useState} from "react";
import {profileService} from "../../services/profileService";
import {useDispatch, useSelector} from "react-redux";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {useLocation, useParams} from "react-router";
import {Helmet} from "react-helmet-async";
import StandardProfilePage from "../../components/profile/StandardProfilePage";
import EditModalPage from "../../components/profile/EditModalPage";
import ImageCropProvider from "../../providers/ImageCropProvider";

const Profile = () => {
    const [user, setUser] = useState();
    const [editModal, setEditModal] = useState("");
    const currentUser = useSelector(state => state.CurrentUser);
    const dispatch = useDispatch();
    const {blockId} = useParams();
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

    useEffect(() => {
        setEditModal(location.pathname.includes("edit") ? blockId : "");
    }, [blockId, location]);

    return (
        <React.Fragment>
            <Helmet>
                <title>Profile</title>
            </Helmet>

            <ConditionalWrapper condition={editModal}>
                <ImageCropProvider>
                    <EditModalPage editModal={editModal} user={user} onSaveCallback={getAndSaveUserState}/>
                </ImageCropProvider>
            </ConditionalWrapper>

            <StandardProfilePage user={user} />
        </React.Fragment>
    )
}
export default Profile;