
import React, { useCallback, useEffect } from 'react';
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
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { CreateTypeModal, DeleteTypeModal, EditTypeModal } from './AdminModals/TypeModals';

const TypesTable = () => {
    const dispatch = useDispatch();
    const { types } = useSelector(state => state.typeReducer);

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        dispatch(typeActions.getAll())
    }, [dispatch])

    const handleEditType = useCallback((type) => {
        dispatch(typeActions.setSelectedType(type));
        setOpenEdit(true);
    }, [dispatch]);

    const handleDeleteType = useCallback(async (type) => {
        dispatch(typeActions.setSelectedType(type));
        setOpenDelete(true)
    }, [dispatch]);

    return (
        <Box>
            <CreateTypeModal open={openCreate} setOpenCreate={setOpenCreate} />
            <EditTypeModal openEdit={openEdit} setOpenEdit={setOpenEdit} />
            <DeleteTypeModal openDelete={openDelete} setOpenDelete={setOpenDelete} />
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
                    onClick={() => setOpenCreate(true)}
                >
                    Додати тип
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "column", mt: 4, gap: 2, }}>
                {types.map((type) =>
                    <Card
                        key={type._id}
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
                                <Button onClick={() => handleEditType(type)} size="sm" variant="soft" color="neutral" startDecorator={<EditRoundedIcon />}>
                                    Редагувати
                                </Button>
                                <Button onClick={() => handleDeleteType(type)} size="sm" variant="plain" color="danger" startDecorator={<DeleteOutlineRoundedIcon />}>
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

export { TypesTable }
