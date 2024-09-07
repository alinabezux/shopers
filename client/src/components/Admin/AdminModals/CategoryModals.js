import { InfoOutlined, WarningRounded } from "@mui/icons-material";
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalDialog, Stack, Typography } from "@mui/joy";
import { useCallback, useEffect, useState, } from "react";
import { Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, } from "../../../redux";
import { FileUpload } from "./FileUpload";
import { DropZone } from "./DropZone";

const CreateCategoryModal = ({ openCreate, setOpenCreate }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.categoryReducer);

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm();

    const handleCreateCategory = useCallback(async (data) => {
        try {
            const res = await dispatch(categoryActions.createCategory({ category: data }));
            if (res.meta.requestStatus === 'fulfilled') {
                setOpenCreate(false);
                reset();
            } else {
                console.error("Не вдалося створити тип:", res.error);
            }
        } catch (error) {
            console.error("Помилка:", error);
        }

    }, [dispatch, reset])

    return (
        <Modal open={openCreate} onClose={() => setOpenCreate(false)} >
            <ModalDialog>
                <DialogTitle>Створити новий категорію</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleCreateCategory)}>
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
                        <Button type="submit" loading={loading}>Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
};

const EditCategoryModal = ({ openEdit, setOpenEdit }) => {
    const dispatch = useDispatch();

    const { selectedCategory, loading, error } = useSelector(state => state.categoryReducer);

    const { control, handleSubmit, register, reset, setValue } = useForm();

    useEffect(() => {
        if (selectedCategory) {
            setValue('name', selectedCategory.name)
        }
    }, [selectedCategory])


    const handleEditCategory = useCallback(async (data) => {
        const res = await dispatch(categoryActions.updateCategory({ categoryId: selectedCategory._id, category: data }));
        if (res.meta.requestStatus === 'fulfilled') {
            setOpenEdit(false);
            reset();
        }
    }, [dispatch, selectedCategory, reset])

    return (
        <Modal open={openEdit} onClose={() => setOpenEdit(false)} >
            <ModalDialog>
                <DialogTitle>Редагувати категорію</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleEditCategory)}>
                    <Stack spacing={2}>
                        <FormControl error={error}>
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name')} />
                            {error &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {error.message}
                                </FormHelperText>
                            }
                        </FormControl>
                        <Button type="submit" loading={loading}>Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
};

const AddPhotoCategoryModal = ({ openAddPhoto, setOpenAddPhoto }) => {
    const dispatch = useDispatch();

    const { selectedCategory, loading } = useSelector(state => state.categoryReducer);

    const { control, handleSubmit } = useForm();

    const [file, setFile] = useState(null)

    const handleAddPhoto = useCallback(async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("prevImage", selectedCategory.image);

            const res = await dispatch(categoryActions.uploadPhoto({
                categoryId: selectedCategory._id,
                formData,
            }));

            if (res.meta.requestStatus === 'fulfilled') {
                setOpenAddPhoto(false);
                setFile(null);
            }
        } catch (error) {
            console.error("Помилка під час завантаження файлу ", error);
        }
    }, [dispatch, file, selectedCategory, setOpenAddPhoto])

    return (
        <Modal open={openAddPhoto} onClose={() => setOpenAddPhoto(false)} >
            <ModalDialog>
                <DialogTitle>Додати фото</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleAddPhoto)}>

                    <FormControl>
                        <Stack spacing={2} sx={{ my: 1 }}>
                            <DropZone setFile={setFile} />
                            {file && <Box>  <FileUpload file={file} /></Box>}

                            <Button type="submit" disabled={!file} loading={loading}>Зберегти</Button>
                        </Stack>
                    </FormControl>
                </Form>
            </ModalDialog>
        </Modal>
    )
};

const DeleteCategoryModal = ({ openDelete, setOpenDelete }) => {
    const dispatch = useDispatch();

    const { selectedCategory, loading } = useSelector(state => state.categoryReducer);

    const handleDeleteCategory = useCallback(async () => {
        await dispatch(categoryActions.deleteById({ categoryId: selectedCategory._id, imageUrl: selectedCategory.image }));
        setOpenDelete(false)
    }, [dispatch, selectedCategory]);


    return (
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <ModalDialog variant="outlined" role="alertdialog" >
                <DialogTitle>
                    <WarningRounded />
                    Підтвердження
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Ви впевнені, що хочете видалити категорію {handleDeleteCategory.name}?
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" loading={loading} color="danger" onClick={handleDeleteCategory}>
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



export { AddPhotoCategoryModal, CreateCategoryModal, DeleteCategoryModal, EditCategoryModal };

