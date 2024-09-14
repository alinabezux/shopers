import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";

import { orderActions } from '../../redux';

import {
    Box,
    Chip,
    Divider,
    FormControl,
    Input,
    Select,
    Option,
    Table,
    Sheet,
    IconButton,
    Typography,
    Stack,
    Modal,
    ModalDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Card,
    Tooltip,
} from '@mui/joy';
import {
    Search as SearchIcon,
    ArrowDropDown as ArrowDropDownIcon,
    CheckRounded as CheckRoundedIcon,
    CloseRounded,
    WarningRounded,
    DeleteOutlineRounded,
} from '@mui/icons-material';
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


const OrderTable = () => {
    const [order, setOrder] = useState('desc');
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDelete, setOpenDelete] = useState(false);

    const action = useRef(null);

    const dispatch = useDispatch();
    const { orders, selectedOrder, currentPageOrders, totalPagesOrders, loadingOrder } = useSelector(state => state.orderReducer);

    useEffect(() => {
        dispatch(orderActions.getAllOrders({ page: currentPageOrders }));
    }, [dispatch, currentPageOrders]);

    useEffect(() => {
        const socket = io('https://shopersvi-d6c7c2418328.herokuapp.com');

        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.on('update', (change) => {
            dispatch(orderActions.updateOrderStatus({
                orderId: change.documentKey._id,
                paymentStatus: change.updateDescription.updatedFields.paymentStatus
            }));
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);



    const handleSetCurrentPageOrders = (event, value) => {
        dispatch(orderActions.setCurrentPageOrders(value));
    }

    const handleDelete = useCallback(async (order) => {
        await dispatch(orderActions.setSelectedOrder(order))
        setOpenDelete(true)
    }, [dispatch]);

    const handleDeleteOrder = useCallback(async () => {
        if (selectedOrder) {
            await dispatch(orderActions.deleteById(selectedOrder._id));
            setOpenDelete(false);
        }
    }, [dispatch, selectedOrder, setOpenDelete]);

    const filteredOrders = orders.filter(order =>
        (selectedPost ? order.shipping === selectedPost : true) &&
        (selectedPayment ? order.paymentMethod === selectedPayment : true) &&
        (
            (order.orderID && order.orderID.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (order.firstName && order.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (order.lastName && order.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    );


    return (
        <Box>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <ModalDialog variant="outlined" role="alertdialog" >
                    <DialogTitle>
                        <WarningRounded />
                        Підтвердження
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Ви впевнені, що хочете видалити це замовлення?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={handleDeleteOrder} loading={loadingOrder ? true : false}>
                            Видалити
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
                            Скасувати
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
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
                        <Option value="Накладений платіж">Накладений платіж</Option>

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
                                <Typography
                                    color="primary"
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
                                </Typography>
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
                            <tr key={order.orderID} >
                                <td>
                                    <Typography
                                        fontWeight="lg"
                                        textColor="text.primary"
                                        textDecoration="none"
                                        sx={{ display: 'block', padding: "12px" }}
                                    >
                                        {order.orderID}
                                    </Typography>
                                    <Typography
                                        fontWeight="lg"
                                        sx={{ display: 'block', padding: "12px" }}
                                    >
                                        {order.createdAt.split('T')[0].split('-').reverse().join('.')}
                                    </Typography>

                                </td>
                                <td>
                                    {order?.orderItems.map((item, index) => (
                                        <Card key={item._productId} variant="soft" orientation="horizontal" sx={{ margin: "10px 0" }}>
                                            <div>
                                                <Typography level="title-sm">{item.article}</Typography>
                                                <Typography level="title-md">{item.name} - {item.quantity} шт.</Typography>
                                                <Typography level="body-sm">колір: {item?.info?.color}</Typography>
                                                <Typography level="body-sm">розмір: {item?.info?.size}</Typography>
                                                <Typography level="title-sm">{item.price} грн.</Typography>
                                            </div>
                                        </Card>
                                    ))}
                                    <Divider sx={{ my: 2 }} />
                                    <Typography level="title-sm">Сума: {order.totalSum} грн.</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography level="body2">{order.email}</Typography>
                                        {order.instagram && <Typography level="body2">Inst: {order.instagram}</Typography>}
                                        <Typography fontWeight="lg" level="body3">
                                            {order.firstName} {order.lastName}
                                        </Typography>
                                        <Typography level="body2">{order.phoneNumber}</Typography>

                                        {order.city ?
                                            <>
                                                <Typography>{order.city.description}, №{order.warehouse.number}</Typography>
                                                <Typography>{order.warehouse.description}</Typography>
                                            </>
                                            :
                                            <>
                                                <Typography>{order.cityUKR}</Typography>
                                                <Typography>{order.index}</Typography>
                                                <Typography>{order.region.label}</Typography>
                                            </>
                                        }

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

                                <td>{order.paymentMethod}
                                    {order.paymentMethod === 'Накладений платіж' &&
                                        <Typography level="title-sm">{order.totalSum - 100} грн.</Typography>
                                    }</td>
                                <td>
                                    <Tooltip title={order.invoiceId} variant="soft">
                                        <Chip
                                            size="sm"
                                            variant="soft"
                                            color={order.paymentStatus === 'created' ? 'primary'
                                                : order.paymentStatus === 'success' ? 'success'
                                                    : order.paymentStatus === 'failure' ? 'danger'
                                                        : 'neutral'
                                            }
                                            startDecorator={
                                                order.paymentStatus === 'success' ? <CheckRoundedIcon /> : null
                                            }
                                        >
                                            {order.paymentStatus}
                                        </Chip>
                                    </Tooltip>
                                </td>

                                <td style={{ textAlign: 'right' }}>
                                    <IconButton onClick={() => handleDelete(order)}>
                                        <DeleteOutlineRounded />
                                    </IconButton>
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
