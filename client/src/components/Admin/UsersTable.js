import * as React from 'react';
import { useState } from 'react';

import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Link,
    Input,
    Modal,
    ModalDialog,
    ModalClose,
    Select,
    Option,
    Table,
    Sheet,
    Checkbox,
    IconButton,
    Typography,
    Menu,
    MenuButton,
    MenuItem,
    Dropdown,
} from '@mui/joy';

export default function UsersTable() {

    return (

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
                Користувачі
            </Typography>

        </Box>

    );
}
