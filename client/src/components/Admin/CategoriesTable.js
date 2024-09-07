import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { categoryActions } from '../../redux';
import { AddPhotoCategoryModal, CreateCategoryModal, DeleteCategoryModal, EditCategoryModal } from './AdminModals/CategoryModals';

import {
    Box,
    Button,
    Typography,
} from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddIcon from '@mui/icons-material/Add';


const CategoriesTable = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categoryReducer);

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddPhoto, setOpenAddPhoto] = useState(false);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    const handleEditCategory = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
        setOpenEdit(true);
    }, [dispatch]);

    const handleDeleteCategory = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
        setOpenDelete(true);
    }, [dispatch]);

    const handleDAddPhotoCategory = useCallback((category) => {
        dispatch(categoryActions.setSelectedCategory(category));
        setOpenAddPhoto(true);
    }, [dispatch]);


    return (
        <Box className="categoryTable" sx={{ display: 'flex', flexDirection: 'column', boxSizing: "border-box" }}>
            <CreateCategoryModal openCreate={openCreate} setOpenCreate={setOpenCreate} />
            <EditCategoryModal openEdit={openEdit} setOpenEdit={setOpenEdit} />
            <AddPhotoCategoryModal openAddPhoto={openAddPhoto} setOpenAddPhoto={setOpenAddPhoto} />
            <DeleteCategoryModal openDelete={openDelete} setOpenDelete={setOpenDelete} />
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
                    Категорії товарів
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                    onClick={() => setOpenCreate(true)}
                >
                    Додати категорію
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: "column", mt: 4, gap: 2, width: "100%", boxSizing: "border-box" }}>
                {categories.length > 0 ? categories.map((category) => (
                    <Card
                        key={category._id}
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                    >
                        <AspectRatio ratio="1" sx={{ width: 130 }}>
                            <img
                                src={category.image}
                                alt={category.name}
                            />
                        </AspectRatio>
                        <CardContent sx={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Typography id="card-description" level="h3">
                                {category.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 }, width: "50%", alignItems: "center" }}>
                                <Button
                                    onClick={() => handleEditCategory(category)}
                                    size="sm"
                                    variant="soft"
                                    color="neutral"
                                    startDecorator={<EditRoundedIcon />}>
                                    Редагувати
                                </Button>
                                <Button
                                    onClick={() => handleDAddPhotoCategory(category)}
                                    size="sm"
                                    variant="soft"
                                    color="success"
                                    startDecorator={<AddPhotoAlternateRoundedIcon />}>
                                    Додати фото
                                </Button>
                                <Button
                                    onClick={() => handleDeleteCategory(category)}
                                    size="sm"
                                    variant="plain"
                                    color="danger"
                                    startDecorator={<DeleteOutlineRoundedIcon />}>
                                    Видалити
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )) : (
                    <Typography>Немає категорій для відображення</Typography>
                )}
            </Box>
        </Box >

    );
}

export { CategoriesTable }