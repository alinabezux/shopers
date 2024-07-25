import * as React from 'react';
import { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Link,
    Input,
    Modal,
    ModalDialog,
    ModalClose,
    Select,
    Option,
    Table,
    Sheet,
    Checkbox,
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
} from '@mui/icons-material';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const rows = [
    {
        id: 'INV-1234',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'O',
            name: 'Olivia Ryhe',
            email: 'olivia@email.com',
        },
    },
    {
        id: 'INV-1233',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'S',
            name: 'Steve Hampton',
            email: 'steve.hamp@email.com',
        },
    },
    //... (залиште решту об'єктів з масиву rows без змін)
];

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

export default function OrderTable() {
    const [order, setOrder] = useState('desc');
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="paid">Paid</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Category</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="refund">Refund</Option>
                    <Option value="purchase">Purchase</Option>
                    <Option value="debit">Debit</Option>
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Customer</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="olivia">Olivia Rhye</Option>
                    <Option value="steve">Steve Hampton</Option>
                    <Option value="ciaran">Ciaran Murray</Option>
                    <Option value="marina">Marina Macdonald</Option>
                    <Option value="charles">Charles Fulton</Option>
                    <Option value="jay">Jay Hoper</Option>
                </Select>
            </FormControl>
        </React.Fragment>
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

            <Sheet
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
            </Sheet>
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
                    <FormLabel>Search for order</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
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
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={selected.length === rows.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked ? rows.map((row) => row.id) : [],
                                        );
                                    }}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                />
                            </th>
                            <th style={{ width: 120, padding: '12px 6px' }}>
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
                                        },
                                    }}
                                >
                                №
                                </Link>
                            </th>
                            <th style={{ width: 100, padding: '12px 6px' }}>Дата</th>
                            <th style={{ width: 240, padding: '12px 6px' }}>Замовлення</th>
                            <th style={{ width: 240, padding: '12px 6px' }}>Дані покупця</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>Спосіб оплати</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>Статус оплати</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>Пошта</th>
                            {/* <th style={{ width: 140, padding: '12px 6px' }}> </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {stableSort(rows, getComparator(order, 'id')).map((row) => (
                            <tr key={row.id}>
                                <td style={{ textAlign: 'center' }}>
                                    <Checkbox
                                        size="sm"
                                        checked={selected.includes(row.id)}
                                        onChange={(event) => {
                                            setSelected(
                                                event.target.checked
                                                    ? [...selected, row.id]
                                                    : selected.filter((id) => id !== row.id),
                                            );
                                        }}
                                        sx={{ verticalAlign: 'text-bottom' }}
                                        color={selected.includes(row.id) ? 'primary' : undefined}
                                    />
                                </td>
                                <td>
                                    <Typography
                                        fontWeight="lg"
                                        textColor="text.primary"
                                        textDecoration="none"
                                        component="a"
                                        href="#"
                                        sx={{ display: 'block' }}
                                    >
                                        {row.id}
                                    </Typography>
                                    <Typography level="body2" textColor="text.secondary">
                                        Order ID: {row.id}
                                    </Typography>
                                </td>
                                <td>{row.date}</td>
                                <td>
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        color={
                                            row.status === 'Paid'
                                                ? 'success'
                                                : row.status === 'Refunded'
                                                    ? 'danger'
                                                    : 'neutral'
                                        }
                                        startDecorator={
                                            row.status === 'Paid' ? <CheckRoundedIcon /> : null
                                        }
                                    >
                                        {row.status}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Avatar size="sm">{row.customer.initial}</Avatar>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography fontWeight="lg" level="body3">
                                                {row.customer.name}
                                            </Typography>
                                            <Typography level="body2">{row.customer.email}</Typography>
                                        </Box>
                                    </Box>
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
