import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

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

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.article.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', my: 3 }}
            >
                <Table
                    aria-label="basic table"
                    stickyHeader
                    sx={{ '--Table-headerUnderlineThickness': '1px', }}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Артикул</th>
                            <th style={{ width: '25%' }}>Фото</th>
                            <th style={{ width: '20%' }}>Назва</th>
                            <th style={{ width: '15%' }}>Категорія/Тип</th>
                            <th style={{ width: '10%' }}>Ціна</th>
                            <th style={{ width: '5%' }}>К-сть</th>
                            <th style={{ width: '30%' }}>Характеристики</th>
                            <th style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...filteredProducts].reverse().map(product =>
                            <tr key={product._id}>
                                <td><h5>{product.article}</h5></td>
                                <td>
                                    <Box className="gallery-container">
                                        {product.images.slice(0, 2).map((image, index) => (
                                            <Box key={index} className="image-wrapper" >
                                                <img src={image} alt={`img-${index}`} className="image" />
                                            </Box>
                                        ))}
                                        {product.images.length > 2 && (
                                            <Button className="more-images" style={{ backgroundImage: `url(${product.images[2]})` }} onClick={() => handleOpenImages(product)}>
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
                                        fontWeight="lg">
                                        <Link className="link" to={`/product/${(toUrlFriendly(product.name))}`} key={product._id} >{product.name}</Link>
                                    </Link2>
                                </td>
                                <td>
                                    <Stack direction="column" spacing={1}>
                                        {categories.find(item => item._id === product._category) ? (
                                            <Chip color='primary'>
                                                {(categories.find(item => item._id === product._category)).name}
                                            </Chip>
                                        ) : (
                                            <Chip color='danger'>Невідома категорія</Chip>
                                        )}
                                        {types.find(item => item._id === product._type) ? (
                                            <Chip>
                                                {(types.find(item => item._id === product._type))?.name}
                                            </Chip>
                                        ) : (
                                            <Chip color='danger'>Невідомий тип</Chip>
                                        )}
                                    </Stack>

                                </td>
                                <td>
                                    {product.discount > 0 ? (
                                        <Stack direction="column" spacing={1}>
                                            <Chip variant="solid"  color="danger" size='sm'>
                                                - {product.discount} %
                                            </Chip>
                                            <p style={{ fontSize: '18px', color: '#7c1313' }}>{product.price - product.price / 100 * product.discount} грн.</p>
                                            <p style={{ fontSize: '14px', textDecoration: "line-through" }}>{product.price} грн.</p>
                                        </Stack>
                                    ) : (
                                        <p style={{ fontSize: '18px' }}> {product.price} грн.</p>
                                    )}
                                </td>

                                <td>
                                    <Chip color={product.quantity < 10 ? 'danger' : 'success'}>{product.quantity}</Chip>
                                </td>
                                <td>
                                    <Box>
                                        <Typography><b>Колір: </b>{product?.info?.color}</Typography>
                                        <Typography><b>Розмір: </b>{product?.info?.size}</Typography>
                                        <Typography><b>Матеріал: </b>{product?.info?.material}</Typography>
                                        <Typography><b>Опис: </b>{product?.info?.description}</Typography>
                                    </Box>
                                </td>
                                <td><RowMenu product={product} /></td>
                            </tr>
                        )}
                    </tbody>
                </Table >
            </Sheet >
        </Box >

    );
}
export { ProductsTable };