import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalDialog, Option, Select, Stack } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, productActions, typeActions } from "../../../redux";
import { useForm, Form, Controller } from "react-hook-form";
import { InfoOutlined, WarningRounded } from "@mui/icons-material";

const CreateProductModal = ({ openCreate, setOpenCreate }) => {
    const dispatch = useDispatch();

    const { categories, } = useSelector(state => state.categoryReducer);
    const { types, error } = useSelector(state => state.typeReducer);

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm();

    const [category, setCategory] = useState(null)
    const [type, setType] = useState(null)


    const handleCreateProduct = useCallback(async (data) => {
        let productProperties = {
            article: data.article,
            name: data.name,
            _category: category,
            _type: type,
            quantity: data.quantity,
            price: data.price,
            info: {}
        };

        if (data.color) productProperties.info.color = data.color
        if (data.size) productProperties.info.size = data.size
        if (data.material) productProperties.info.material = data.material
        if (data.description) productProperties.info.description = data.description

        try {
            const res = await dispatch(productActions.createProduct({ product: productProperties }));
            if (res.meta.requestStatus === 'fulfilled') {
                setOpenCreate(false);
                reset();
                setCategory(null);
                setType(null);
            } else {
                console.error("Не вдалося створити товар:", res.error);
            }
        } catch (error) {
            console.error("Помилка:", error);
        }

    }, [category, type, dispatch, reset])

    return (
        <Modal open={openCreate} onClose={() => setOpenCreate(false)} >
            <ModalDialog>
                <DialogTitle>Створити новий товар</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleCreateProduct)}>
                    <Box className="checkout__info" sx={{ gap: "15px" }}>
                        <FormControl required error={!!errors.article} className="checkout__form">
                            <FormLabel>Артикул</FormLabel>
                            <Input {...register('article', { required: "Обов'язкове поле" })} />
                            {errors.article &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.article.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <FormControl required error={!!errors.name} className="checkout__form">
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name', { required: "Обов'язкове поле" })} />
                            {errors.name &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.name.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <FormControl required error={!!errors.category} className="checkout__form">
                            <FormLabel>Категорія, до якої відноситься даний товар</FormLabel>
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

                        <FormControl required error={!!errors.type} className="checkout__form">
                            <FormLabel>Тип, до якої відноситься даний товар</FormLabel>
                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: "Обов'язкове поле" }}
                                render={({ field: { onChange, onBlur, value = '', ref } }) => (
                                    <Select
                                        ref={ref}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={(event, newValue) => {
                                            onChange(newValue);
                                            setType(newValue)
                                        }}
                                    >
                                        {types.map((type) => (
                                            <Option value={type._id} key={type._id}>{type.name}</Option>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.type && (
                                <FormHelperText>
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.type.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl className="checkout__form" >
                            <FormLabel>Колір</FormLabel>
                            <Input {...register('color')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Розмір</FormLabel>
                            <Input {...register('size')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Матеріал</FormLabel>
                            <Input {...register('material')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Опис</FormLabel>
                            <Input {...register('description')} />
                        </FormControl>

                        <FormControl required error={!!errors.quantity} className="checkout__form">
                            <FormLabel>Кількість</FormLabel>
                            <Input {...register('quantity', { required: "Обов'язкове поле" })} />
                            {errors.quantity &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.quantity.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <FormControl required error={!!errors.price} className="checkout__form">
                            <FormLabel>Ціна</FormLabel>
                            <Input {...register('price', { required: "Обов'язкове поле" })} />
                            {errors.price &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.price.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <Button type="submit">Зберегти</Button>
                    </Box>
                </Form>
            </ModalDialog>
        </Modal >
    )
};

const EditProductModal = ({ openEdit, setOpenEdit }) => {
    const dispatch = useDispatch();

    const { types } = useSelector(state => state.typeReducer);
    const { categories } = useSelector(state => state.categoryReducer);
    const { selectedProduct, error } = useSelector(state => state.productReducer);

    const { control, handleSubmit, register, reset, setValue } = useForm();


    const [category, setCategory] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        if (selectedProduct) {
            setValue('article', selectedProduct.article)
            setValue('name', selectedProduct.name)
            setValue('quantity', selectedProduct.quantity)
            setValue('price', selectedProduct.price)

            setValue('color', selectedProduct?.info?.color)
            setValue('size', selectedProduct?.info?.size)
            setValue('material', selectedProduct?.info?.material)
            setValue('description', selectedProduct?.info?.description)

            setCategory(selectedProduct._category);
            setType(selectedProduct._type)
        }
    }, [selectedProduct, setValue])


    const handleEditType = useCallback(async (data) => {
        let productProperties = {
            info: {}
        };
        if (data.article) {
            productProperties.article = data.article;
        }
        if (data.name) {
            productProperties.name = data.name;
        }
        if (data.quantity) {
            productProperties.quantity = data.quantity;
        }
        if (data.price) {
            productProperties.price = data.price;
        }
        if (data.color) {
            productProperties.info.color = data.color;
        }
        if (data.size) {
            productProperties.info.size = data.size;
        }
        if (data.material) {
            productProperties.info.material = data.material;
        }
        if (data.description) {
            productProperties.info.description = data.description;
        }


        if (category) {
            productProperties._category = category;
        }
        if (type) {
            productProperties._type = type;
        }

        // let productProperties = {
        //     article: data.article,
        //     name: data.name,
        //     quantity: data.quantity,
        //     price: data.price,
        //     color: data.color,
        //     size: data.size,
        //     material: data.material,
        //     description: data.description,
        //     _category: category,
        //     _type: type
        // };

        const res = await dispatch(productActions.updateProduct({ productId: selectedProduct._id, product: productProperties }));
        if (res.meta.requestStatus === 'fulfilled') {
            setOpenEdit(false);
            reset();
            setCategory('');
            setType('');
        }

    }, [category, type, dispatch, selectedProduct, reset, setOpenEdit])

    return (
        <Modal open={openEdit} onClose={() => setOpenEdit(false)} >
            <ModalDialog>
                <DialogTitle>Редагувати товар</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleEditType)}>
                    <Box className="checkout__info" sx={{ gap: "15px" }}>
                        <FormControl className="checkout__form">
                            <FormLabel>Артикул</FormLabel>
                            <Input {...register('article')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Назва</FormLabel>
                            <Input {...register('name')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Категорія, до якої відноситься даний товар</FormLabel>
                            <Select onChange={(event, newValue) => setCategory(newValue)} value={category || ''}>
                                {categories.map((category) => (
                                    <Option value={category._id} key={category._id}>{category.name}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Тип, до якої відноситься даний товар</FormLabel>
                            <Select onChange={(event, newValue) => setType(newValue)} value={type || ''}>
                                {types.map((type) => (
                                    <Option value={type._id} key={type._id}>{type.name}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className="checkout__form" >
                            <FormLabel>Колір</FormLabel>
                            <Input {...register('color')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Розмір</FormLabel>
                            <Input {...register('size')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Матеріал</FormLabel>
                            <Input {...register('material')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Опис</FormLabel>
                            <Input {...register('description')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Кількість</FormLabel>
                            <Input {...register('quantity')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Ціна</FormLabel>
                            <Input {...register('price')} />
                        </FormControl>

                        <Button type="submit">Зберегти</Button>
                    </Box>
                </Form>
            </ModalDialog>
        </Modal>
    )
};


const DeleteProductModal = ({ openDelete, setOpenDelete }) => {
    const dispatch = useDispatch();

    const { selectedProduct, error } = useSelector(state => state.productReducer);

    const handleDeleteProduct = useCallback(async () => {
        await dispatch(productActions.deleteById({ productId: selectedProduct._id }));
        await dispatch(productActions.getAll({}))
        setOpenDelete(false)
    }, [dispatch, selectedProduct, setOpenDelete]);

    return (
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <ModalDialog variant="outlined" role="alertdialog" >
                <DialogTitle>
                    <WarningRounded />
                    Підтвердження
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Ви впевнені, що хочете видалити продукт {selectedProduct.name}?
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={handleDeleteProduct}>
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



export { CreateProductModal, EditProductModal, DeleteProductModal }