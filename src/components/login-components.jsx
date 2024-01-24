import { TextField } from '@mui/material';

const UsernameInput = () => {
    return (
            <TextField 
            required 
            error
            id="username-input" 
            label="Username" 
            variant="outlined"
            defaultValue="username" 
            helperText="incorrect username"
            color="secondary">
            </TextField>              
    )
}

const PasswordInput = () => {
    

    return(
        <TextField 
            required 
            error
            id="password-input" 
            label="Password" 
            variant="outlined"
            defaultValue="password" 
            helperText="incorrect password"
            color="secondary">
            </TextField> 
        
    )
}

export { PasswordInput, UsernameInput };
