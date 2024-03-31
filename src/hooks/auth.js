import axios from "../services/axios";
import {useNavigate} from "react-router";
import {routes} from "../constants/routes";
import {general} from "../constants/general";
import {useDispatch} from "react-redux";

export const useAuth = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const saveData = (data) => {
        localStorage.setItem(general.token, data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }

    const validateEmail = async ({setErrors, email, ...props}) => {
        setErrors({});

        axios
            .post('/api/auth/validate-email', {email}, {
                params: {
                    email
                }
            })
            .then(async () => {
                const model = {
                    email,
                    password: props.password,
                    firstName: props.firstName,
                    lastName: props.lastName,
                    country: props.country,
                    city: props.city
                }

                await register(model);
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
            .then(() => {
                navigator(`${routes.confirmEmail}?email=${email}`);
            })
            .catch(()=> navigator(routes.signUp))
    }

    const register = async (props) => {
        axios
            .post('/api/auth/register', props)
            .then(async () => {
                await sendConfirmationEmail({...props});
            }).catch(err => console.log('register error', err))
    };

    const confirmEmail = async (email, code, emailToken = "-") => {
        axios
            .post('/api/auth/confirm-email', null, {
                params: {
                    email,
                    code,
                    emailToken
                }
            })
            .then(async () => {
                navigator(routes.signIn);
            }).catch(err => console.log('confirmEmail error', err))
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

                if(error.response.data.includes('Your email is not confirmed'))
                    return navigator(`${routes.confirmEmail}?email=${props.email}`);

                setErrors({password:error.response.data})
            });
    };

    const googleLogin = async (props) => {
        axios
            .post('/api/auth/google/login', props)
            .then(response => {
                saveData(response.data);

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
        logout,
        confirmEmail
    };
}