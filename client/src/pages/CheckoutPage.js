import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form, Controller } from "react-hook-form";
import Select2 from 'react-select'

import ukrpost from '../assets/ukrpost.png'
import novapost from '../assets/novapost.png'
import { ProductInBasket } from '../components';
import { basketActions, orderActions } from '../redux';
import { postService } from '../services';
import platamono from '../assets/plata_light_bg@2x.png'

import { Box, Typography, Stack, Container } from '@mui/material';
import Button2 from "@mui/material/Button";
import { Card, Chip, CardContent, Divider, Input, Button, FormControl, FormLabel, Radio, RadioGroup, Tooltip, FormHelperText, Alert } from '@mui/joy';
import Checkbox from '@mui/joy/Checkbox';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { InfoOutlined, LocalMallOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState('Нова пошта');
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [payment, setPayment] = useState('Передоплата');
    const [checked, setChecked] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [options, setOptions] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [localBasket, setLocalBasket] = useState([]);

    const { basket } = useSelector(state => state.basketReducer);
    const { user } = useSelector(state => state.userReducer);
    const { userId } = useSelector(state => state.authReducer);
    const { loadingOrder } = useSelector(state => state.orderReducer);

    const { control, handleSubmit, register, formState: { errors }, setValue } = useForm();

    const regions = [
        { value: 1, label: "Вінницька область" },
        { value: 2, label: "Волинська область" },
        { value: 3, label: "Луганська область" },
        { value: 4, label: "Дніпропетровська область" },
        { value: 5, label: "Донецька область" },
        { value: 6, label: "Житомирська область" },
        { value: 7, label: "Закарпатська область" },
        { value: 8, label: "Запорізька область" },
        { value: 9, label: "Івано-Франківська область" },
        { value: 10, label: "місто Київ" },
        { value: 11, label: "Київська область" },
        { value: 12, label: "Кіровоградська область" },
        { value: 13, label: "місто Севастополь" },
        { value: 14, label: "Автономна Республіка Крим" },
        { value: 15, label: "Львівська область" },
        { value: 16, label: "Миколаївська область" },
        { value: 17, label: "Одеська область" },
        { value: 18, label: "Полтавська область" },
        { value: 19, label: "Рівненська область" },
        { value: 20, label: "Сумська область" },
        { value: 21, label: "Тернопільська область" },
        { value: 22, label: "Харківська область" },
        { value: 23, label: "Херсонська область" },
        { value: 24, label: "Хмельницька область" },
        { value: 25, label: "Черкаська область" },
        { value: 26, label: "Чернігівська область" },
        { value: 28, label: "Чернівецька область" }
    ]

    useEffect(() => {
        if (userId) {
            dispatch(basketActions.getBasket(userId));
        } else {
            const savedBasket = JSON.parse(localStorage.getItem('basket')) || {};
            setLocalBasket(Object.values(savedBasket));
        }
    }, [dispatch, userId]);

    const handleUpdateBasket = (updatedBasket) => {
        setLocalBasket(Object.values(updatedBasket));
    };

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick2 = () => {
        setOpen2(prev2 => !prev2);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };


    useEffect(() => {
        if (user) {
            setValue('firstName', user?.name);
            setValue('lastName', user?.surname);
            setValue('phoneNumber', user?.phone);
            setValue('email', user?.email);
            setValue('instagram', user?.instagram);
        }
    }, [user, setValue]);

    const basketToUse = userId ? basket : localBasket;

    const totalPrice = useMemo(() => {
        if (!checked) {
            return basketToUse.reduce((total, productInBasket) => total + productInBasket.price * productInBasket.quantity, 0);
        } else {
            return basketToUse.reduce((total, productInBasket) => {
                return total + productInBasket.price * productInBasket.quantity;
            }, -user.bonus);
        }
    }, [basketToUse, checked, user.bonus]);


    const totalCashback = useMemo(() => {
        return basketToUse.reduce((total, productInBasket) => total + productInBasket.cashback, 0);
    }, [basketToUse]);

    const handleCreateOrder = useCallback(async (data) => {
        try {
            const order = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                shipping: post,
                instagram: data.instagram,
                city: selectedCity ? {
                    ref: selectedCity.value,
                    description: selectedCity.label
                } : null,
                warehouse: selectedWarehouse ? {
                    ref: selectedWarehouse.value,
                    description: selectedWarehouse.label,
                    index: selectedWarehouse.index,
                    number: selectedWarehouse.number,
                } : null,
                cityUKR: data.cityUKR || null,
                region: selectedRegion || null,
                index: data.index || null,
                paymentMethod: payment,
                totalSum: totalPrice,
                cashback: userId ? totalCashback : 0,
                useBonus: checked
            };

            let res;
            if (userId) {
                res = await dispatch(orderActions.createOrderAuth({ userId, order }));
            } else {
                res = await dispatch(orderActions.createOrder({ productsInBasket: basketToUse, order}));
      
                if (res.meta.requestStatus === 'fulfilled') {
                    localStorage.setItem('basket', JSON.stringify({}));
                    handleUpdateBasket({});
                }
            }

            // Перевірка, чи замовлення створено успішно
            if (res.meta.requestStatus === 'fulfilled') {
                window.location.href = res.payload.invoice.pageUrl;
            } else {
                throw new Error('Не вдалося створити замовлення');
            }

        } catch (error) {
            console.error('Помилка при створенні замовлення:', error);
        }
    }, [dispatch, userId, post, payment, totalPrice, selectedCity, selectedWarehouse, selectedRegion, checked, totalCashback, basketToUse]);



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
                label: warehouse.Description,
                index: warehouse.WarehouseIndex,
                number: warehouse.Number
            }));
            setWarehouses(warehouses);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    }

    const handleWarehouseChange = (selectedOption) => {
        setSelectedWarehouse(selectedOption);
    };
    const handleRegionChange = (selectedOption) => {
        setSelectedRegion(selectedOption);
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


    return (
        <Container className='checkout'>
            <Typography variant="h5" className='title'>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</Typography>
            <Form onSubmit={handleSubmit(handleCreateOrder)} control={control}>
                <Box className='checkout__main'>
                    <Box className='checkout__first'>
                        <Card variant="plain">
                            <Typography className='checkout__title'>
                                ВАШІ ДАНІ
                            </Typography>
                            <Divider inset="none" />
                            <CardContent className="checkout__info">
                                <FormControl required className="checkout__form" error={errors.firstName ? true : false}>
                                    <FormLabel >Ім'я</FormLabel>
                                    <Input {...register('firstName', { required: "Обов'язкове поле" })} />
                                    {errors.firstName &&
                                        <FormHelperText >
                                            <InfoOutlined sx={{ mr: 1 }} />
                                            {errors.firstName.message}
                                        </FormHelperText>
                                    }
                                </FormControl>
                                <FormControl required className="checkout__form" error={errors.lastName ? true : false}>
                                    <FormLabel>Прізвище</FormLabel>
                                    <Input {...register('lastName', { required: "Обов'язкове поле" })} />
                                    {errors.lastName &&
                                        <FormHelperText >
                                            <InfoOutlined sx={{ mr: 1 }} />
                                            {errors.lastName.message}
                                        </FormHelperText>
                                    }
                                </FormControl>

                                <FormControl required className="checkout__form" error={errors.phoneNumber ? true : false}>
                                    <FormLabel >Номер телефону</FormLabel>
                                    <Input startDecorator={<Typography>+38</Typography>}
                                        {...register('phoneNumber', {
                                            required: "Обов'язкове поле",
                                            validate: {
                                                length: value => value.length === 10 || 'Номер телефону має містити 10 символів'
                                            }
                                        })}
                                    />
                                    {errors.phoneNumber &&
                                        <FormHelperText >
                                            <InfoOutlined sx={{ mr: 1 }} />
                                            {errors.phoneNumber.message}
                                        </FormHelperText>
                                    }
                                </FormControl>
                                <FormControl className="checkout__form">
                                    <FormLabel>Ваш нік в Instagram</FormLabel>
                                    <Input startDecorator={<AlternateEmailRoundedIcon />}  {...register('instagram')} />
                                </FormControl>
                                <FormControl required sx={{ gridColumn: '1/-1' }} error={errors.email ? true : false}>
                                    <FormLabel>E-mail адреса</FormLabel>
                                    <Input startDecorator={<EmailRoundedIcon />} {...register('email', { required: "Обов'язкове поле" })} />
                                    {errors.email &&
                                        <FormHelperText >
                                            <InfoOutlined sx={{ mr: 1 }} />
                                            {errors.email.message}
                                        </FormHelperText>
                                    }
                                </FormControl>
                            </CardContent>

                            <Typography className='checkout__title' >
                                АДРЕСА ДОСТАВКИ
                            </Typography>
                            <Divider inset="none" />
                            <FormControl required>
                                <RadioGroup defaultValue='Нова пошта' name="radio-buttons-group">
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={5} >
                                        <Stack direction="row" spacing={2} className='checkout__post'>
                                            <Radio
                                                checked={post === 'Нова пошта'}
                                                onChange={handleChangePost}
                                                value='Нова пошта'
                                                color="neutral" />
                                            <img src={novapost} alt='novapost' />
                                        </Stack>
                                        <Stack direction="row" spacing={2} className='checkout__post'>
                                            <Radio
                                                checked={post === 'Укр пошта'}
                                                onChange={handleChangePost}
                                                value='Укр пошта'
                                                color="neutral" />
                                            <img src={ukrpost} alt='ukrpost' />
                                        </Stack>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            {
                                post === 'Нова пошта' &&
                                <>
                                    <FormControl required error={errors.city ? true : false}>
                                        <FormLabel>Місто / Село </FormLabel>
                                        <Controller
                                            name="city"
                                            control={control}
                                            rules={{ required: "Обов'язкове поле" }}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                <Select2
                                                    inputRef={ref}
                                                    value={value}
                                                    onChange={option => {
                                                        onChange(option);
                                                        handleCityChange(option);
                                                    }}
                                                    onBlur={onBlur}
                                                    options={options}
                                                    inputValue={searchString}
                                                    onInputChange={handleInputChange}
                                                    placeholder="Введіть назву міста"
                                                    noOptionsMessage={() => "Нічого не знайдено"}
                                                />
                                            )}
                                        />
                                        {errors.city && (
                                            <FormHelperText>
                                                <InfoOutlined sx={{ mr: 1 }} />
                                                {errors.city.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <FormControl required error={errors.warehouse ? true : false}>
                                        <FormLabel>Відділення / Поштомат</FormLabel>
                                        <Controller
                                            name="warehouse"
                                            control={control}
                                            rules={{ required: "Обов'язкове поле" }}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                <Select2
                                                    inputRef={ref}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    onChange={option => {
                                                        onChange(option);
                                                        handleWarehouseChange(option);
                                                    }}
                                                    options={warehouses}
                                                    placeholder="Виберіть відділення"
                                                    noOptionsMessage={() => "Нічого не знайдено"}
                                                />
                                            )}
                                        />
                                        {errors.warehouse && (
                                            <FormHelperText>
                                                <InfoOutlined sx={{ mr: 1 }} />
                                                {errors.warehouse.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </>
                            }
                            {post === 'Укр пошта' &&
                                <>
                                    <FormControl required className="checkout__form" error={errors.cityUKR ? true : false}>
                                        <FormLabel>Місто / Село</FormLabel>
                                        <Input {...register('cityUKR', { required: "Обов'язкове поле" })} placeholder="Введіть назву населеного пункту" />
                                        {errors.cityUKR && (
                                            <FormHelperText>
                                                <InfoOutlined sx={{ mr: 1 }} />
                                                {errors.cityUKR.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl required error={errors.region ? true : false}>
                                        <FormLabel>Область / округ</FormLabel>
                                        <Controller
                                            name="region"
                                            control={control}
                                            rules={{ required: "Обов'язкове поле" }}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                <Select2
                                                    inputRef={ref}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    onChange={option => {
                                                        onChange(option);
                                                        handleRegionChange(option);
                                                    }}
                                                    options={regions}
                                                    placeholder="Виберіть область / округ"
                                                    noOptionsMessage={() => "Нічого не знайдено"}
                                                />
                                            )}
                                        />
                                        {errors.region && (
                                            <FormHelperText>
                                                <InfoOutlined sx={{ mr: 1 }} />
                                                {errors.region.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl required className="checkout__form" error={errors.index ? true : false}>
                                        <FormLabel>Поштовий індекс</FormLabel>
                                        <Input {...register('index', { required: "Обов'язкове поле" })}
                                            placeholder="Введіть індекс" />
                                        {errors.index && (
                                            <FormHelperText>
                                                <InfoOutlined sx={{ mr: 1 }} />
                                                {errors.index.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </>
                            }

                            <Typography className='checkout__title'>
                                ОПЛАТА
                            </Typography>
                            <Divider inset="none" />
                            <FormControl>
                                <RadioGroup defaultValue='Передоплата' name="radio-buttons-group2">
                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                                                <Radio value='Передоплата' color="neutral" onChange={handleChangePayment} />
                                                <Typography>Повна оплата на сайті</Typography>
                                                {/* <img src={visa} style={{ height: "10px" }} />
                                                <img src={mc} style={{ height: "10px" }} /> */}
                                            </Stack>
                                            <img src={platamono} alt='platamono' style={{ height: "15px" }} />
                                        </Stack>

                                        {post === 'Нова пошта' &&
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
                                                    <Radio value="Накладений платіж" color="neutral" onChange={handleChangePayment} />
                                                    <Typography sx={{ maxWidth: "70%" }}>Накладений платіж по передоплаті 200 грн. (тільки Нова пошта)</Typography>
                                                </Stack>
                                                <Tooltip
                                                    placement="right"
                                                    arrow
                                                    variant="outlined"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClick}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener={false}
                                                    title={
                                                        <Typography sx={{ maxWidth: 250, p: 1 }}>
                                                            <b>УВАГА!</b> Враховуйте, що замовляючи цим способом оплати, при отриманні
                                                            Вам потрібно буде сплатити комісію за послуги НП: 20 грн + 2% від суми замовлення.
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
                            <CardContent>
                                {!userId &&
                                    <Alert sx={{ mt: 1 }}
                                        variant="soft"
                                        color="success"
                                    // startDecorator={<img src={emoji} alt='emoji' loading="lazy" style={{ height: "20px" }} />}
                                    >
                                        <Link className='link' to='/auth#logIn' >
                                            <Button size="sm" variant="outlined" color="success" type='submit' className='authpage__button'>Авторизуйся</Button>
                                        </Link>
                                        <Typography className="product-in-basket__card-name">
                                            та отримуй КЕШБЕК на це замовлення!
                                        </Typography>
                                    </Alert>
                                }
                                {
                                    basketToUse.length > 0 ? (
                                        <Container className='checkout__orderContent'>
                                            <Box className='checkout__orderContent__products'>
                                                <Stack direction="column" spacing={2} alignItems="center">
                                                    {basketToUse.map(productInBasket => (
                                                        <ProductInBasket key={userId ? productInBasket._id : productInBasket.id} productInBasket={productInBasket} onUpdateBasket={handleUpdateBasket} />
                                                    ))}
                                                </Stack>
                                            </Box>
                                            <Stack direction="column" className='checkout__orderContent__order' >
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography className="basket__price">Разом :</Typography>
                                                    <Typography className="basket__price">{totalPrice} грн.</Typography>
                                                </Stack>
                                                {userId &&
                                                    <>
                                                        <Chip className="basket__cashback" size="sm" variant="soft" color="success" sx={{ mt: 1 }}>
                                                            Кешбек з покупки : {totalCashback} грн.
                                                        </Chip>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: "20px" }} spacing={2}>
                                                            <Checkbox label="Оплатити за допомогою бонусів" color="success" variant="soft" checked={checked} onChange={handleCheckboxChange} />
                                                            <Tooltip
                                                                placement="right"
                                                                arrow
                                                                variant="outlined"
                                                                open={open2}
                                                                onClose={handleClose2}
                                                                onClick={handleClick2}
                                                                disableFocusListener
                                                                disableHoverListener
                                                                disableTouchListener={false}
                                                                title={
                                                                    <Typography sx={{
                                                                        maxWidth: 250,
                                                                        p: 1,
                                                                    }}>
                                                                        З вашого бонусого рахунку буде списано {user.bonus} грн.
                                                                    </Typography>

                                                                }>
                                                                <InfoOutlinedIcon />
                                                            </Tooltip>
                                                        </Stack>
                                                    </>
                                                }
                                                <Button loading={loadingOrder} type='submit' variant="solid" color="neutral" className="mainbutton" endDecorator={<DoneRoundedIcon />}>
                                                    ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
                                                </Button>
                                                <Typography sx={{
                                                    padding: "10px 20px",
                                                    color: "grey",
                                                    fontSize: "14px",
                                                    textAlign: "center"
                                                }}>
                                                    Ми не телефонуємо для підтвердження. Оплачуючи замовлення, Ви автоматично підтверджуєте його.
                                                </Typography>
                                            </Stack>
                                        </Container>
                                    ) : (
                                        <Container sx={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <LocalMallOutlined sx={{ fontSize: "95px", color: "rgba(0, 0, 0, 0.1)" }} />
                                            <Typography variant="h5" sx={{ fontSize: "28px" }}>Ваш кошик порожній.</Typography>
                                            <Button2 variant="outlined" size="large" className='white-button'>
                                                <Link to="/shop" className='link'>КАТАЛОГ</Link>
                                            </Button2>
                                        </Container>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Box>
                </Box >
            </Form >
        </Container >
    );
};

export { CheckoutPage };