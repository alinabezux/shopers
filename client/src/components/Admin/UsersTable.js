import * as React from 'react';

import {
    Box,
    Typography,

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
