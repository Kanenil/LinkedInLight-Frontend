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
        localStorage.setItem(general.currentUser, JSON.stringify(data.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setCurrentUser(data.user);
    }

    const register = async ({ setErrors, ...props }) => {
        setErrors({});

        axios
            .post('/api/auth/register', props)
            .then(() => {
                navigator(routes.signIn + "?registration=success");
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
                saveData(response.data);

                navigator('/');
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

                navigator('/');
            })
            .catch((error) => {
                console.log("Unhandled error: ", error)
            });
    };

    const setCurrentUser = (user) => {
        dispatch({
            type: 'SET_USER',
            current_user: user
        });
    };

    return {
        register,
        login,
        googleLogin
    };
}