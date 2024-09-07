import * as React from 'react';
import { Link, useLocation } from 'react-router-dom'

import { closeSidebar } from './utils';
import logo from '../../assets/inst.png'

import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { List, ListItem } from '@mui/joy';


export default function Sidebar() {

    const location = useLocation();
    const { pathname } = location;

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: 'fixed',
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                height: '100vh',
                width: 'var(--Sidebar-width)',
                top: 0,
                boxSizing: "border-box",
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',

            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <img src={logo} alt='logo' style={{ height: "50px" }} />
                <Typography level='h4' sx={{ fontWeight: 700 }}>SHOPERS_VI</Typography>
            </Box>
            <Divider />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <Typography component={Link} to="/" className='link' level="title-md">Головна</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem>
                        <ListItemButton>
                            <DashboardRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-md">Dashboard</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem>
                        <ListItemButton selected={pathname.includes('/admin/orders') ? true : false}>
                            <ShoppingCartRoundedIcon />
                            <ListItemContent>
                                <Typography component={Link} to="/admin/orders" className='link' level="title-md">Замовлення</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>


                    <ListItem>
                        <ListItemButton selected={pathname.includes('/admin/products') ? true : false}>
                            <BusinessCenterIcon />
                            <ListItemContent>
                                <Typography component={Link} to="/admin/products" className='link' level="title-md">Товари</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton selected={pathname.includes('/admin/categories') ? true : false}>
                            <CategoryRoundedIcon />
                            <ListItemContent>
                                <Typography component={Link} to="/admin/categories" className='link' level="title-md">Категорії</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton selected={pathname.includes('/admin/types') ? true : false}>
                            <AssignmentRoundedIcon />
                            <ListItemContent>
                                <Typography component={Link} to="/admin/types" className='link' level="title-md">Типи</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    {/* <ListItem>
                        <ListItemButton >
                            <GroupRoundedIcon />
                            <ListItemContent>
                                <Typography component={Link} to="/admin/users" className='link' level="title-md">Користувачі</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem> */}
                </List>
            </Box>
        </Sheet >
    );
}
