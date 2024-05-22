import React, {useCallback, useEffect} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Divider,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Drawer from "@mui/material/Drawer";
import instlogo from "../assets/inst logo.png";
import inst from "../assets/inst.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useDispatch, useSelector} from "react-redux";
import {categoryActions, typeActions} from "../redux";

const DrawerMenu = ({open, onClose}) => {
    const dispatch = useDispatch();
    const {categories, selectedCategory} = useSelector(state => state.categoryReducer);
    const {types} = useSelector(state => state.typeReducer);

    const handleMenu = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category._id));
    }, [dispatch]);

    useEffect(() => {
            dispatch(typeActions.getAll())
    }, [dispatch, selectedCategory])

    return (
        <Drawer open={open}>
            <Box sx={{width: "80vw"}}>
                <Box
                    sx={{backgroundColor: "black", color: "white"}}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    ><CloseIcon fontSize="large"
                                onClick={onClose}
                    />
                    </IconButton>
                </Box>

                {categories.map((category) =>
                    <>
                        <Accordion key={category._id} id={category._id} sx={{
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none',
                            }
                        }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} onClick={() => handleMenu(category)}>
                                <h3 style={{
                                    margin: "0",
                                    textTransform: 'uppercase'
                                }}>{category.name}</h3>
                            </AccordionSummary>

                            <AccordionDetails sx={{color: "grey", margin: "0 0 0 30px"}}>
                                {
                                    types.filter(type => type._category === category._id).map(type =>
                                        (<h3 key={type._id} style={{margin: "0 0 15px 0"}}>{type.name}</h3>))
                                }
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}

                <Divider variant="middle"/>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <PermIdentityIcon fontSize="inherit"/>
                    </IconButton>
                    <h3>ОСОБИСТИЙ КАБІНЕТ</h3>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <FavoriteBorderIcon fontSize="inherit"/>
                    </IconButton>
                    <h3>ВПОДОБАНІ</h3>
                </Stack>
                <Divider variant="middle"/>
                <Stack direction="column" spacing={2} sx={{margin: "15px 15px 15vh 15px"}}>
                    <h3>ОБМІН ТА ПОВЕРНЕННЯ</h3>
                    <h3>ДОСТАВКА ТА ОПЛАТА</h3>
                </Stack>

                <Stack direction="row" spacing={17} alignItems="center"
                       sx={{
                           padding: "15px",
                           bottom: "5vh",
                           position: "fixed",
                           backgroundColor: "white",
                           boxSizing: "border-box"
                       }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <img src={instlogo} alt="inst logo" height={20}/>
                        <Typography sx={{
                            fontWeight: "800",
                            fontFamily: "Geologica, sans-serif",
                        }}>SHOPERS_VI
                        < /Typography>
                    </Stack>
                    <img src={inst} alt="inst image" height={40}/>
                </Stack>
            </Box>
        </Drawer>
    );
};

export {DrawerMenu};