import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <IconButton
                    size="large"
                    // edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{mr: 2}}
                >
                    <MenuIcon fontSize="inherit"/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    SHOPERS_VI
                </Typography>
                <IconButton
                    size="large"
                    // edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{mr: 2}}
                >
                    <FavoriteBorderIcon fontSize="inherit"/>
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{mr: 2}}
                >
                    <LocalMallOutlinedIcon fontSize="inherit" />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export {Header};