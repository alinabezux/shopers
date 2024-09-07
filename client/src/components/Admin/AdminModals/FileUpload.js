import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import Typography from '@mui/joy/Typography';



const FileUpload = ({ file }) => {
    const url = URL.createObjectURL(file);
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                gap: 1.5,
                alignItems: 'flex-start',
            }}
        >
            <AspectRatio
                ratio="1"
                sx={{
                    width: 70
                }}
            >
                <img src={url} alt={file.name} />
            </AspectRatio>
            <CardContent>
                <Typography fontSize="sm">{file.name}</Typography>
                <Typography level="body-xs">{file.size} байт</Typography>
            </CardContent>
        </Card>
    );
}

export { FileUpload };
