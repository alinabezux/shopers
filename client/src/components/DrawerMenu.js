import React, { useCallback, useEffect} from 'react';
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { categoryActions, typeActions } from "../redux";
import { toUrlFriendly } from '../utils'
import instlogo from "../assets/inst logo.png";
import inst from "../assets/inst.png";

import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Divider,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Drawer from "@mui/material/Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DrawerMenu = ({ open, onClose, setOpenSnackbar }) => {
    const dispatch = useDispatch();

    const { categories, selectedCategory } = useSelector(state => state.categoryReducer);
    const { userId } = useSelector(state => state.authReducer);
    const { types } = useSelector(state => state.typeReducer);


    const handleMenu = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
    }, [dispatch]);

    const handleTypeClick = useCallback((category, type) => {
        dispatch(categoryActions.setSelectedCategory(category));
        dispatch(typeActions.setSelectedType(type));
        onClose();
    }, [dispatch, onClose]);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(typeActions.getAll());
        }
    }, [dispatch, selectedCategory]);


    const handleClickWislist = useCallback(() => {
        onClose();
        setOpenSnackbar(true);
    }, [onClose, setOpenSnackbar]);

    return (
        <Drawer open={open} >
            <Box className='drawerMenu'>
                <Box
                    sx={{ backgroundColor: "black", color: "white", height: "56px" }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={onClose}
                    ><CloseIcon fontSize="large" />
                    </IconButton>
                </Box>

                {categories.map((category) => {
                    const categoryTypes = types.filter(type => type._category === category._id);

                    return categoryTypes.length === 0 ? (
                        <h2 style={{margin:"15px 0 10px 15px"}} key={category._id} className='drawerMenu__category' onClick={() => handleTypeClick(category, null)}>
                            <NavLink to={`/${(toUrlFriendly(category.name))}`} className="link">
                                {category.name}
                            </NavLink>
                        </h2>
                    ) : (
                        <Accordion key={category._id} id={category._id} sx={{
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none',
                            },
                            '&.Mui-expanded': {
                                margin: 0,
                            }
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon onClick={() => handleMenu(category)} />}
                            >
                                <h2 key={category._id} className='drawerMenu__category' onClick={() => handleTypeClick(category, null)}>
                                    <NavLink to={`/${(toUrlFriendly(category.name))}`} className="link">
                                        {category.name}
                                    </NavLink>
                                </h2>
                            </AccordionSummary>

                            <AccordionDetails sx={{ color: "grey", margin: "0 0 0 30px" }}>
                                {categoryTypes.map(type => (
                                    <h3 className='drawerMenu__type' key={type._id} onClick={() => handleTypeClick(category, type)}>
                                        <NavLink to={`/${(toUrlFriendly(category.name))}/${(toUrlFriendly(type.name))}`} className="link">
                                            {type.name}
                                        </NavLink>
                                    </h3>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}


                <Box>
                    <Divider variant="middle" />
                    {
                        <Link to={userId ? "/account#profile" : "/auth#logIn"} className='link' onClick={onClose}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                >
                                    <AccountCircleRoundedIcon fontSize="inherit" />
                                </IconButton>
                                <h2 className='drawerMenu__category'>МІЙ КАБІНЕТ</h2>
                            </Stack>
                        </Link>
                    }
                    {
                        <Link to={userId ? "/account#wishlist" : "#"} className='link' onClick={userId ? onClose : handleClickWislist}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                >
                                    <FavoriteBorderIcon fontSize="inherit" />
                                </IconButton>
                                <h2 className='drawerMenu__category'>СПИСОК БАЖАНЬ</h2>
                            </Stack>
                        </Link>
                    }
                    <Divider variant="middle" />
                </Box>

                <Stack direction="column" spacing={2} sx={{ margin: "50px 15px 15px 15px" }}>
                    <Link to="/obmin-ta-povernennya" onClick={onClose}
                        style={{
                            color: "grey",
                            textDecoration: "none"
                        }}>
                        <h2 className='drawerMenu__category'>ОБМІН ТА ПОВЕРНЕННЯ</h2>
                    </Link>

                    <Link to="/oplata-ta-dostavka" underline="none" onClick={onClose} style={{
                        color: "grey",
                        textDecoration: "none"
                    }}>
                        <h2 className='drawerMenu__category'>ОПЛАТА ТА ДОСТАВКА</h2>
                    </Link>
                </Stack>
                <Stack direction="row" spacing={12} alignItems="center"
                    sx={{ padding: "15px" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <img src={instlogo} alt="inst logo" height={20} />
                        <Typography sx={{
                            fontWeight: "800",
                        }}>SHOPERS_VI
                        </Typography>
                    </Stack>
                    <img src={inst} alt="instimage" height={40} />
                </Stack>
            </Box>
        </Drawer >
    );
};

export { DrawerMenu };