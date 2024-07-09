import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Container,
    Stack
} from "@mui/material";
import Button from '@mui/joy/Button';
import { Chip } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import bag from '../assets/bags.png'
import ring from '../assets/accessories.png'
import { ProductInBasket } from './ProductInBasket';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const DrawerBasket = ({ open, onClose }) => {
    const basket = [
        {
            "info": {
                "color": "Рожевий",
                "size": "регулюється від 16 до 21",
                "material": "сталь + кварц"
            },
            "_id": "664c7477da796b4a4b46d2b7",
            "article": "2000",
            "name": "Каблучка з рожевого кварцу",
            "images": ring,
            "_category": "6643779b8ad17f97b3f8ec6e",
            "_type": "6647cbb48df667dfddc3a725",
            "quantity": 1,
            "price": 200,
            "cashback": 4,
            "__v": 0
        },
        {
            "info": {
                "color": "Чорний",
                "size": "25см /18см/11см",
                "material": "еко шкіра + оксамит",
                "description": "2 кишені всередині. Є додатковий ланцюжок"
            },
            "_id": "664c7323da796b4a4b46d2b5",
            "article": "1000-BL",
            "name": "Александра",
            "images": bag,
            "_category": "664377a98ad17f97b3f8ec70",
            "_type": "664c6ea78927276eede67848",
            "quantity": 1,
            "price": 840,
            "cashback": 16,
            "__v": 0
        }

    ];

    return (
        <Drawer open={open} anchor="right">
            <Box className='basket'>
                <Box className='basket__header' >
                    <Typography className='basket__title' variant="h4" >КОШИК</Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="close drawer"
                        onClick={onClose}
                        sx={{ px: "0" }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Container className='basket__content'>
                    <Box className='basket__products'>
                        <Stack direction="column" spacing={2} alignItems="center">
                            {basket.map(product => (
                                <ProductInBasket key={product._id} product={product} />
                            ))}
                        </Stack>
                    </Box>
                    <Stack direction="column"  className='basket__order'>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography className="basket__price">Разом :</Typography>
                            <Typography className="basket__price">1040 грн.</Typography>
                        </Stack>
                        <Chip className="basket__cashback" size="sm" variant="soft" color="success" alignItems="flex-end">
                            Кешбек з покупки : 20 грн.
                        </Chip>
                        <Button variant="solid" color="neutral" className="basket__button" endDecorator={<LocalMallOutlinedIcon />}>ОФОРМИТИ ЗАМОВЛЕННЯ</Button>
                    </Stack>
                </Container>
            </Box>
        </Drawer >
    );
};

export { DrawerBasket };