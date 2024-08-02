import { Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalDialog, Option, Select, Stack } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, typeActions } from "../../../redux";
import { useForm, Form, Controller } from "react-hook-form";
import { InfoOutlined, WarningRounded } from "@mui/icons-material";

const CreateTypeModal = ({ open, setOpenCreate }) => {
    const dispatch = useDispatch();

    const { categories, selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType, error } = useSelector(state => state.typeReducer);

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm();

    const [category, setCategory] = useState(null)

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

    const handleCreateType = useCallback(async (data) => {
        let typeProperties = {
            name: data.name,
            _category: category
        };
        try {
            const res = await dispatch(typeActions.createType({ type: typeProperties }));
            if (res.meta.requestStatus === 'fulfilled') {
                setOpenCreate(false);
                reset();
                setCategory(null);
            } else {
                // Обробка невдалого запиту
                console.error("Не вдалося створити тип:", res.error);
            }
        } catch (error) {
            console.error("Помилка:", error);
        }

    }, [category, dispatch, reset])

    return (
        <Modal open={open} onClose={() => setOpenCreate(false)} >
            <ModalDialog>
                <DialogTitle>Створити новий тип</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleCreateType)}>
                    <Stack spacing={2}>
                        <FormControl required error={!!errors.name}>
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name', { required: "Обов'язкове поле" })} />
                            {errors.name &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.name.message}
                                </FormHelperText>
                            }
                        </FormControl>
                        <FormControl required error={!!errors.category}>
                            <FormLabel>Категорія, до якої відноситься даний тип</FormLabel>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: "Обов'язкове поле" }}
                                render={({ field: { onChange, onBlur, value = '', ref } }) => (
                                    <Select
                                        ref={ref}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                            setCategory(newValue)
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <Option value={category._id} key={category._id}>{category.name}</Option>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <FormHelperText>
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.category.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Button type="submit">Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
};

const EditTypeModal = ({ openEdit, setOpenEdit }) => {
    const dispatch = useDispatch();

    const { selectedType, error } = useSelector(state => state.typeReducer);
    const { categories } = useSelector(state => state.categoryReducer);

    const { control, handleSubmit, register, reset, setValue } = useForm();

    const [category, setCategory] = useState(null)

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])


    useEffect(() => {
        if (selectedType) {
            setValue('name', selectedType.name)
            setCategory(selectedType._category);
        }
    }, [selectedType, setValue])


    const handleEditType = useCallback(async (data) => {
        let typeProperties = {};
        if (data.name) {
            typeProperties.name = data.name;
        }
        if (category) {
            typeProperties._category = category;
        }
        console.log(typeProperties);

        const res = await dispatch(typeActions.updateType({ typeId: selectedType._id, type: typeProperties }));
        console.log(res)

        if (res.meta.requestStatus === 'fulfilled') {
            setOpenEdit(false);
            reset();
            setCategory(null);
        }

    }, [category, dispatch, selectedType, reset])

    return (
        <Modal open={openEdit} onClose={() => setOpenEdit(false)} >
            <ModalDialog>
                <DialogTitle>Редагувати тип</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleEditType)}>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name')} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Категорія, до якої відноситься даний тип</FormLabel>
                            <Select onChange={(event, newValue) => setCategory(newValue)} value={category || ''}>
                                {categories.map((category) => (
                                    <Option value={category._id} key={category._id}>{category.name}</Option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit">Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
}


const DeleteTypeModal = ({ openDelete, setOpenDelete }) => {
    const dispatch = useDispatch();

    const { selectedType, error } = useSelector(state => state.typeReducer);

    const handleDeleteType = useCallback(async () => {
        await dispatch(typeActions.deleteById({ typeId: selectedType._id }));
        await dispatch(typeActions.getAll())
        setOpenDelete(false)

    }, [dispatch, selectedType]);


    return (
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <ModalDialog variant="outlined" role="alertdialog" >
                <DialogTitle>
                    <WarningRounded />
                    Підтвердження
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Ви впевнені, що хочете видалити тип {selectedType.name}?
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={handleDeleteType}>
                        Видалити
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
                        Скасувати
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    )
}



export { CreateTypeModal, EditTypeModal, DeleteTypeModal }