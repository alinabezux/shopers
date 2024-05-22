import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    AppBar,
    Box,
    Stack,
    IconButton,
    Toolbar,
    Typography,
    Badge,
} from "@mui/material";
import {Menu, MenuItem} from "@mui/joy";

import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryActions, typeActions} from "../redux";
import {DrawerMenu} from "./DrawerMenu";
import {DrawerBasket} from "./DrawerBasket";


const Header = () => {
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [openBasket, setOpenBasket] = useState(false);

    const dispatch = useDispatch();
    const {categories, selectedCategory} = useSelector(state => state.categoryReducer);
    const {typesByCategory} = useSelector(state => state.typeReducer);

    const toggleMenu = (newOpenDrawerMenu) => () => {
        setOpenDrawerMenu(newOpenDrawerMenu);
    };

    const handleHoverMenu = useCallback((event, category) => {
        setAnchorMenu(event.currentTarget);
        dispatch(categoryActions.setSelectedCategory(category._id));
    }, [dispatch]);

    const handleCloseMenu = useCallback(() => {
        setAnchorMenu(null);
        dispatch(categoryActions.setSelectedCategory(null))
    }, [dispatch]);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    useEffect(() => {
        if (selectedCategory) {
            dispatch(typeActions.getTypesByCategoryId({categoryId: selectedCategory}))
        }
    }, [dispatch, selectedCategory])


    const toggleBasket = (newOpenBasket) => () => {
        setOpenBasket(newOpenBasket);
    };


    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpenDrawerMenu(true)}
                    sx={{mr: 2, display: {md: 'none'}}}
                >
                    <MenuIcon sx={{fontSize: 35}}/>
                </IconButton>

                <DrawerMenu open={openDrawerMenu}
                            onClose={() => setOpenDrawerMenu(false)}/>

                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {categories.map((category) => (
                        <Box key={category._id}>
                            <Typography
                                id="basic-button"
                                sx={{
                                    mr: 2,
                                    color: 'black',
                                    display: 'block',
                                    textTransform: 'uppercase',
                                    fontFamily: "Geologica",
                                    fontSize: 20,
                                    fontWeight: 500,

                                }}
                                aria-controls={anchorMenu ? `basic-menu-${category._id}` : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(event) => handleHoverMenu(event, category)}
                            >
                                {category.name}
                            </Typography>

                            <Menu
                                id={`basic-menu-${category._id}`}
                                variant="solid"
                                anchorEl={anchorMenu}
                                open={Boolean(anchorMenu)}
                                onMouseLeave={handleCloseMenu}
                                MenuListProps={{
                                    'aria-labelledby': `basic-button-${category._id}`,
                                }}
                                sx={{
                                    width: "150px",
                                    fontFamily: "Geologica, sans-serif",
                                    fontSize: "20px",
                                    fontWeight: 200,
                                    opacity: 0.9,

                                }}
                            >
                                {typesByCategory.map(type =>
                                    (<MenuItem key={type._id} onClick={handleCloseMenu}
                                               sx={{

                                                   display: "flex",
                                                   flexDirection: "column",
                                                   alignItems: "center"
                                               }}
                                    >{type.name}</MenuItem>)
                                )}
                            </Menu>
                        </Box>
                    ))}

                </Box>


                <Typography variant="h4"
                            sx={{flexGrow: 1, fontWeight: "800", fontFamily: "Geologica, sans-serif"}}>
                    SHOPERS_VI
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open favorite"
                        sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
                    >
                        <SearchOutlinedIcon sx={{fontSize: 35}}/>
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open favorite"
                        sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
                    >
                        <FavoriteBorderIcon sx={{fontSize: 35}}/>
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open account"
                        sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
                    >
                        <PermIdentityIcon sx={{fontSize: 35}}/>
                    </IconButton>

                    <Badge variant="dot" color="warning" sx={{
                        '& .MuiBadge-dot': {
                            transform: 'translateY(6px)',
                        }
                    }}>
                        <LocalMallOutlinedIcon sx={{fontSize: 35}}
                                               aria-label="open basket"
                                               onClick={()=> setOpenBasket(true)}
                        />
                    </Badge>
                    <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)}/>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};


export {
    Header
};