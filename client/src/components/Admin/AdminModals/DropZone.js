import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';

import { styled } from '@mui/joy';
import Button from '@mui/joy/Button'
import { FileUploadRounded } from '@mui/icons-material';

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

const DropZone = ({ setFile }) => {
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    return (
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
                    onChange={selectFile}
                    sx={{ mx: 1 }}
                >
                    Клікни
                    <VisuallyHiddenInput type="file" />
                </Button>
                для заватаження
                <br /> PNG, JPG
            </Typography>
        </Card>
    );
}

export { DropZone };
