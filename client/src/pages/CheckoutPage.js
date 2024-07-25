import { Box, Typography, Stack, Container, TextField, MenuItem, } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Chip, CardContent, Divider, Input, Button, Select, FormControl, FormLabel, Radio, RadioGroup, Option, Tooltip } from '@mui/joy';

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
import useUser from '../hooks/useUser';
import { basketActions } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { postService } from '../services';
// import Select2 from '@mui/material/Select';
import Select2 from 'react-select'

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const [post, setPost] = useState('novapost');
    const [payment, setPayment] = useState('card');
    const [checked, setChecked] = useState(false);

    // post
    const [searchString, setSearchString] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const { basket, loading, error } = useSelector(state => state.basketReducer);
    const { user } = useSelector(state => state.userReducer);

    const userId = useUser();

    const handleInputChange = async (value) => {
        setSearchString(value);

        if (value.length >= 3) {
            try {
                const response = await postService.getCities(value);
                const cities = response.data.data.map(city => ({
                    value: city.Ref,
                    label: city.Description
                }));
                setOptions(cities);
            } catch (error) {
                console.error('Error searching cities:', error);
            }
        } else {
            setOptions([]);
        }
    };

    const handleCityChange = async (selectedOption) => {
        setSelectedCity(selectedOption);

        setSelectedWarehouse(null);
        setWarehouses([]);

        try {
            const response = await postService.getWarehouses(selectedOption.value);
            const warehouses = response.data.data.map(warehouse => ({
                value: warehouse.Ref,
                label: warehouse.Description
            }));
            setWarehouses(warehouses);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    }

    const handleWarehouseChange = (selectedOption) => {
        setSelectedWarehouse(selectedOption);
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleChangePost = (event) => {
        setPost(event.target.value);
    };

    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };


    useEffect(() => {
        if (userId) {
            dispatch(basketActions.getBasket(userId));
        }
    }, [dispatch, userId]);


    const totalPrice = useMemo(() => {
        if (!checked) {
            return basket.reduce((total, productInBasket) => {
                return total + productInBasket.price * productInBasket.quantity;
            }, 0);
        } else {
            return basket.reduce((total, productInBasket) => {
                return total + productInBasket.price * productInBasket.quantity;
            }, -user.bonus);
        }
    }, [basket, checked]);


    const totalCashback = useMemo(() => {
        return basket.reduce((total, productInBasket) => {
            return total + productInBasket.cashback;
        }, 0);
    }, [basket]);


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
                            <RadioGroup defaultValue="novapost" name="radio-buttons-group">
                                <Stack direction="row" spacing={5} >
                                    <Stack direction="row" spacing={2} className='checkout__post'>
                                        <Radio
                                            checked={post === 'novapost'}
                                            onChange={handleChangePost}
                                            value="novapost"
                                            color="neutral" />
                                        <img src={novapost} />
                                    </Stack>
                                    <Stack direction="row" spacing={2} className='checkout__post'>
                                        <Radio
                                            checked={post === 'ukrpost'}
                                            onChange={handleChangePost}
                                            value="ukrpost"
                                            color="neutral" />
                                        <img src={ukrpost} />
                                    </Stack>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        {
                            post === 'novapost' &&
                            <>
                                <Select2
                                    inputValue={searchString}
                                    onInputChange={handleInputChange}
                                    onChange={handleCityChange}
                                    options={options}
                                    placeholder="Введіть назву міста"
                                    noOptionsMessage={() => "Нічого не знайдено"}
                                />

                                <Select2
                                    value={selectedWarehouse}
                                    onChange={handleWarehouseChange}
                                    options={warehouses}
                                    placeholder="Виберіть відділення"
                                    noOptionsMessage={() => "Нічого не знайдено"}
                                />
                            </>
                        }
                        {post === 'ukrpost' &&
                            <>
                                <FormControl required className="checkout__form">
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
                                </FormControl>
                            </>
                        }

                        <Typography className='checkout__title'>
                            ОПЛАТА
                        </Typography>
                        <Divider inset="none" />
                        <FormControl>
                            <RadioGroup defaultValue="card" name="radio-buttons-group2">
                                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                        <Stack direction="row" spacing={2}>
                                            <Radio value="card" color="neutral" onChange={handleChangePayment} />
                                            <Typography>Повна оплата на сайті</Typography>
                                        </Stack>
                                        <img src={liqpay} style={{ height: "14px" }} />
                                    </Stack>

                                    {post === 'novapost' &&
                                        <Stack direction="row" spacing={3}>
                                            <Radio value="cash" color="neutral" onChange={handleChangePayment} />
                                            <Typography>Накладений платіж по передоплаті 100 грн. (тільки Нова пошта)</Typography>
                                            <Tooltip arrow placement="right" variant="outlined" title={
                                                <Typography sx={{ maxWidth: 320, p: 1, }}>
                                                    <b> УВАГА! </b>Враховуйте, що замовляючи цим способом оплати, при отриманні
                                                    Вам потрібно буде сплатити комісію за послуги НП:
                                                    20 грн + 2% від суми замовлення.
                                                </Typography>

                                            }>
                                                <InfoOutlinedIcon />
                                            </Tooltip>
                                        </Stack>
                                    }
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
                                        <Typography className="basket__price">{totalPrice} грн.</Typography>
                                    </Stack>
                                    <Chip className="basket__cashback" size="sm" variant="soft" color="success" alignItems="flex-end">
                                        Кешбек з покупки : {totalCashback} грн.
                                    </Chip>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: "20px" }}>
                                        <Checkbox label="Оплатити за допомогою бонусів" color="success" variant="soft" checked={checked} onChange={handleCheckboxChange} />
                                        <Tooltip arrow variant="outlined" placement="bottom-end" title={
                                            <Typography sx={{
                                                maxWidth: 400,
                                                p: 1,
                                            }}>
                                                З вашого бонусого рахунку буде списано {user.bonus} грн.
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