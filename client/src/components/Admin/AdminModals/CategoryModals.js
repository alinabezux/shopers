import { Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalDialog, Option, Select, Stack } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, typeActions } from "../../../redux";
import { useForm, Form } from "react-hook-form";
import { InfoOutlined, WarningRounded } from "@mui/icons-material";

const CreateCategoryModal = ({ openCreate, setOpenCreate }) => {
    const dispatch = useDispatch();

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
                        <Button type="submit">Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
};

const EditCategoryModal = ({ openEdit, setOpenEdit }) => {
    const dispatch = useDispatch();

    const { categories, selectedCategory } = useSelector(state => state.categoryReducer);

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
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name')} />
                        </FormControl>
                        <Button type="submit">Зберегти</Button>
                    </Stack>
                </Form>
            </ModalDialog>
        </Modal>
    )
}


// const AddPhotoCategoryModal = ({ openEdit, setOpenEdit }) => {
//     const dispatch = useDispatch();

//     const { selectedType, error } = useSelector(state => state.typeReducer);
//     const { categories } = useSelector(state => state.categoryReducer);

//     const { control, handleSubmit, register, formState: { errors }, reset, setValue } = useForm();

//     const [category, setCategory] = useState(null)

//     useEffect(() => {
//         dispatch(categoryActions.getAll())
//     }, [dispatch])


//     useEffect(() => {
//         if (selectedType) {
//             setValue('name', selectedType.name)
//             setCategory(selectedType._category);
//         }
//     }, [selectedType])


//     const handleEditType = useCallback(async (data) => {
//         let typeProperties = {};
//         if (data.name) {
//             typeProperties.name = data.name;
//         }
//         if (category) {
//             typeProperties._category = category;
//         }
//         console.log(typeProperties);

//         const res = await dispatch(typeActions.updateType({ typeId: selectedType._id, type: typeProperties }));
//         if (res.meta.requestStatus === 'fulfilled') {
//             setOpenEdit(false);
//             reset();
//             setCategory(null);
//         }

//     }, [category, dispatch, selectedType, reset])

//     return (
//         <Modal open={openEdit} onClose={() => setOpenEdit(false)} >
//             <ModalDialog>
//                 <DialogTitle>Редагувати тип</DialogTitle>
//                 <Form control={control} onSubmit={handleSubmit(handleEditType)}>
//                     <Stack spacing={2}>
//                         <FormControl>
//                             <FormLabel>Назва</FormLabel>
//                             <Input {...register('name')} />
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>Категорія, до якої відноситься даний тип</FormLabel>
//                             <Select onChange={(event, newValue) => setCategory(newValue)} value={category || ''}>
//                                 {categories.map((category) => (
//                                     <Option value={category._id} key={category._id}>{category.name}</Option>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <Button type="submit">Зберегти</Button>
//                     </Stack>
//                 </Form>
//             </ModalDialog>
//         </Modal>
//     )
// }


const DeleteCategoryModal = ({ openDelete, setOpenDelete }) => {
    const dispatch = useDispatch();

    const { selectedCategory } = useSelector(state => state.categoryReducer);

    const handleDeleteCategory = useCallback(async () => {
        await dispatch(categoryActions.deleteById({ categoryId: selectedCategory._id }));
        await dispatch(categoryActions.getAll())
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
                    <Button variant="solid" color="danger" onClick={handleDeleteCategory}>
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



export { CreateCategoryModal, EditCategoryModal, DeleteCategoryModal }