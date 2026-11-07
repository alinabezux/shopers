import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import generatePagination from '../Pagination';

import { toUrlFriendly } from '../../utils';
import { AddDiscountModal, AddPhotoProductModal, CreateProductModal, DeleteProductModal, EditProductModal, ImagesModal } from './AdminModals/ProductModals';
import { categoryActions, productActions, typeActions } from '../../redux';

import {
    Box,
    Button,
    Divider,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Sheet,
    Typography,
    IconButton,
    Chip,
    Stack,
    FormControl,
    Input,
    Select,
    Option,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/joy/Table';
import { CloseRounded, MoreHorizRounded, Search } from '@mui/icons-material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Link2 from '@mui/joy/Link'


const ProductsTable = () => {
    const dispatch = useDispatch();

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDiscount, setOpenDiscount] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddPhoto, setOpenAddPhoto] = useState(false);
    const [openImages, setOpenImages] = useState(false);
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [expandedIds, setExpandedIds] = useState({});
    const itemsPerPage = 10;

    const toggleExpand = useCallback((id) => {
        setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);


    const { products } = useSelector(state => state.productReducer);
    const { categories } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);
    const action = useRef(null);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    useEffect(() => {
        dispatch(typeActions.getAll())
    }, [dispatch])

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: category,
            _type: type,
        }))
    }, [dispatch, category, type]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, category, type]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.article.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const reversedFiltered = [...filteredProducts].reverse();
    const paginatedProducts = reversedFiltered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const paginationItems = generatePagination(totalPages, page, setPage);

    const handleDeleteProduct = useCallback(async (product) => {
        await dispatch(productActions.setSelectedProduct(product));
        setOpenDelete(true)
    }, [dispatch]);

    const handleEditProduct = useCallback(async (product) => {
        await dispatch(productActions.setSelectedProduct(product));
        setOpenEdit(true)
    }, [dispatch]);

    const handleAddDiscountProduct = useCallback(async (product) => {
        await dispatch(productActions.setSelectedProduct(product));
        setOpenDiscount(true)
    }, [dispatch]);

    const handleAddPhotoProduct = useCallback(async (product) => {
        await dispatch(productActions.setSelectedProduct(product));
        setOpenAddPhoto(true);
    }, [dispatch]);

    const handleOpenImages = useCallback(async (product) => {
        await dispatch(productActions.setSelectedProduct(product));
        setOpenImages(true);
    }, [dispatch]);

    const handleShowDetails = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
    }, [dispatch]);



    function RowMenu({ product }) {
        return (
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                >
                    <MoreHorizRounded />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }} placement="left">
                    <MenuItem onClick={() => handleEditProduct(product)}>
                        <ListItemDecorator>
                            <EditRoundedIcon />
                        </ListItemDecorator>{' '}
                        Редагувати
                    </MenuItem>
                    <MenuItem onClick={() => handleAddPhotoProduct(product)}>
                        <ListItemDecorator>
                            <AddPhotoAlternateRoundedIcon />
                        </ListItemDecorator>{' '}
                        Додати фото
                    </MenuItem>
                    <MenuItem onClick={() => handleAddDiscountProduct(product)}>
                        <ListItemDecorator>
                            <LoyaltyIcon />
                        </ListItemDecorator>{' '}
                        Знижки
                    </MenuItem>
                    <Divider />
                    <MenuItem color="danger" onClick={() => handleDeleteProduct(product)}>
                        <ListItemDecorator>
                            <DeleteOutlineRoundedIcon />
                        </ListItemDecorator>{' '}
                        Видалити
                    </MenuItem>
                </Menu>
            </Dropdown>
        );
    }

    return (
        <Box className="productTable">
            <CreateProductModal openCreate={openCreate} setOpenCreate={setOpenCreate} />
            <EditProductModal openEdit={openEdit} setOpenEdit={setOpenEdit} />
            <AddDiscountModal openDiscount={openDiscount} setOpenDiscount={setOpenDiscount} />
            <DeleteProductModal openDelete={openDelete} setOpenDelete={setOpenDelete} />
            <AddPhotoProductModal openAddPhoto={openAddPhoto} setOpenAddPhoto={setOpenAddPhoto} />
            <ImagesModal openImages={openImages} setOpenImages={setOpenImages} />

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
                    Товари
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                    onClick={() => setOpenCreate(true)}
                >
                    Додати товар
                </Button>
            </Box>

            <Stack direction="row" spacing={2}>
                <FormControl sx={{ width: "50%" }} size="sm">
                    <Input
                        placeholder="Пошук за назвою або артикулом"
                        startDecorator={<Search />}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ width: "25%" }} size="sm">
                    <Select
                        placeholder="Категорія"
                        onChange={(event, newValue) => setCategory(newValue)}
                        action={action}
                        value={category}
                        {...(category && {
                            endDecorator: (
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        setCategory(null);
                                        action.current?.focusVisible();
                                    }}
                                >
                                    <CloseRounded />
                                </IconButton>
                            ),
                            indicator: null,
                        })}
                    >
                        {categories.map((category) => (
                            <Option value={category._id} key={category._id}>{category.name}</Option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: "25%" }} size="sm">
                    <Select onChange={(event, newValue) => setType(newValue)}
                        placeholder="Тип"
                        value={type}
                        action={action}
                        {...(type && {
                            endDecorator: (
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        setType(null);
                                        action.current?.focusVisible();
                                    }}
                                >
                                    <CloseRounded />
                                </IconButton>
                            ),
                            indicator: null,
                        })}>
                        {types.map((type) => (
                            <Option value={type._id} key={type._id}>{type.name}</Option>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Sheet
                variant="outlined"
                sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', my: 3, overflowX: 'auto' }}
            >
                <Table
                    aria-label="products table"
                    stickyHeader
                    sx={{
                        '--Table-headerUnderlineThickness': '1px',
                        '& tr > *': { verticalAlign: 'top' },
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: '11%' }}>Артикул</th>
                            <th style={{ width: '13%' }}>Фото</th>
                            <th style={{ width: '18%' }}>Назва</th>
                            <th style={{ width: '13%' }}>Категорія / Тип</th>
                            <th style={{ width: '11%' }}>Ціна</th>
                            <th style={{ width: '6%' }}>К-сть</th>
                            <th style={{ width: '24%' }}>Характеристики</th>
                            <th style={{ width: '4%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: '30px' }}>
                                    <Typography level="body-md" textColor="text.tertiary">
                                        Товарів не знайдено
                                    </Typography>
                                </td>
                            </tr>
                        ) : (
                            paginatedProducts.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <Typography level="title-sm" sx={{ fontFamily: 'monospace' }}>
                                            {product.article}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Box className="gallery-container">
                                            {product.images.slice(0, 2).map((image, index) => (
                                                <Box key={index} className="image-wrapper">
                                                    <img src={image} alt={`img-${index}`} className="image" />
                                                </Box>
                                            ))}
                                            {product.images.length > 2 && (
                                                <Button
                                                    className="more-images"
                                                    style={{ backgroundImage: `url(${product.images[2]})` }}
                                                    onClick={() => handleOpenImages(product)}
                                                >
                                                    <Box className="overlay">+{product.images.length - 2}</Box>
                                                </Button>
                                            )}
                                        </Box>
                                    </td>
                                    <td>
                                        <Link2
                                            underline="none"
                                            color="primary"
                                            component="button"
                                            onClick={() => handleShowDetails(product)}
                                            fontWeight="lg"
                                        >
                                            <Link className="link" to={`/product/${(toUrlFriendly(product.name))}`}>
                                                {product.name}
                                            </Link>
                                        </Link2>
                                    </td>
                                    <td>
                                        <Stack direction="column" spacing={0.5}>
                                            {categories.find(item => item._id === product._category) ? (
                                                <Chip color="primary" size="sm">
                                                    {(categories.find(item => item._id === product._category)).name}
                                                </Chip>
                                            ) : (
                                                <Chip color="danger" size="sm">Невідома категорія</Chip>
                                            )}
                                            {types.find(item => item._id === product._type) ? (
                                                <Chip size="sm" variant="soft">
                                                    {(types.find(item => item._id === product._type))?.name}
                                                </Chip>
                                            ) : (
                                                <Chip color="danger" size="sm">Невідомий тип</Chip>
                                            )}
                                        </Stack>
                                    </td>
                                    <td>
                                        {product.discount > 0 ? (
                                            <Stack direction="column" spacing={0.5}>
                                                <Chip variant="solid" color="danger" size="sm">
                                                    - {product.discount} %
                                                </Chip>
                                                <Typography level="title-md" sx={{ color: '#c92a2a', fontWeight: 'bold' }}>
                                                    {product.price - (product.price / 100) * product.discount} грн.
                                                </Typography>
                                                <Typography level="body-xs" sx={{ textDecoration: 'line-through', color: 'text.tertiary' }}>
                                                    {product.price} грн.
                                                </Typography>
                                            </Stack>
                                        ) : (
                                            <Typography level="title-md">
                                                {product.price} грн.
                                            </Typography>
                                        )}
                                    </td>
                                    <td>
                                        <Chip color={product.quantity < 10 ? 'danger' : 'success'} size="sm">
                                            {product.quantity}
                                        </Chip>
                                    </td>
                                    <td>
                                        <Box className="char-container">
                                            <Box className="char-tags">
                                                {product?.info?.color && (
                                                    <span className="char-tag">
                                                        <b>Колір:</b>&nbsp;{product.info.color}
                                                    </span>
                                                )}
                                                {product?.info?.size && (
                                                    <span className="char-tag">
                                                        <b>Розмір:</b>&nbsp;{product.info.size}
                                                    </span>
                                                )}
                                                {product?.info?.material && (
                                                    <span className="char-tag">
                                                        <b>Матеріал:</b>&nbsp;{product.info.material}
                                                    </span>
                                                )}
                                            </Box>
                                            {product?.info?.description && (
                                                <Box>
                                                    {expandedIds[product._id] ? (
                                                        <Box>
                                                            <Box className="char-desc-full">
                                                                {product.info.description}
                                                            </Box>
                                                            <button
                                                                type="button"
                                                                className="char-expand-btn"
                                                                onClick={() => toggleExpand(product._id)}
                                                            >
                                                                Згорнути ▲
                                                            </button>
                                                        </Box>
                                                    ) : (
                                                        <Box>
                                                            <div className="char-desc-snippet">
                                                                <b>Опис: </b>
                                                                {product.info.description.length > 95
                                                                    ? `${product.info.description.slice(0, 95)}...`
                                                                    : product.info.description}
                                                            </div>
                                                            {product.info.description.length > 95 && (
                                                                <button
                                                                    type="button"
                                                                    className="char-expand-btn"
                                                                    onClick={() => toggleExpand(product._id)}
                                                                >
                                                                    Детальніше (розмірна сітка / опис) ▼
                                                                </button>
                                                            )}
                                                        </Box>
                                                    )}
                                                </Box>
                                            )}
                                        </Box>
                                    </td>
                                    <td>
                                        <RowMenu product={product} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Sheet>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, mt: 1 }}>
                    <Typography level="body-xs" textColor="text.tertiary" sx={{ mb: 1 }}>
                        Сторінка <b>{page}</b> з <b>{totalPages}</b> (Показано {paginatedProducts.length} з {filteredProducts.length} товарів)
                    </Typography>
                    <Pagination size="sm">
                        {paginationItems}
                    </Pagination>
                </Box>
            )}
        </Box>

    );
}
export { ProductsTable };