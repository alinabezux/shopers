import React from 'react';
import Card from "@mui/joy/Card";
import { AspectRatio, Button, CardContent, Chip, ButtonGroup } from "@mui/joy";
import { Stack, Typography } from "@mui/material";
import { ChipDelete } from '@mui/joy';

const ProductInBasket = ({ product }) => {
    return (
        <Card variant="plain" orientation="horizontal" size="sm" color="neutral" className="product-in-basket">

            <AspectRatio ratio="1" className="product-in-basket__card-image">
                <img src={product.images} alt={product.name} />
            </AspectRatio>
            <CardContent className="product-in-basket__card-content">
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography className="product-in-basket__card-name">{product.name}</Typography>
                    <ChipDelete />
                </Stack>

                <Typography className="product-in-basket__card-color">Колір: {product.info.color}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography className="product-in-basket__card-price">{product.price} грн.</Typography>
                    <Chip className="product-in-basket__card-cashback" size="sm" variant="soft" color="success">
                        {product.cashback} грн. кешбек
                    </Chip>
                </Stack>
                <ButtonGroup className="product-in-basket__card-counter" size="small" variant='outlined' aria-label="outlined button group">
                    <Button className="product-in-basket__card-quantity"> - </Button>
                    <Button className="product-in-basket__card-quantity">{product.quantity}</Button>
                    <Button className="product-in-basket__card-quantity">+</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
};

export { ProductInBasket };