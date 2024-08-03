
import React, { useCallback, useEffect, useState } from 'react';
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
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, productActions, typeActions } from '../../redux';
import Table from '@mui/joy/Table';
import { MoreHorizRounded } from '@mui/icons-material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { AddPhotoProductModal, CreateProductModal, DeleteProductModal, EditProductModal, ImagesModal } from './AdminModals/ProductModals';
import { Link } from 'react-router-dom'
import { toUrlFriendly } from '../../utils';
import { ButtonGroupButtonContext } from '@mui/material';

const ProductsTable = () => {

    const dispatch = useDispatch();

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddPhoto, setOpenAddPhoto] = useState(false);
    const [openImages, setOpenImages] = useState(false);

    const { products, error } = useSelector(state => state.productReducer);
    const { selectedCategory, categories } = useSelector(state => state.categoryReducer);
    const { selectedType, types } = useSelector(state => state.typeReducer);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    useEffect(() => {
        dispatch(typeActions.getAll())
    }, [dispatch])

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: selectedCategory._id,
            _type: selectedType._id,
        }))
    }, [dispatch, selectedCategory._id, selectedType._id]);


    const handleDeleteProduct = useCallback(async (product) => {
        dispatch(productActions.setSelectedProduct(product));
        setOpenDelete(true)
    }, [dispatch]);

    const handleEditProduct = useCallback(async (product) => {
        dispatch(productActions.setSelectedProduct(product));
        setOpenEdit(true)
    }, [dispatch]);

    const handleAddPhotoProduct = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
        setOpenAddPhoto(true);
    }, [dispatch]);

    const handleOpenImages = useCallback((product) => {
        dispatch(productActions.setSelectedProduct(product));
        setOpenImages(true);
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
                <Menu size="sm" sx={{ minWidth: 140 }}>
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
        <Box>
            <CreateProductModal openCreate={openCreate} setOpenCreate={setOpenCreate} />
            <EditProductModal openEdit={openEdit} setOpenEdit={setOpenEdit} />
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
            <Sheet
                variant="outlined"
                sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
            >
                <Table aria-label="basic table" stickyHeader sx={{ '--Table-headerUnderlineThickness': '1px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Артикул</th>
                            <th style={{ width: '20%' }}>Фото</th>
                            <th>Назва</th>
                            <th>Категорія/Тип</th>
                            <th style={{ width: '10%' }}>Ціна</th>
                            <th style={{ width: '5%' }}>К-сть</th>
                            <th style={{ width: '30%' }}>Інфо</th>
                            <th style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product._id}>
                                <td>{product.article}</td>
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
                                <td><Link to={`/product/${(toUrlFriendly(product.name))}`} key={product._id}>{product.name}</Link></td>
                                <td>
                                    <Typography>
                                        {(categories.find(item => item._id === product._category)).name}
                                    </Typography>
                                    <Typography>
                                        {(types.find(item => item._id === product._type))?.name}
                                    </Typography>
                                    <Typography>
                                        {product._type}
                                    </Typography>

                                </td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Box>
                                        <Typography>Колір:{product?.info?.color}</Typography>
                                        <Typography>Розмір:{product?.info?.size}</Typography>
                                        <Typography>Матеріал:{product?.info?.material}</Typography>
                                        <Typography>Опис:{product?.info?.description}</Typography>
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