import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Chip,
    Divider,
    FormControl,
    Link,
    Input,
    Select,
    Option,
    Table,
    Sheet,
    IconButton,
    Typography,
    Menu,
    MenuButton,
    MenuItem,
    Dropdown,
    Stack,
} from '@mui/joy';

import {
    FilterAlt as FilterAltIcon,
    Search as SearchIcon,
    ArrowDropDown as ArrowDropDownIcon,
    CheckRounded as CheckRoundedIcon,
    Block as BlockIcon,
    AutorenewRounded as AutorenewRoundedIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    MoreHorizRounded as MoreHorizRoundedIcon,
    CloseRounded,
} from '@mui/icons-material';

import { orderActions } from '../../redux';
import { Pagination } from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Move</MenuItem>
                <Divider />
                <MenuItem color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}

const OrderTable = () => {
    const [order, setOrder] = useState('desc');
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const action = useRef(null);

    const dispatch = useDispatch();
    const { orders, selectedOrder, currentPageOrders, totalPagesOrders, count } = useSelector(state => state.orderReducer);

    useEffect(() => {
        dispatch(orderActions.getAllOrders({ page: currentPageOrders }));
    }, [dispatch, currentPageOrders]);

    const handleSetCurrentPageOrders = async (event, value) => {
        dispatch(orderActions.setCurrentPageOrders(value));
    }


    const filteredOrders = orders.filter(order =>
        (selectedPost ? order.shipping === selectedPost : true) &&
        (selectedPayment ? order.paymentMethod === selectedPayment : true) &&
        (
            order.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="h2" component="h1">
                    Замовлення
                </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
                <FormControl sx={{ width: "50%" }} size="sm">
                    <Input
                        placeholder="Пошук за ID замовлення або ПІБ отримувача"
                        startDecorator={<SearchIcon />}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)} />
                </FormControl>
                <FormControl size="sm" sx={{ width: "25%" }}>
                    <Select
                        placeholder="Спосіб оплати"
                        action={action}
                        value={selectedPayment}
                        onChange={(e, newValue) => setSelectedPayment(newValue)}
                        {...(selectedPayment && {
                            endDecorator: (
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        setSelectedPayment(null);
                                        action.current?.focusVisible();
                                    }}
                                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                                ><CloseRounded />
                                </IconButton>
                            ),
                            indicator: null,
                        })}
                    >
                        <Option value="Передоплата">Передоплата</Option>
                        <Option value="Наложка">Наложка</Option>

                    </Select>
                </FormControl>

                <FormControl size="sm" sx={{ width: "25%" }}>
                    <Select
                        placeholder="Пошта"
                        action={action}
                        value={selectedPost}
                        onChange={(e, newValue) => setSelectedPost(newValue)}
                        {...(selectedPost && {
                            endDecorator: (
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        setSelectedPost(null);
                                        action.current?.focusVisible();
                                    }}
                                >
                                    <CloseRounded />
                                </IconButton>
                            ),
                            indicator: null,
                        })}
                    >
                        <Option value="Укр пошта">Укр пошта</Option>
                        <Option value="Нова пошта">Нова пошта</Option>
                    </Select>
                </FormControl>
            </Stack >
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    width: '100%',
                    borderRadius: 'sm',
                    boxShadow: 'sm',
                    my: 3
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{ '--Table-headerUnderlineThickness': '1px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: 80, padding: "12px " }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        }
                                    }}
                                >
                                    № / Дата
                                </Link>
                            </th>
                            <th style={{ width: 250, padding: '12px 6px' }}>Замовлення</th>
                            <th style={{ width: 300, padding: '12px 6px' }}>Дані покупця</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>Спосіб оплати</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>Статус оплати</th>
                            <th style={{ width: 30, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stableSort(filteredOrders, getComparator(order, 'createdAt')).map((order) => (
                            <tr key={order.orderID}>
                                <td>
                                    <Typography
                                        fontWeight="lg"
                                        textColor="text.primary"
                                        textDecoration="none"
                                        component="a"
                                        href="#"
                                        sx={{ display: 'block', padding: "12px" }}
                                    >
                                        {order.orderID}
                                    </Typography>
                                    <Typography
                                        fontWeight="lg"
                                        textColor="text.primary"
                                        textDecoration="none"
                                        component="a"
                                        sx={{ display: 'block', padding: "12px" }}
                                    >
                                        {order.createdAt.split('T')[0].split('-').reverse().join('.')}
                                    </Typography>

                                </td>
                                <td>
                                    {/* {order?.orderItems.map((item, index) => (
                                        <li key={index}>{item.name}</li>))} */}
                                    <Divider sx={{ my: 2 }} />
                                    <Typography level="body2">Сума: {order.totalSum} грн.</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography fontWeight="lg" level="body3">
                                            ПІБ :   {order.firstName} {order.lastName}
                                        </Typography>
                                        <Typography level="body2">тел.: {order.phoneNumber}</Typography>

                                        {order.city ?
                                            <>
                                                <Typography>{order.city.description}</Typography>
                                                <Typography>{order.warehouse.description}</Typography>
                                            </>
                                            :
                                            <>
                                                <Typography>{order.cityUKR}</Typography>
                                                <Typography>{order.index}</Typography>
                                                <Typography>{order.region.label}</Typography>
                                            </>
                                        }

                                        <Typography level="body2">{order.email}</Typography>
                                        <Chip size="sm"
                                            variant="solid"
                                            color={
                                                order.shipping === 'Нова пошта' ? 'danger'
                                                    : order.shipping === 'Укр пошта'
                                                        ? 'warning'
                                                        : 'neutral'
                                            }>{order.shipping}</Chip>
                                    </Box>
                                </td>

                                <td>{order.paymentMethod}</td>
                                <td>
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        color={
                                            order.status === 'Paid'
                                                ? 'success'
                                                : order.status === 'Refunded'
                                                    ? 'danger'
                                                    : 'neutral'
                                        }
                                        startDecorator={
                                            order.status === 'Paid' ? <CheckRoundedIcon /> : null
                                        }
                                    >
                                        {order.status}
                                    </Chip>
                                </td>

                                <td style={{ textAlign: 'right' }}>
                                    <RowMenu />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Pagination count={totalPagesOrders || 0} color="primary" onChange={handleSetCurrentPageOrders} />
                                </Box>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Sheet>

        </Box>
    );
}

export { OrderTable }
