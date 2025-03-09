import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Box,
    Button,
    Typography,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { promocodeActions } from '../../redux/slices/promocode.slice';
import { CreatePromocodeModal, DeletePromocodeModal } from './AdminModals/PromocodeModals';


const PromocodeTable = () => {
    const dispatch = useDispatch();
    const { promocodes } = useSelector(state => state.promocodeReducer);

    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        dispatch(promocodeActions.getAll({}))
    }, [dispatch])

    const handleDeletePromocode = useCallback(async (code) => {
        dispatch(promocodeActions.setSelectedPromocode(code));
        setOpenDelete(true)
    }, [dispatch]);

    return (
        <Box >
            <CreatePromocodeModal open={openCreate} setOpenCreate={setOpenCreate} />
            <DeletePromocodeModal openDelete={openDelete} setOpenDelete={setOpenDelete} />

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
                    Промокоди
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                    onClick={() => setOpenCreate(true)}
                >
                    Додати промокод
                </Button>
            </Box>
            <Typography level="h4" component="h1">
                на безкоштовну доставку
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: "column", mt: 4, gap: 2, }}>
                {promocodes.map((code) =>
                    <Card
                        key={code._id}
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                    >
                        <CardContent sx={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Typography id="card-description" level="h3">
                                {code.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 }, width: "30%", }}>
                                <Button onClick={() => handleDeletePromocode(code)} size="sm" variant="plain" color="danger" startDecorator={<DeleteOutlineRoundedIcon />}>
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

export { PromocodeTable }
