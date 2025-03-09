import { Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalDialog, Stack } from "@mui/joy";
import { useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { promocodeActions } from "../../../redux";
import { useForm, Form } from "react-hook-form";
import { InfoOutlined, WarningRounded } from "@mui/icons-material";

const CreatePromocodeModal = ({ open, setOpenCreate }) => {
    const dispatch = useDispatch();

    const { error, loading } = useSelector(state => state.promocodeReducer);

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm();

    const handleCreatePromocode = useCallback(async (data) => {
        let promocodeProperties = {
            name: data.name,
        };
        try {
            const res = await dispatch(promocodeActions.create({ promocode: promocodeProperties }));
            if (res.meta.requestStatus === 'fulfilled') {
                setOpenCreate(false);
                reset();
            } else {
                console.error("Не вдалося створити тип:", res.error);
            }
        } catch (error) {
            console.error("Помилка:", error);
        }

    }, [dispatch, reset, setOpenCreate])

    return (
        <Modal open={open} onClose={() => setOpenCreate(false)} >
            <ModalDialog>
                <DialogTitle>Створити новий промокод</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleCreatePromocode)}>
                    <Stack spacing={2}>
                        <FormControl required error={!!errors.name || error}>
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name', { required: "Обов'язкове поле" })} />
                            {errors.name &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.name.message}
                                </FormHelperText>
                            }
                            {error &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {error.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <Button type="submit" loading={loading ? true : false}>Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
};


const DeletePromocodeModal = ({ openDelete, setOpenDelete }) => {
    const dispatch = useDispatch();

    const { selectedPromocode, loading } = useSelector(state => state.promocodeReducer);

    const handleDeletePromocode = useCallback(async () => {
        await dispatch(promocodeActions.deleteById({ promocodeId: selectedPromocode._id }));
        setOpenDelete(false)

    }, [dispatch, selectedPromocode, setOpenDelete]);


    return (
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <ModalDialog variant="outlined" role="alertdialog" >
                <DialogTitle>
                    <WarningRounded />
                    Підтвердження
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Ви впевнені, що хочете видалити промокод {selectedPromocode.name}?
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={handleDeletePromocode} loading={loading ? true : false}>
                        Видалити
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
                        Скасувати
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    )
};

export { CreatePromocodeModal, DeletePromocodeModal }