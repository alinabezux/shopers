import { Box, Typography, Sheet, Table, TabPanel } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, orderActions } from '../../redux';
import { useEffect } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Badge from '@mui/joy/Badge';
import generatePagination from '../Pagination';
import Pagination from 'react-bootstrap/Pagination';
import { CircularProgress } from "@mui/material";

const UsersTable = () => {
    const dispatch = useDispatch();
    const { users, currentPageUser, totalPagesUser, countUser } = useSelector(state => state.userReducer);
    const { orders, count, currentPage, totalPages, loading } = useSelector(state => state.orderReducer);

    useEffect(() => {
        dispatch(userActions.getAllUsers({ page: currentPageUser }))
    }, [dispatch, currentPageUser])

    useEffect(() => {
        dispatch(orderActions.getAllOrders({ page: currentPage, limit: 20 }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            dispatch(orderActions.setCurrentPageOrders(1));
        }
    }, [dispatch, currentPage, totalPages]);

    useEffect(() => {
        if (currentPageUser > totalPagesUser) {
            dispatch(userActions.setCurrentPageUsers(1));
        }
    }, [dispatch, currentPageUser, totalPagesUser]);

    const handleChangePage = async (pageNumber) => {
        dispatch(orderActions.setCurrentPageOrders(pageNumber));
    }
    const handleChangePageUser = async (pageNumber) => {
        dispatch(userActions.setCurrentPageUsers(pageNumber));
    }

    const paginationItemsUsers = generatePagination(totalPagesUser, currentPageUser, handleChangePageUser);
    const paginationItemsOrders = generatePagination(totalPages, currentPage, handleChangePage);


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: 'column',
                    alignItems: 'start',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="h2" component="h1">
                    Користувачі
                </Typography>

            </Box>
            <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                <TabList
                    disableUnderline
                    sx={(theme) => ({
                        p: 1,
                        borderRadius: 16,
                        maxWidth: 300,
                        mx: '0',
                        boxShadow: theme.shadow.sm,
                        [`& .${tabClasses.root}`]: {
                            py: 1,
                            px: 3,
                            flex: 1,
                            transition: '0.3s',
                            fontWeight: 'md',
                            fontSize: 'md',
                            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                                opacity: 0.7,
                            },
                        },
                    })}
                >
                    <Badge badgeContent={countUser} max={999} variant="plain" size="sm">
                        <Tab disableIndicator>Зареєстровані</Tab>
                    </Badge>
                    <Badge badgeContent={count} max={999} variant="plain" size="sm">
                        <Tab disableIndicator>Покупці</Tab>
                    </Badge>

                </TabList>
                <TabPanel value={0} sx={{ p: 0 }}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: '100%',
                            borderRadius: 'sm',
                            boxShadow: 'sm',
                            my: 3
                        }}
                    >
                        <Table
                            aria-label="basic table"
                            stickyHeader
                            hoverRow

                            sx={{ '--Table-headerUnderlineThickness': '1px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '3%' }}>

                                    </th>
                                    <th >
                                        <Typography
                                            color="primary"
                                            fontWeight="lg">
                                            Ім'я та Прізвище
                                        </Typography>
                                    </th>
                                    <th >
                                        <Typography
                                            color="primary"
                                            fontWeight="lg"
                                        >Номер телефону
                                        </Typography>
                                    </th>
                                    <th >
                                        <Typography
                                            color="primary"
                                            fontWeight="lg"
                                        >
                                            Email
                                        </Typography></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...users].map((user, index) =>
                                    <tr key={user._id}>
                                        <td>{(currentPageUser - 1) * 20 + index + 1}.</td>
                                        <td style={{ fontSize: "18px" }}> {user.name} {user?.surname}</td>
                                        <td>{user?.phone}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table >
                        <Pagination
                            style={{ display: "flex", justifyContent: "center", margin: '30px' }} size="sm">
                            {paginationItemsUsers}
                        </Pagination>
                    </Sheet>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 0 }}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: '100%',
                            borderRadius: 'sm',
                            boxShadow: 'sm',
                            my: 3
                        }}
                    >
                        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <CircularProgress color="inherit" />
                        </Box> :
                            <Table
                                aria-label="basic table"
                                stickyHeader
                                hoverRow

                                sx={{ '--Table-headerUnderlineThickness': '1px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '3%' }}>

                                        </th>
                                        <th >
                                            <Typography
                                                color="primary"
                                                fontWeight="lg">
                                                Ім'я та Прізвище
                                            </Typography>
                                        </th>
                                        <th >
                                            <Typography
                                                color="primary"
                                                fontWeight="lg"
                                            >Instagram
                                            </Typography>
                                        </th>
                                        <th >
                                            <Typography
                                                color="primary"
                                                fontWeight="lg"
                                            >Номер телефону
                                            </Typography>
                                        </th>
                                        <th >
                                            <Typography
                                                color="primary"
                                                fontWeight="lg"
                                            >
                                                Email
                                            </Typography></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...orders].map((order, index) =>
                                        <tr key={order._id}>
                                            <td>{(currentPage - 1) * 20 + index + 1}.</td>
                                            <td style={{ fontSize: "18px" }}> {order.firstName} {order?.lastName}</td>
                                            <td>{order?.instagram}</td>
                                            <td>{order?.phoneNumber}</td>
                                            <td>{order.email}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table >
                        }

                        <Pagination
                            style={{ display: "flex", justifyContent: "center", margin: '30px' }} size="sm">
                            {paginationItemsOrders}
                        </Pagination>
                    </Sheet>
                </TabPanel>
            </Tabs>
        </Box>
    );
};

export { UsersTable };





