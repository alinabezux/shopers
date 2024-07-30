
import React, { useEffect } from 'react';
import { useState } from 'react';
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
import { categoryActions } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

const CategoriesTable = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categoryReducer);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', boxSizing: "border-box" }}>
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
                >
                    Додати категорію
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "column", mt: 4, gap: 2, width: "100%", boxSizing: "border-box" }}>
                {categories.map((category) =>
                    <Card
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
                                <Button size="sm" variant="soft" color="neutral" startDecorator={<EditRoundedIcon />}>
                                    Редагувати
                                </Button>
                                <Button size="sm" variant="soft" color="success" startDecorator={<AddPhotoAlternateRoundedIcon />}>
                                    Додати фото
                                </Button>
                                <Button size="sm" variant="plain" color="danger" startDecorator={<DeleteOutlineRoundedIcon />}>
                                    Видалити
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box >

    );
}

export { CategoriesTable }