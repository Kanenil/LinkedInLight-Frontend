import {useAuthorize} from "../../../hooks/authorize";
import {useSelector} from "react-redux";
import {general} from "../../../constants/general";
import {useNavigate} from "react-router";
import XMarkIcon from "../../../elements/XMarkIcon/XMarkIcon";
import {APP_ENV} from "../../../env";
import defaultBackground from "../../../assets/default-background.jpg"
import defaultImage from "../../../assets/default-image.jpg"

const Profile = () => {
    useAuthorize();

    const navigator = useNavigate();
    const user = useSelector(state => state.CurrentUser);

    const logout = () => {
        localStorage.removeItem(general.token)
        localStorage.removeItem(general.currentUser)
        navigator('/login')
    }

    const imageUrl = user.image === null? defaultImage : APP_ENV.REMOTE_HOST_NAME + '/images/' + user.image;
    const backgroundUrl = user.background === null? defaultBackground : APP_ENV.REMOTE_HOST_NAME + '/images/' + user.background;

    return (
        <section className='flex-grow relative z-10 pt-[100px]'>
            <div className="container">
                <div className="relative">
                    <img className='h-32 w-full object-cover lg:h-48' alt="background"
                         src={backgroundUrl}/>
                    <div className='absolute bottom-3 right-5 z-10'>
                        <label
                            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-white border-opacity-35 bg-white bg-opacity-30 text-white hover:bg-opacity-20'>
                            <input type="file" accept="image/png, image/jpg, image/jpeg" name="cover" id="cover"
                                   className="hidden"/>
                            <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" className="fill-white">
                                      <path fillRule="evenodd" clipRule="evenodd"
                                            d="M5.4453 1.63085C5.56894 1.44539 5.7771 1.33398 6 1.33398H10C10.2229 1.33398 10.4311 1.44539 10.5547 1.63085L11.6901 3.33398H14C14.5304 3.33398 15.0391 3.5447 15.4142 3.91977C15.7893 4.29484 16 4.80355 16 5.33398V12.6673C16 13.1978 15.7893 13.7065 15.4142 14.0815C15.0391 14.4566 14.5304 14.6673 14 14.6673H2C1.46957 14.6673 0.960859 14.4566 0.585786 14.0815C0.210714 13.7065 0 13.1978 0 12.6673V5.33398C0 4.80355 0.210714 4.29484 0.585786 3.91977C0.960859 3.5447 1.46957 3.33398 2 3.33398H4.30988L5.4453 1.63085ZM6.35679 2.66732L5.22137 4.37045C5.09772 4.55592 4.88957 4.66732 4.66667 4.66732H2C1.82319 4.66732 1.65362 4.73756 1.5286 4.86258C1.40357 4.9876 1.33333 5.15717 1.33333 5.33398V12.6673C1.33333 12.8441 1.40357 13.0137 1.5286 13.1387C1.65362 13.2637 1.82319 13.334 2 13.334H14C14.1768 13.334 14.3464 13.2637 14.4714 13.1387C14.5964 13.0137 14.6667 12.8441 14.6667 12.6673V5.33398C14.6667 5.15717 14.5964 4.9876 14.4714 4.86258C14.3464 4.73756 14.1768 4.66732 14 4.66732H11.3333C11.1104 4.66732 10.9023 4.55592 10.7786 4.37045L9.64321 2.66732H6.35679Z"></path>
                                      <path fillRule="evenodd" clipRule="evenodd"
                                            d="M7.99984 6.66732C6.89527 6.66732 5.99984 7.56275 5.99984 8.66732C5.99984 9.77189 6.89527 10.6673 7.99984 10.6673C9.10441 10.6673 9.99984 9.77189 9.99984 8.66732C9.99984 7.56275 9.10441 6.66732 7.99984 6.66732ZM4.6665 8.66732C4.6665 6.82637 6.15889 5.33398 7.99984 5.33398C9.84079 5.33398 11.3332 6.82637 11.3332 8.66732C11.3332 10.5083 9.84079 12.0007 7.99984 12.0007C6.15889 12.0007 4.6665 10.5083 4.6665 8.66732Z"></path>
                                    </svg>
                                  </span>
                        </label>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex relative">
                            <img className="h-32 w-32 rounded-full ring-4 ring-white"
                                 src={imageUrl}
                                 alt=""/>
                            <label htmlFor="profile"
                                   className="absolute bottom-0.5 right-0.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-3xl bg-[#3056d3] text-white hover:bg-opacity-95">
                                <svg width="14" height="14" viewBox="0 0 14 14" className="fill-white">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M4.76464 1.42577C4.87283 1.26349 5.05496 1.16602 5.25 1.16602H8.75C8.94504 1.16602 9.12717 1.26349 9.23536 1.42577L10.2289 2.91602H12.25C12.7141 2.91602 13.1592 3.10039 13.4874 3.42858C13.8156 3.75677 14 4.20189 14 4.66602V11.0827C14 11.5468 13.8156 11.9919 13.4874 12.3201C13.1592 12.6483 12.7141 12.8327 12.25 12.8327H1.75C1.28587 12.8327 0.840752 12.6483 0.512563 12.3201C0.184375 11.9919 0 11.5468 0 11.0827V4.66602C0 4.20189 0.184374 3.75677 0.512563 3.42858C0.840752 3.10039 1.28587 2.91602 1.75 2.91602H3.77114L4.76464 1.42577ZM5.56219 2.33268L4.5687 3.82292C4.46051 3.98521 4.27837 4.08268 4.08333 4.08268H1.75C1.59529 4.08268 1.44692 4.14414 1.33752 4.25354C1.22812 4.36293 1.16667 4.51131 1.16667 4.66602V11.0827C1.16667 11.2374 1.22812 11.3858 1.33752 11.4952C1.44692 11.6046 1.59529 11.666 1.75 11.666H12.25C12.4047 11.666 12.5531 11.6046 12.6625 11.4952C12.7719 11.3858 12.8333 11.2374 12.8333 11.0827V4.66602C12.8333 4.51131 12.7719 4.36293 12.6625 4.25354C12.5531 4.14414 12.4047 4.08268 12.25 4.08268H9.91667C9.72163 4.08268 9.53949 3.98521 9.4313 3.82292L8.43781 2.33268H5.56219Z"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M7.00016 5.83268C6.03366 5.83268 5.25016 6.61618 5.25016 7.58268C5.25016 8.54918 6.03366 9.33268 7.00016 9.33268C7.96666 9.33268 8.75016 8.54918 8.75016 7.58268C8.75016 6.61618 7.96666 5.83268 7.00016 5.83268ZM4.0835 7.58268C4.0835 5.97185 5.38933 4.66602 7.00016 4.66602C8.61099 4.66602 9.91683 5.97185 9.91683 7.58268C9.91683 9.19351 8.61099 10.4993 7.00016 10.4993C5.38933 10.4993 4.0835 9.19351 4.0835 7.58268Z"></path>
                                </svg>
                                <input type="file" accept="image/png, image/jpg, image/jpeg" name="profile" id="profile"
                                       className="hidden"/>
                            </label>
                        </div>

                        <div
                            className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                                <h1 className="text-2xl font-bold text-black truncate">{user.firstName} {user.lastName}</h1>
                            </div>

                            <div
                                className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <button onClick={logout}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    <XMarkIcon className="-ml-1 mr-3 h-5 w-5"/>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Profile;