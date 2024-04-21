import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import SignUp from "../../pages/auth/SignUp";
import SignIn from "../../pages/auth/SignIn";
import Profile from "../../pages/profile";
import Home from "../../pages/home";
import Layout from "../shared/layouts/Layout";
import Chats from "../../pages/chat/Chats";
import AuthLayout from "../shared/layouts/AuthLayout";
import ConfirmEmail from "../../pages/auth/ConfirmEmail";
import InLayout from "../shared/layouts/InLayout";
import {HelmetProvider} from "react-helmet-async";
import Settings from "../../pages/profile/settings";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ChatsLayout from "../shared/layouts/ChatsLayout";
import React from "react";
import ImageCropProvider from "../../providers/ImageCropProvider";
import MyNetwork from "../../pages/network";
import Connections from "../../pages/network/connections";
import ChatProvider from "../../providers/ChatProvider";
import CreateCompany from "../../pages/company/createCompany";
import AlertProvider from "../../providers/AlertProvider";
import Alert from "../shared/Alert";
import Auth from "../../pages/auth";
import CompanyPage from "../../pages/company";
import CompanySettingsIndex from "../company/settings/CompanySettingsIndex";
import AuthRedirect from "../shared/AuthRedirect";
import CompanyEditIndex from "../company/edit/CompanyEditIndex";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => {
    return (
        <div className="App">
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <AlertProvider>
                        <ImageCropProvider>
                            <ChatProvider>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path="/" element={<Layout/>}>
                                                <Route index element={<Home/>}/>
                                            </Route>

                                            <Route path="giveRecommendation/:userId" element={<AuthRedirect  to="/j4y/:user/details/recommendations"/>}/>

                                            <Route path="/j4y">
                                                <Route index element={<InLayout/>}/>

                                                <Route element={<InLayout/>}>
                                                    <Route path=":profileURL" element={<Profile/>}>
                                                        <Route path="edit/:blockId" element={<Profile/>}>
                                                            <Route path=":id" element={<Profile/>}/>
                                                        </Route>
                                                        <Route path="details/:blockId" element={<Profile/>}>
                                                            <Route path="edit/:blockId" element={<Profile/>}>
                                                                <Route path=":id" element={<Profile/>}/>
                                                            </Route>
                                                        </Route>
                                                    </Route>

                                                    <Route path="my-network" element={<MyNetwork/>}/>
                                                    <Route path="my-network/connections" element={<Connections/>}/>
                                                </Route>

                                                <Route path="chats" element={<ChatsLayout/>}>
                                                    <Route index element={<Chats/>}/>
                                                </Route>

                                                <Route path="company" element={<ChatsLayout/>}>
                                                    <Route path=":companyId">
                                                        <Route index element={<CompanyPage/>}/>
                                                        <Route path="settings" element={<CompanySettingsIndex/>}/>
                                                        <Route path="edit" element={<CompanyEditIndex/>}/>
                                                    </Route>
                                                    <Route path="new" element={<CreateCompany/>}/>
                                                </Route>

                                                <Route path="settings" element={<ChatsLayout/>}>
                                                    <Route
                                                        path=":section?/:block?"
                                                        element={<Settings/>}
                                                    />
                                                </Route>
                                            </Route>

                                            <Route path="/auth" element={<AuthLayout/>}>
                                                <Route index element={<Auth/>}/>
                                                <Route path="sign-up" element={<SignUp/>}/>
                                                <Route path="sign-in" element={<SignIn/>}/>
                                                <Route path="confirm-email" element={<ConfirmEmail/>}/>
                                            </Route>
                                        </Routes>
                                    </BrowserRouter>
                                <Alert/>
                                {/*<ReactQueryDevtools buttonPosition="bottom-right"/>*/}
                            </ChatProvider>
                        </ImageCropProvider>
                    </AlertProvider>
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
};

export default App;
