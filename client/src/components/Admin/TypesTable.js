
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Box,
    Button,
    Typography,

} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import { typeActions } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


const TypesTable = () => {
    const dispatch = useDispatch();
    const { types } = useSelector(state => state.typeReducer);

    useEffect(() => {
        dispatch(typeActions.getAll())
    }, [dispatch])
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
                    Типи товарів
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                >
                    Додати тип
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "column", mt: 4, gap: 2, }}>
                {types.map((type) =>
                    <Card
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                    >
                        <CardContent sx={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Typography id="card-description" level="h3">
                                {type.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 }, width: "30%", }}>
                                <Button size="sm" variant="soft" color="neutral" startDecorator={<EditRoundedIcon />}>
                                    Редагувати
                                </Button>
                                <Button size="sm" variant="plain" color="danger" startDecorator={<DeleteOutlineRoundedIcon />}>
                                    Видалити
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>

    );
}

export {TypesTable}
