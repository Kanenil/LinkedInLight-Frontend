import axios from "../services/axios";
import {useNavigate} from "react-router";
import {routes} from "../constants/routes";
import {general} from "../constants/general";

export const useAuth = () => {
    const navigator = useNavigate();

    const register = async ({ setErrors, ...props }) => {
        setErrors({});

        axios
            .post('/api/auth/register', props)
            .then(() => {
                navigator(routes.logIn + "?registration=success");
            })
            .catch((error) => {
                setErrors({email:error.response.data})
            });
    };

    const login = async ({ setErrors, ...props }) => {
        setErrors({});

        axios
            .post('/api/auth/login', props)
            .then(response => {
                const {token} = response.data;

                console.log(response, token)

                localStorage.setItem(general.token, token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            })
            .catch((error) => {
                if(error.code === "ERR_NETWORK")
                    return setErrors({password:"Oops... Something went wrong! Try later."})

                if(error.response.data.includes('Login failed'))
                    return setErrors({password:"Email or password are incorrect!"})

                setErrors({password:error.response.data})
            });
    };

    const googleLogin = async ({ setError, ...props }) => {
        setError({});

        axios
            .post('/api/auth/google/login', props)
            .then(response => {
                const {token} = response;

                //localStorage.setItem(general.token, token);
                //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                console.log(response, token)
            })
            .catch((error) => {
                setError(error.response.data)
            });
    };


    return {
        register,
        login,
        googleLogin
    };
}