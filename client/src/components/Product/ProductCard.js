import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import { AspectRatio, CardContent, CardOverflow, Chip } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import img from '../../assets/test imge.png'
import { basketActions, productActions, userActions } from "../../redux";
import { toUrlFriendly } from '../../utils';
import { Link } from "react-router-dom";
import { DrawerBasket } from '../DrawerBasket';
import { authService } from '../../services/auth.service';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);
    const [openBasket, setOpenBasket] = useState(false);

    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch, product]);

    useEffect(() => {
        const userId = authService.getUser();
        if (userId) {
            setUserId(userId);
        }
    }, [])

    const handleAddProductToBasket = useCallback(async (product) => {
        console.log(product)
        await dispatch(basketActions.addToBasket({ userId, productId: product._id }));
        await dispatch(basketActions.getBasket(userId));
        setOpenBasket(true);
    }, [userId, dispatch]);

    return (
        <>
            <Card className="product-card" sx={{ '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}
                onClick={() => handleShowDetails(product)}>
                <Link className='link' to={`/product/${(toUrlFriendly(product.name))}`} key={product._id}>
                    <AspectRatio ratio="1">
                        <CardOverflow>
                            <img
                                src={img}
                                loading="lazy"
                                alt={product.name}
                            />
                        </CardOverflow>
                    </AspectRatio>
                </Link>
                <CardContent className="product-card__card-content">
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h3" className="product-card__card-name">{product.name}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography className="product-card__card-price">{product.price} ₴</Typography>
                            <Stack direction="row" spacing={1}>
                                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                                {/*<FavoriteIcon sx={{fontSize: 20, color: "#730000"}}/>*/}
                                <LocalMallOutlinedIcon sx={{ fontSize: 20 }} onClick={() => handleAddProductToBasket(product)} />
                                {/*<DoneIcon sx={{fontSize: 20}}/>*/}
                            </Stack>
                        </Stack>
                        <Chip className="product-card__card-cashback" size="sm" variant="soft" color="success">
                            {product.cashback} грн. кешбек
                        </Chip>
                    </Stack>
                </CardContent>

            </Card>
            <DrawerBasket open={openBasket} onClose={() => setOpenBasket(false)} />
        </>
    );
};

export default ProductCard;