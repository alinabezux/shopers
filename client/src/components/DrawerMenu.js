import React, { useCallback, useEffect } from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Divider,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Drawer from "@mui/material/Drawer";
import instlogo from "../assets/inst logo.png";
import inst from "../assets/inst.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, typeActions } from "../redux";
import { toUrlFriendly } from '../utils'


const DrawerMenu = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { categories, selectedCategory } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);

    const handleMenu = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
    }, [dispatch]);

    useEffect(() => {
        dispatch(typeActions.getAll())
    }, [dispatch, selectedCategory])

    const handleTypeClick = useCallback((category, type) => {
        dispatch(categoryActions.setSelectedCategory(category));
        dispatch(typeActions.setSelectedType(type));
        onClose();
    }, [dispatch]);

    return (
        <Drawer open={open} >
            <Box sx={{ width: "80vw" }}>
                <Box
                    sx={{ backgroundColor: "black", color: "white" }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={onClose}
                    ><CloseIcon fontSize="large" />
                    </IconButton>
                </Box>

                {categories.map((category) =>
                    <Accordion key={category._id} id={category._id} sx={{
                        boxShadow: 'none',
                        '&:before': {
                            display: 'none',
                        },
                        '&.Mui-expanded': {
                            margin: 0,
                        }
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleMenu(category)}>
                            <h2 style={{
                                margin: "0",
                                textTransform: 'uppercase'
                            }}>{category.name}</h2>
                        </AccordionSummary>

                        <AccordionDetails sx={{ color: "grey", margin: "0 0 0 30px" }}>
                            {
                                types.filter(type => type._category === category._id).map(type =>
                                (<h3 key={type._id}
                                    onClick={() => handleTypeClick(category, type)}
                                    style={{
                                        margin: "0 0 15px 0",
                                        fontSize: "25px",
                                        textTransform: 'lowercase'
                                    }}>
                                    <NavLink to={`/${(toUrlFriendly(category.name))}/${(toUrlFriendly(type.name))}`}
                                        className={({ isActive }) => isActive ? "link active" : "link"}>{type.name}
                                    </NavLink>
                                </h3>))
                            }
                        </AccordionDetails>
                    </Accordion>
                )}

                <Divider variant="middle" />

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <AccountCircleRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <h3>ОСОБИСТИЙ КАБІНЕТ</h3>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <FavoriteBorderIcon fontSize="inherit" />
                    </IconButton>
                    <h3>ВПОДОБАНІ</h3>
                </Stack>
                <Divider variant="middle" />
                <Stack direction="column" spacing={2} sx={{ margin: "15px" }}>
                    <h3>
                        <Link to="/obmin-ta-povernennya"
                            style={{
                                color: "black",
                                textDecoration: "none",
                                '&:hover': {
                                    color: "#9e9e9e",
                                }
                            }}>
                            ОБМІН ТА ПОВЕРНЕННЯ
                        </Link>
                    </h3>
                    <h3>
                        <Link to="/oplata-ta-dostavka" underline="none" style={{
                            color: "black",
                            textDecoration: "none",
                            '&:hover': {
                                color: "#9e9e9e",
                            }
                        }}>
                            ОПЛАТА ТА ДОСТАВКА
                        </Link>
                    </h3>
                </Stack>
                <Stack direction="row" spacing={12} alignItems="center"
                    sx={{ padding: "15px" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <img src={instlogo} alt="inst logo" height={20} />
                        <Typography sx={{
                            fontWeight: "800",
                            fontFamily: "Geologica, sans-serif",
                        }}>SHOPERS_VI
                        </Typography>
                    </Stack>
                    <img src={inst} alt="inst image" height={40} />
                </Stack>
            </Box>
        </Drawer >
    );
};

export { DrawerMenu };