import axios from "../services/axios";
import {useNavigate} from "react-router";
import {routes} from "../constants/routes";
import {general} from "../constants/general";
import {useDispatch} from "react-redux";
import hash from "../utils/hash";

export const useAuth = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const saveData = (data) => {
        localStorage.setItem(general.token, data.token);
        //localStorage.setItem(general.currentUser, JSON.stringify(data.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        //setCurrentUser(data.user.email);
    }

    const validateEmail = async ({setErrors, email, ...props}) => {
        setErrors({});

        axios
            .post('/api/auth/validate-email', null, {
                params: {
                    email
                }
            })
            .then(async () => {
                localStorage.setItem(general.user, JSON.stringify({email, ...props}))

                await sendConfirmationEmail({email, props})
            })
            .catch(error=>{
                setErrors({email:error.response.data})
            })
    }

    const sendConfirmationEmail = async ({email, ...props}) => {
        axios
            .post('/api/auth/send-code', {email}, {
                params: {
                    email
                }
            })
            .then(({data}) => {
                hash(data).then((data) => {
                    localStorage.setItem(general.code, data);
                    navigator(routes.confirmEmail);
                })
            })
            .catch(()=> navigator(routes.signUp))
    }

    const register = async (props) => {
        //setErrors({});

        axios
            .post('/api/auth/register', props)
            .then(() => {
                login({email: props.email, password: props.password}).then()
            })
    };

    const login = async ({ setErrors, ...props }) => {
        if(setErrors !== undefined)
            setErrors({});

        axios
            .post('/api/auth/login', props)
            .then(response => {
                saveData(response.data);

                navigator('/in');
            })
            .catch((error) => {
                if(error.code === "ERR_NETWORK")
                    return setErrors({password:"Oops... Something went wrong! Try later."})

                if(error.response.data.includes('Login failed'))
                    return setErrors({password:"Email or password are incorrect!"})

                setErrors({password:error.response.data})
            });
    };

    const googleLogin = async (props) => {
        //console.log(props)
        axios
            .post('/api/auth/google/login', props)
            .then(response => {
                saveData(response.data);

                //console.log(response.data)

                // if(response.data.image === undefined) {
                //     axios
                //         .post(`/api/Account/editImage`, {...response.data.user, image: props.image})
                //         .then(resp => {
                //             console.log(resp)
                //             //setCurrentUser(resp);
                //         })
                //         .catch(err => console.log(err))
                // }

                navigator('/in');
            })
            .catch((error) => {
                console.log("Unhandled error: ", error)
            });
    };

    const logout = () => {
        localStorage.removeItem(general.token);
        axios.defaults.headers.common["Authorization"] = null;
        setCurrentUser(null);
        navigator(routes.signIn);
    }

    const setCurrentUser = (user) => {
        dispatch({
            type: 'SET_USER',
            current_user: user
        });
    };

    return {
        register,
        login,
        googleLogin,
        validateEmail,
        sendConfirmationEmail,
        logout
    };
}