
import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Divider,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Sheet,
    Typography,
    IconButton,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { productActions } from '../../redux';
import Table from '@mui/joy/Table';
import { MoreHorizRounded } from '@mui/icons-material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

const ProductsTable = () => {

    const dispatch = useDispatch();

    const { products, error } = useSelector(state => state.productReducer);
    const { selectedCategory } = useSelector(state => state.categoryReducer);
    const { selectedType } = useSelector(state => state.typeReducer);

    useEffect(() => {
        dispatch(productActions.getAll({
            _category: selectedCategory._id,
            _type: selectedType._id,
        }))
    }, [dispatch, selectedCategory._id, selectedType._id]);

    function RowMenu() {
        return (
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                >
                    <MoreHorizRounded />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }}>
                    <MenuItem >
                        <ListItemDecorator>
                            <EditRoundedIcon />
                        </ListItemDecorator>{' '}
                        Редагувати
                    </MenuItem>
                    <MenuItem >
                        <ListItemDecorator>
                            <AddPhotoAlternateRoundedIcon />
                        </ListItemDecorator>{' '}
                        Додати фото
                    </MenuItem>
                    <Divider />
                    <MenuItem color="danger" >
                        <ListItemDecorator>
                            <DeleteOutlineRoundedIcon />
                        </ListItemDecorator>{' '}
                        Видалити
                    </MenuItem>
                </Menu>
            </Dropdown>
        );
    }

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
                    Товари
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                >
                    Додати товар
                </Button>
            </Box>
            <Sheet
                variant="outlined"
                sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
            >
                <Table aria-label="basic table" stickyHeader sx={{ '--Table-headerUnderlineThickness': '1px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Артикул</th>
                            <th>Фото</th>
                            <th>Назва</th>
                            <th>Категорія/Тип</th>
                            <th style={{ width: '10%' }}>Ціна</th>
                            <th style={{ width: '5%' }}>К-сть</th>
                            <th style={{ width: '30%' }}>Інфо</th>
                            <th style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product._id}>
                                <td>{product.article}</td>
                                <td>{product.article}</td>
                                <td>{product.name}</td>
                                <td>{product._category} {product._type}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Box>
                                        <Typography>Колір:{product.info.color}</Typography>
                                        <Typography>Розмір:{product.info.size}</Typography>
                                        <Typography>Матеріал:{product.info.material}</Typography>
                                        <Typography>Опис:{product.info.description}</Typography>
                                    </Box>
                                </td>
                                <td><RowMenu /></td>
                            </tr>
                        )}
                    </tbody>
                </Table >
            </Sheet >
        </Box >

    );
}
export { ProductsTable };