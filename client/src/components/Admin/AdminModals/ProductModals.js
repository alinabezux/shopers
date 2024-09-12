import { AspectRatio, Box, Button, Card, CardContent, CardCover, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Stack, Typography } from "@mui/joy";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../redux";
import { useForm, Form, Controller } from "react-hook-form";
import { FileUploadRounded, InfoOutlined, WarningRounded } from "@mui/icons-material";
import { FileUpload } from "./FileUpload";
import { styled } from '@mui/joy';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const CreateProductModal = ({ openCreate, setOpenCreate }) => {
    const dispatch = useDispatch();

    const { categories, } = useSelector(state => state.categoryReducer);
    const { types } = useSelector(state => state.typeReducer);
    const { loading, error } = useSelector(state => state.productReducer);

    const { control, handleSubmit, register, formState: { errors }, reset, setValue } = useForm();

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
                setValue('category', null);
                setValue('type', null);
                setCategory(null);
                setType(null);
            } else {
                console.error("Не вдалося створити товар:", res.error);
            }
        } catch (error) {
            console.error("Помилка:", error);
        }

    }, [category, type, dispatch, reset, setOpenCreate, setValue])

    return (
        <Modal open={openCreate} onClose={() => setOpenCreate(false)} >
            <ModalDialog>
                <DialogTitle>Створити новий товар</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleCreateProduct)}>
                    <Box className="checkout__info" sx={{ gap: "15px" }}>
                        <FormControl required error={!!errors.article || error} className="checkout__form">
                            <FormLabel>Артикул</FormLabel>
                            <Input {...register('article', { required: "Обов'язкове поле" })} />
                            {errors.article &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {errors.article.message}
                                </FormHelperText>
                            }
                            {error &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {error.message}
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

                        <Button type="submit" loading={loading}>Зберегти</Button>
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
    const { selectedProduct, error, loading } = useSelector(state => state.productReducer);

    const { control, handleSubmit, register, reset } = useForm();


    const [category, setCategory] = useState('')
    const [type, setType] = useState('')


    const handleEditType = useCallback(async (data) => {
        let productProperties = {
            info: { ...selectedProduct.info }
        };

        if (data.article) {
            productProperties.article = data.article;
        }
        if (data.name) {
            productProperties.name = data.name;
        }
        if (data.quantity) {
            productProperties.quantity = parseInt(data.quantity, 10);
        }
        if (data.price) {
            productProperties.price = parseInt(data.price, 10);
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
                        <FormControl className="checkout__form" error={error}>
                            <FormLabel>Артикул</FormLabel>
                            <Input placeholder={selectedProduct.article} {...register('article')} />
                            {error &&
                                <FormHelperText >
                                    <InfoOutlined sx={{ mr: 1 }} />
                                    {error.message}
                                </FormHelperText>
                            }
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder={selectedProduct.name} {...register('name')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Категорія, до якої відноситься даний товар</FormLabel>
                            <Select onChange={(event, newValue) => setCategory(newValue)} value={category || ''}
                                placeholder={(categories.find(item => item._id === selectedProduct._category))?.name}
                            >
                                {categories.map((category) => (
                                    <Option value={category._id} key={category._id}>{category.name}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Тип, до якої відноситься даний товар</FormLabel>
                            <Select onChange={(event, newValue) => setType(newValue)} value={type || ''}
                                placeholder={(types.find(item => item._id === selectedProduct._type))?.name}
                            >
                                {types.map((type) => (
                                    <Option value={type._id} key={type._id}>{type.name}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className="checkout__form" >
                            <FormLabel>Колір</FormLabel>
                            <Input placeholder={selectedProduct?.info?.color} {...register('color')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Розмір</FormLabel>
                            <Input placeholder={selectedProduct?.info?.size} {...register('size')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Матеріал</FormLabel>
                            <Input placeholder={selectedProduct?.info?.material} {...register('material')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Опис</FormLabel>
                            <Input placeholder={selectedProduct?.info?.description} {...register('description')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Кількість</FormLabel>
                            <Input placeholder={selectedProduct.quantity} {...register('quantity')} />
                        </FormControl>

                        <FormControl className="checkout__form">
                            <FormLabel>Ціна</FormLabel>
                            <Input placeholder={selectedProduct.price} {...register('price')} />
                        </FormControl>

                        <Button type="submit" loading={loading}>Зберегти</Button>
                    </Box>
                </Form>
            </ModalDialog>
        </Modal>
    )
};

const DeleteProductModal = ({ openDelete, setOpenDelete }) => {
    const dispatch = useDispatch();

    const { selectedProduct, loading } = useSelector(state => state.productReducer);

    const handleDeleteProduct = useCallback(async () => {
        try {
            await dispatch(productActions.deleteById({ productId: selectedProduct._id }));
            setOpenDelete(false);
        } catch (err) {
            console.error("Помилка під час видалення продукту:", err);
        }
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
                    <Button variant="solid" color="danger" onClick={handleDeleteProduct} loading={loading}>
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

const AddPhotoProductModal = ({ openAddPhoto, setOpenAddPhoto }) => {
    const dispatch = useDispatch();
    const { selectedProduct, loading } = useSelector(state => state.productReducer);

    const { control, handleSubmit } = useForm();

    const [files, setFiles] = useState([])

    const selectFiles = e => {
        setFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)]);
    };

    const handleAddPhoto = useCallback(async () => {
        if (files.length === 0) return;

        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append("images", file)
            });
            await dispatch(productActions.uploadPhoto({
                productId: selectedProduct._id,
                images: formData,
            }));
            setOpenAddPhoto(false);
            setFiles([])
        } catch (error) {
            console.error("Помилка під час завантаження файлу ", error);
        }
    }, [dispatch, files, selectedProduct, setOpenAddPhoto])



    return (
        <Modal open={openAddPhoto} onClose={() => setOpenAddPhoto(false)}>
            <ModalDialog>
                <DialogTitle >Додати фото</DialogTitle>
                <Form control={control} onSubmit={handleSubmit(handleAddPhoto)}>
                    <FormControl>
                        <Stack spacing={2} sx={{ my: 1 }} >
                            <Card
                                variant="soft"
                                sx={{
                                    borderRadius: 'sm',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    alignItems: 'center',
                                    px: 3,
                                    flexGrow: 1,
                                    boxShadow: 'none',
                                }}
                            >
                                <AspectRatio
                                    ratio="1"
                                    variant="solid"
                                    color="primary"
                                    sx={{
                                        minWidth: 32,
                                        borderRadius: '50%',
                                        '--Icon-fontSize': '16px',
                                    }}
                                >
                                    <div><FileUploadRounded /></div>
                                </AspectRatio>

                                <Typography level="body-sm" textAlign="center">
                                    <Button
                                        component="label"
                                        role={undefined}
                                        tabIndex={-1}
                                        variant="plain"
                                        onChange={selectFiles}
                                        sx={{ mx: 1 }}
                                    >
                                        Клікни
                                        <VisuallyHiddenInput type="file" multiple />
                                    </Button>
                                    для заватаження
                                    <br /> PNG, JPG
                                </Typography>
                            </Card>
                            <Box sx={{
                                maxHeight: '300px',
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '5px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f1f1f1',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#888',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#555',
                                },
                            }}>
                                {files.length !== 0 && (
                                    <Stack spacing={1}>
                                        {files.map(file => <FileUpload key={file.name} file={file} />)}
                                    </Stack>
                                )}</Box>

                            <Button type="submit" disabled={files.length === 0} loading={loading}>Зберегти</Button>
                        </Stack>
                    </FormControl>
                </Form>
            </ModalDialog>
        </Modal >
    )
};

const ImagesModal = ({ openImages, setOpenImages }) => {
    const dispatch = useDispatch();
    const { selectedProduct } = useSelector(state => state.productReducer);

    const handleDeleteImage = useCallback(async (img) => {
        try {
            await dispatch(productActions.deleteImage({ productId: selectedProduct._id, imageUrl: img }));
        } catch (err) {
            console.error("Помилка під час видалення зображення:", err);
        }
    }, [dispatch, selectedProduct._id]);

    return (
        <Modal open={openImages} onClose={() => setOpenImages(false)} >
            <ModalDialog>
                <DialogTitle>Переглянути фото</DialogTitle>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555',
                    },

                }}>
                    {selectedProduct?.images?.length > 0 && (selectedProduct?.images.map((img, index) => (
                        <Card key={index} sx={{ width: "150px", height: "150px" }}>
                            <CardCover >
                                <img
                                    src={img}
                                    alt={`img - ${index}`}
                                    loading="lazy"
                                />
                            </CardCover>
                            <CardContent>
                                <IconButton
                                    onClick={() => handleDeleteImage(img)}
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                >
                                    <ClearRoundedIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    )
                    ))}
                </Box>
            </ModalDialog>
        </Modal>
    )
};

export { CreateProductModal, EditProductModal, DeleteProductModal, AddPhotoProductModal, ImagesModal }