import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginAuth } from '../reducer/actions/graphActions';

export function useAuth() {
    const dispatch = useDispatch();
    const register = async (login, password) => {
        try {
            const response = await axios.post(
                'http//localhost:5173/register',
                {
                    username: login,
                    password: password
                }
            );
            console.log("registration successful", response.data)
        } catch (error) {
            console.error("registration failed");
            throw error;
        }
    };

    const login = async (login, password) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                new URLSearchParams({
                    username: login,
                    password: password
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    withCredentials: true
                }
            );
            console.log('loginn successful', response.data);
            dispatch(loginAuth());
        } catch (error) {
            console.error("login error", error);
            throw error;
        }

    };

    const logout = async () => {
        try {
            await axios.post('http//localhost:8080/logout', {
                withCredentials: true
            });

        } catch (error) {
            console.error("logout error")
        }
    };

    return {
        register,
        login, 
        logout
    };
}
