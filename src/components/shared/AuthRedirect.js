import {useQuery} from "@tanstack/react-query";
import ProfileService from "../../services/profileService";
import Loader from "./Loader";
import {useNavigate} from "react-router";

const AuthRedirect = ({to}) => {
    const {data:profile, isLoading} = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    })
    const navigator = useNavigate();

    if(isLoading)
        return <Loader/>;

    navigator(`${to.replace(':user', profile.profileUrl)}`, {replace:true})
}
export default AuthRedirect;