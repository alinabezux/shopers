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
import { Menu, MenuItem } from "@mui/joy";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, typeActions } from "../redux";
import { DrawerMenu } from "./DrawerMenu";
import { DrawerBasket } from "./DrawerBasket";
import transliterate from "transliterate";


const Header = () => {
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
    const [anchorEl, setAnchorMenu] = useState(null);
    const [openBasket, setOpenBasket] = useState(false);
    const [selCat, setSelCat] = useState({});

    const dispatch = useDispatch();
    const { categories, selectedCategory } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);

    const toggleMenu = (newOpenDrawerMenu) => () => {
        setOpenDrawerMenu(newOpenDrawerMenu);
    };

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    const handleHoverMenu = useCallback((event, category) => {
        setAnchorMenu(event.currentTarget);
        setSelCat(category);
    }, [dispatch]);


    const handleCloseMenu = useCallback(() => {
        setAnchorMenu(null);
        setSelCat(null);
    }, [dispatch]);


    useEffect(() => {
        if (selCat) {
            dispatch(typeActions.getAll())
        }
    }, [dispatch, selCat])

    const handleCategoryClick = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
        handleCloseMenu();
    }, [dispatch]);

    const handleTypeClick = useCallback((category, type) => {
        dispatch(categoryActions.setSelectedCategory(category));
        dispatch(typeActions.setSelectedType(type));
        handleCloseMenu();
    }, [dispatch]);
    //
    const toggleBasket = (newOpenBasket) => () => {
        setOpenBasket(newOpenBasket);
    };

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



    return (
        <AppBar position="sticky"
            color="default"
            sx={{
                backgroundColor: `rgba(255, 255, 255,${scrollPosition > 50 ? 0.5 : 1})`,
                transition: 'background-color 0.3s',
            }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpenDrawerMenu(true)}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon sx={{ fontSize: 35 }} />
                </IconButton>

                <DrawerMenu open={openDrawerMenu}
                    onClose={() => setOpenDrawerMenu(false)} />

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {categories.map((category) => (
                        <Box key={category._id}>
                            <Link to={`/${(transliterate(category.name).toLowerCase())}`}
                                style={{
                                    color: "inherit",
                                    textDecoration: "none"
                                }}>
                                <Typography
                                    id="basic-button"
                                    sx={{
                                        mr: 2,
                                        color: 'black',
                                        display: 'block',
                                        textTransform: 'uppercase',
                                        fontFamily: "Geologica",
                                        fontSize: 20,
                                        fontWeight: 600,
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: "#700b03"
                                        }
                                    }}
                                    aria-controls={anchorEl && selCat._id === category._id ? `basic-menu-${category._id}` : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={(event) => handleHoverMenu(event, category)}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category.name}
                                </Typography>
                            </Link>

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
                                    fontFamily: "Geologica, sans-serif",
                                    fontSize: "20px",
                                    opacity: 0.9,
                                    zIndex: "9999"
                                }}
                            >
                                {types
                                    .filter(type => type._category === category._id)
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
                                    ><Link to={`/${(transliterate(category.name).toLowerCase())}/${(transliterate(type.name).toLowerCase())}`}
                                        style={{
                                            color: "black",
                                            textDecoration: "none"
                                        }}>{type.name}</Link></MenuItem>)
                                    )}
                            </Menu>
                        </Box>
                    ))}

                </Box>

                <Typography variant="h5"
                    sx={{
                        flexGrow: 1, fontWeight: "800",
                        fontFamily: "Geologica, sans-serif"
                    }}>
                    <Link to="/" style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}>
                        SHOPERS_VI
                    </Link>
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open favorite"
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                        <SearchOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open favorite"
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                        <FavoriteBorderIcon sx={{ fontSize: 35 }} />
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open account"
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                        <PermIdentityIcon sx={{ fontSize: 35 }} />
                    </IconButton>

                    <Badge variant="dot" color="warning" sx={{
                        '& .MuiBadge-dot': {
                            transform: 'translateY(6px)',
                        }
                    }}>
                        <LocalMallOutlinedIcon sx={{ fontSize: 35 }}
                            aria-label="open basket"
                            onClick={() => setOpenBasket(true)}
                        />
                    </Badge>
                    <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />
                </Stack>

            </Toolbar>
        </AppBar>
    );
};


export {
    Header
};