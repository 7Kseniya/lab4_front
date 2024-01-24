import { Alert, AlertTitle, Button } from '@mui/material';
import { useState } from "react";
import { useAuth } from '../utils/authentication';
import { PasswordInput, UsernameInput } from "./login-components";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth()

    const handleLoginChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9.@]+$/.test(value) || value === "") {
            setUsername(value);
        }
    };
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9.@]+$/.test(value) || value === "") {
            setPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!username || !password) {
            setMessage('fill in all the fields')
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
        }
        try {
            await auth.login(username, password);
        } catch (error) {
            setErrorMessage('login error')

            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
        }
    }
    const handleRegister = async () => {
        if(!username || !password) {
            setMessage('fill in all the fields')
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
        } else {
            try {
                await auth.register(username, password)
            } catch (error) {
                setErrorMessage("register error")
                setTimeout(() => {
                    setErrorMessage("")
                }, 3000)
            }
        }
        
    }


    return(
        <div >
            <form className="login-form" onSubmit={handleLogin}>

                <UsernameInput value={username} onChange={handleLoginChange}/>
                <PasswordInput value={password} onChange={handlePasswordChange}/>
                <Alert id="warning-message" severity='info' color='info'>
                    <AlertTitle>info</AlertTitle>
                        {message}
                </Alert>

                <Alert id='error-message' severity ="error" variant='outlilned' color='error'>
                    <AlertTitle>error</AlertTitle>
                        {errorMessage}
                </Alert>
                
                    <Button type='submit' variant="outlined" color='warning'>Login</Button>
                    <Button type='button' variant="outlined" color='warning' onClick={handleRegister}>Register</Button>
            </form>
        </div>
    )
}

export default Login;
