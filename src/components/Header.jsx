import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, color: 'white' }}>
                    labwork №4 
                </Typography>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, color: 'white' }}>
                    Ignatyeva Kseniya P3225
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )


}
export default Header