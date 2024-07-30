import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormLabel,
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

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';
import { orderActions } from '../../redux';



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
    const action = useRef(null);

    const userId = useUser();
    const dispatch = useDispatch();
    const { orders, selectedOrder, currentPageOrders, totalPagesOrders } = useSelector(state => state.orderReducer);

    useEffect(() => {
        dispatch(orderActions.getAllOrders({ page: 1, isGettingAll: false }));
    }, [dispatch]);



    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Спосіб оплати</FormLabel>
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
            <FormControl size="sm">
                <FormLabel>Пошта</FormLabel>
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
                    <Option color="warning" value="Укр пошта">Укр пошта</Option>
                    <Option color="danger" value="Нова пошта">Нова пошта</Option>
                </Select>
            </FormControl>
        </React.Fragment >
    );



    const filteredOrders = orders.filter(order =>
        (selectedPost ? order.shipping === selectedPost : true) &&
        (selectedPayment ? order.paymentMethod === selectedPayment : true)
    );

    return (
        <React.Fragment>
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
                <Button
                    color="primary"
                    startDecorator={<DownloadRoundedIcon />}
                    size="sm"
                >
                    Завантажити PDF
                </Button>
            </Box>

            {/* <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    my: 1,
                    gap: 1,
                }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet> */}

            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Пошук за замовленням</FormLabel>
                    <Input size="sm" placeholder="Пошук" startDecorator={<SearchIcon />} />
                </FormControl>
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{ '--Table-headerUnderlineThickness': '1px' }}
                >
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
                                <td>{order.orderItems.map((item, index) => (
                                    <li key={index}>{item}</li>))}
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
                </Table>
            </Sheet>
            <Box
                className="Pagination"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    minWidth: { xs: '200px', md: '600px' },
                    marginInline: 'auto',
                }}
            >
                <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                >
                    Previous
                </Button>
                <Divider orientation="vertical" />
                <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}

export { OrderTable }
