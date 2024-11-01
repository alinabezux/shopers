import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { authActions, categoryActions, typeActions, userActions } from "../redux";
import { DrawerMenu } from "./DrawerMenu";
import { DrawerBasket } from "./DrawerBasket";
import { toUrlFriendly } from '../utils'

import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {
    AppBar,
    Box,
    Stack,
    Toolbar,
    Typography,
    Badge,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/joy";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Edit from '@mui/icons-material/Edit';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { Chip } from '@mui/joy';
import Snackbar from '@mui/joy/Snackbar';


const Header = () => {
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
    const [anchorEl, setAnchorMenu] = useState(null);
    const [openBasket, setOpenBasket] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selCat, setSelCat] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories } = useSelector(state => state.categoryReducer);
    const { types, selectedType } = useSelector(state => state.typeReducer);
    const { user } = useSelector(state => state.userReducer);
    const { userId } = useSelector(state => state.authReducer);


    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    useEffect(() => {
        if (userId) {
            dispatch(userActions.getUserById(userId));
        }
    }, [dispatch, userId])

    const handleHoverMenu = useCallback((event, category) => {
        setAnchorMenu(event.currentTarget);
        setSelCat(category);
    }, []);


    const handleCloseMenu = useCallback(() => {
        setAnchorMenu(null);
        setSelCat(null);
    }, []);


    useEffect(() => {
        if (selCat) {
            dispatch(typeActions.getAll())
        }
    }, [dispatch, selCat])

    const handleCategoryClick = useCallback((category) => {
        if (selectedType) {
            dispatch(typeActions.clearSelectedType());
        }
        dispatch(categoryActions.setSelectedCategory(category));
    }, [dispatch, selectedType]);

    const handleTypeClick = useCallback((category, type) => {
        dispatch(categoryActions.setSelectedCategory(category));
        dispatch(typeActions.setSelectedType(type));
        handleCloseMenu();
    }, [dispatch, handleCloseMenu]);


    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogOut = async () => {
        await dispatch(authActions.logOut())
        navigate('/')
        window.location.reload();
    };

    return (
        <AppBar position="sticky"
            color="default"
            sx={{
                backgroundColor: `rgba(255, 255, 255,${scrollPosition > 50 ? 0.7 : 1})`,
                backdropFilter: scrollPosition > 50 ? 'blur(10px)' : 'none',
                transition: 'background-color 0.3s'
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                <MenuIcon className='header__icon mb' onClick={() => setOpenDrawerMenu(true)} />
                <DrawerMenu open={openDrawerMenu} setOpenSnackbar={setOpenSnackbar}
                    onClose={() => setOpenDrawerMenu(false)} horisontal={'right'} />
                <Stack direction="row" spacing={1} className='header__menu' sx={{ zIndex: "999" }}>
                    {categories.map((category) => (
                        <Box key={category._id}>
                            <NavLink to={`/${(toUrlFriendly(category.name))}`} className='link'>
                                <Typography
                                    id="basic-button"
                                    sx={{
                                        mr: 2,
                                        color: 'black',
                                        display: 'block',
                                        textTransform: 'uppercase',
                                        fontFamily: "Geologica",
                                        fontSize: 20,
                                        fontWeight: 600
                                    }}
                                    aria-controls={anchorEl && selCat._id === category._id ? `basic-menu-${category._id}` : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={(event) => handleHoverMenu(event, category)}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category.name}
                                </Typography>
                            </NavLink>
                            {
                                types.filter(type => type._category === category._id).length > 0 && (
                                    <Menu
                                        id={`basic-menu-${category._id}`}
                                        variant="outlined"
                                        anchorEl={anchorEl && selCat._id === category._id ? anchorEl : null}
                                        open={Boolean(anchorEl) && selCat._id === category._id}
                                        onMouseLeave={handleCloseMenu}
                                        menulistprops={{
                                            'aria-labelledby': `basic-button-${category._id}`,
                                        }}
                                        sx={{
                                            width: "150px",
                                            fontSize: "16px",
                                            opacity: 0.9,
                                            zIndex: "9999"
                                        }}
                                    >
                                        {types.filter(type => type._category === category._id)
                                            .map(type =>
                                            (<MenuItem key={type._id} onClick={() => handleTypeClick(category, type)}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    textTransform: 'lowercase',
                                                    fontWeight: 400,
                                                    margin: "0",
                                                }}
                                            ><NavLink to={`/${(toUrlFriendly(category.name))}/${(toUrlFriendly(type.name))}`} className='link'>
                                                    {type.name}
                                                </NavLink>
                                            </MenuItem>)
                                            )}
                                    </Menu>
                                )
                            }
                        </Box>
                    ))}

                </Stack>

                <Stack direction="row" alignItems="center" justifySelf="flex-end" sx={{ zIndex: "999" }}>
                    {userId ? <Link to="/account#wishlist" className='header_account-icon link'><FavoriteBorderIcon className='header__icon pc' /></Link> : <FavoriteBorderIcon className='header__icon pc' onClick={() => setOpenSnackbar(true)} />}

                    {userId ?
                        <Dropdown>
                            <MenuButton sx={{
                                border: "none", m: 0, p: 0, '&:hover': {
                                    backgroundColor: "transparent",
                                }
                            }}>
                                <AccountCircleRoundedIcon className='header__icon pc' />
                            </MenuButton>
                            <Menu placement="bottom-end"
                                sx={{
                                    fontSize: "18px",
                                    opacity: 0.9,
                                    zIndex: "9999"
                                }}>
                                <Chip size="sm" variant="soft" color="success" sx={{ mx: "15px", my: "5px" }}>
                                    Бонусів : {user.bonus}
                                </Chip>
                                <Link className='link' to="/account#profile">
                                    <MenuItem >
                                        <ListItemDecorator>
                                            <Edit />
                                        </ListItemDecorator>{' '}
                                        профіль
                                    </MenuItem>
                                </Link>
                                <Link to="/account#wishlist" className='link'>
                                    <MenuItem >
                                        <ListItemDecorator>
                                            <FavoriteBorderIcon />
                                        </ListItemDecorator>{' '}
                                        список бажань
                                    </MenuItem>
                                </Link>
                                <Link to="/account#orders" className='link'>
                                    <MenuItem >
                                        <ListItemDecorator >
                                            <LocalMallOutlinedIcon />
                                        </ListItemDecorator>{' '}
                                        замовлення
                                    </MenuItem>
                                </Link>
                                <ListDivider />
                                <MenuItem variant="soft" color="danger" onClick={handleLogOut}>
                                    <ListItemDecorator sx={{ color: 'inherit' }}>
                                        <LogoutRoundedIcon />
                                    </ListItemDecorator>{' '}
                                    вийти
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                        :
                        <Link className='header_account-icon link' to='/auth#logIn'>
                            <AccountCircleRoundedIcon className='header__icon pc' />
                        </Link>
                    }


                    <Badge variant="dot" color="warning" sx={{
                        '& .MuiBadge-dot': {
                            transform: 'translateY(6px)',
                        }
                    }}>
                        <LocalMallOutlinedIcon className='header__icon' sx={{ ml: "5px" }}
                            aria-label="open basket"
                            onClick={() => setOpenBasket(true)}
                        />
                    </Badge>
                </Stack>

            </Toolbar>
            <Typography variant="h5" className='header__logo'>
                <Link to="/" className='link'>
                    SHOPERS_VI
                </Link>
            </Typography>
            <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                startDecorator={<AccountCircleRoundedIcon />}
                color="warning" size="lg" variant="soft"
                autoHideDuration={3000}
                open={openSnackbar}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpenSnackbar(false);
                }}
            >
                <Link to='/auth#logIn' className='link' sx={{ margin: 0, p: 0, textAlign: "center" }} ><b>Увійдіть</b></Link>щоб переглянути список бажань.
            </Snackbar>

        </AppBar >
    );
};


export {
    Header
};