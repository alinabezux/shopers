import { Box, Typography, Stack, Container, TextField, MenuItem, } from '@mui/material';
import React, { useState } from 'react';
import { Card, Chip, CardContent, Divider, Input, Button, Select, FormControl, FormLabel, Radio, RadioGroup, Option, Tooltip } from '@mui/joy';
import bag from '../assets/bags.png'
import ring from '../assets/accessories.png'
import { selectClasses } from '@mui/joy/Select';
import Checkbox from '@mui/joy/Checkbox';
import ukrpost from '../assets/ukrpost.png'
import novapost from '../assets/novapost.png'
import liqpay from '../assets/logo_liqpay.png'
import { ProductInBasket } from '../components';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import LocationOn from '@mui/icons-material/LocationOn';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const CheckoutPage = () => {
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
        <Container className='checkout'>
            <Typography variant="h4" className='title'>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</Typography>
            <Box className='checkout__main'>
                <Box className='checkout__first'>
                    <Card variant="plain">
                        <Typography className='checkout__title'>
                            ВАШІ ДАНІ
                        </Typography>
                        <Divider inset="none" />
                        <CardContent className="checkout__info">
                            <FormControl required className="checkout__form">
                                <FormLabel >Ім'я</FormLabel>
                                <Input />
                            </FormControl>
                            <FormControl required className="checkout__form">
                                <FormLabel>Прізвище</FormLabel>
                                <Input />
                            </FormControl>
                            <FormControl required className="checkout__form">
                                <FormLabel >Номер телефону</FormLabel>
                                <Input startDecorator={<Typography>+380</Typography>} />
                            </FormControl>
                            <FormControl className="checkout__form">
                                <FormLabel>Ваш нік в Instagram</FormLabel>
                                <Input startDecorator={<AlternateEmailRoundedIcon />} />
                            </FormControl>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>E-mail адреса</FormLabel>
                                <Input startDecorator={<EmailRoundedIcon />} />
                            </FormControl>
                        </CardContent>

                        <Typography className='checkout__title' >
                            АДРЕСА ДОСТАВКИ
                        </Typography>
                        <Divider inset="none" />
                        <FormControl required>
                            <RadioGroup defaultValue="medium" name="radio-buttons-group">
                                <Stack direction="row" spacing={5} >
                                    <Stack direction="row" spacing={2} className='checkout__post'>
                                        <Radio value="novapost" color="neutral" />
                                        <img src={novapost} />
                                    </Stack>
                                    <Stack direction="row" spacing={2} className='checkout__post'>
                                        <Radio value="ukrpost" color="neutral" />
                                        <img src={ukrpost} />
                                    </Stack>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <Select defaultValue="post" indicator={<KeyboardArrowDown />} sx={{
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                        }}>
                            <Option value="post">у відділення</Option>
                            <Option value="box">до поштомату</Option>
                        </Select>
                        <Select placeholder="Місто" startDecorator={<LocationOn />} indicator={<KeyboardArrowDown />} sx={{
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                        }}>
                            <Option value="1">Київ</Option>
                            <Option value="2">Львів</Option>
                            <Option value="3">Харків</Option>
                            <Option value="4">Дніпро</Option>
                        </Select>
                        <Select placeholder="відділення №" indicator={<KeyboardArrowDown />} sx={{
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                        }}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                        </Select>

                        {/* <FormControl required className="checkout__form">
                            <FormLabel>Місто / Село</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl required className="checkout__form">
                            <FormLabel>Область / Округ</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl required className="checkout__form">
                            <FormLabel>Поштовий індекс</FormLabel>
                            <Input />
                        </FormControl> */}

                        <Typography className='checkout__title'>
                            ОПЛАТА
                        </Typography>
                        <Divider inset="none" />
                        <FormControl>
                            <RadioGroup defaultValue="medium" name="radio-buttons-group2">
                                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center"  justifyContent="space-between" >
                                        <Stack direction="row" spacing={2}>
                                            <Radio value="karta" color="neutral" />
                                            <Typography>Повна оплата на сайті</Typography>
                                        </Stack>
                                        <img src={liqpay} style={{ height: "14px" }} />
                                    </Stack>
                                    <Stack direction="row" spacing={3}>
                                        <Radio value="nalozhka" color="neutral" />
                                        <Typography>Накладений платіж по передоплаті 100 грн. (тільки Нова пошта)</Typography>
                                        <Tooltip arrow placement="right" variant="outlined" title={
                                            <Typography sx={{
                                                maxWidth: 320,
                                                p: 1,
                                            }}>                                                 <b> УВАГА! </b>Враховуйте, що замовляючи цим способом оплати, при отриманні
                                                Вам потрібно буде сплатити комісію за послуги НП:
                                                20 грн + 2% від суми замовлення.
                                            </Typography>

                                        }>
                                            <InfoOutlinedIcon />
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                            </RadioGroup>
                        </FormControl >
                    </Card >
                </Box >

                <Box className="checkout__order">
                    <Card variant="outlined">
                        <Typography className='checkout__title'>
                            ВАШЕ ЗАМОВЛЕННЯ
                        </Typography>
                        <Divider inset="none" />
                        <CardContent
                            sx={{

                            }}
                        >
                            <Container className='basket__content'>
                                <Box className='basket__products'>
                                    <Stack direction="column" spacing={2} alignItems="center">
                                        {basket.map(product => (
                                            <ProductInBasket key={product._id} product={product} />
                                        ))}
                                    </Stack>
                                </Box>
                                <Stack direction="column" className='basket__order' >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography className="basket__price">Разом :</Typography>
                                        <Typography className="basket__price">1040 грн.</Typography>
                                    </Stack>
                                    <Chip className="basket__cashback" size="sm" variant="soft" color="success" alignItems="flex-end">
                                        Кешбек з покупки : 20 грн.
                                    </Chip>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: "20px" }}>
                                        <Checkbox label="Оплатити за допомогою бонусів" color="success" variant="soft" />
                                        <Tooltip arrow variant="outlined" placement="bottom-end" title={
                                            <Typography sx={{
                                                maxWidth: 400,
                                                p: 1,
                                            }}>
                                                З вашого бонусого рахунку буде списано 7 грн.
                                            </Typography>

                                        }>
                                            <InfoOutlinedIcon />
                                        </Tooltip>
                                    </Stack>

                                    <Button variant="solid" color="neutral" className="basket__button" endDecorator={<DoneRoundedIcon />}>ПІДТВЕРДИТИ ЗАМОВЛЕННЯ</Button>
                                    <Typography sx={{
                                        p: 2,
                                        color: "grey",
                                        fontSize: "14px",
                                        textAlign: "center"
                                    }}>
                                        Ми не телефонуємо для підтвердження. Оплачуючи замовлення, Ви автоматично підтверджуєте його.
                                    </Typography>
                                </Stack>
                            </Container>
                        </CardContent>
                    </Card>
                </Box>
            </Box >
        </Container >
    );
};

export { CheckoutPage };