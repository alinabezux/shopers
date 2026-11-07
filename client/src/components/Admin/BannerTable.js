import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerActions } from '../../redux';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Alert from '@mui/joy/Alert';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import LinearProgress from '@mui/joy/LinearProgress';
import AspectRatio from '@mui/joy/AspectRatio';
import Chip from '@mui/joy/Chip';

import { styled } from '@mui/joy';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

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

const DESKTOP_HINTS = {
    title: 'Desktop-банер',
    subtitle: 'Відображається на екранах ширше 1024 px',
    width: 1920,
    height: 900,
    ratio: '16:5',
    maxSize: '5 MB',
    maxSizeBytes: 5 * 1024 * 1024,
    formats: 'WebP, JPEG, PNG',
    tip: 'Розміщуйте важливі елементи по центру або зліва — правий край може обрізатися на вузьких ноутбуках.',
    accept: 'image/jpeg,image/png,image/webp',
};

const MOBILE_HINTS = {
    title: 'Mobile-банер',
    subtitle: 'Відображається на екранах до 1024 px',
    width: 900,
    height: 1200,
    ratio: '3:4',
    maxSize: '3 MB',
    maxSizeBytes: 3 * 1024 * 1024,
    formats: 'WebP, JPEG, PNG',
    tip: 'Зображення займає 80% висоти екрана. Розміщуйте ключові елементи у верхній третині.',
    accept: 'image/jpeg,image/png,image/webp',
};

const BannerSection = ({ hints, currentUrl, uploading, onUpload, onDelete }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [localError, setLocalError] = useState(null);
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setLocalError(null);

        const ext = selected.name.split('.').pop().toLowerCase();
        const allowedExts = ['jpg', 'jpeg', 'png', 'webp'];
        const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];

        if (!allowedMime.includes(selected.type) || !allowedExts.includes(ext)) {
            setLocalError(`Непідтримуваний формат. Дозволено: ${hints.formats}`);
            return;
        }
        if (selected.size > hints.maxSizeBytes) {
            setLocalError(`Файл занадто великий. Максимум ${hints.maxSize}.`);
            return;
        }
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleUpload = useCallback(async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        await onUpload(formData);
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    }, [file, onUpload]);

    const handleCancelPreview = () => {
        setFile(null);
        setPreview(null);
        setLocalError(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <Card variant="outlined" sx={{ flex: 1, minWidth: 340 }}>
            <CardContent>
                <Stack spacing={2}>
                    {/* Header */}
                    <Box>
                        <Typography level="title-lg">{hints.title}</Typography>
                        <Typography level="body-sm" textColor="text.tertiary">{hints.subtitle}</Typography>
                    </Box>

                    <Divider />

                    {/* Requirements block */}
                    <Card variant="soft" color="neutral" sx={{ p: 1.5 }}>
                        <Typography level="title-sm" sx={{ mb: 0.5 }}>Вимоги до зображення</Typography>
                        <Stack spacing={0.5}>
                            <Typography level="body-xs">
                                📐 Рекомендований розмір: <b>{hints.width}×{hints.height} px</b>
                            </Typography>
                            <Typography level="body-xs">
                                📏 Співвідношення сторін: <b>{hints.ratio}</b>
                            </Typography>
                            <Typography level="body-xs">
                                🖼 Формати: <b>{hints.formats}</b>
                            </Typography>
                            <Typography level="body-xs">
                                📦 Максимальний розмір: <b>{hints.maxSize}</b>
                            </Typography>
                            <Typography level="body-xs" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                💡 {hints.tip}
                            </Typography>
                        </Stack>
                    </Card>

                    {/* Current image */}
                    <Box>
                        <Typography level="title-sm" sx={{ mb: 1 }}>Поточне зображення</Typography>
                        {currentUrl ? (
                            <Box sx={{ position: 'relative' }}>
                                <AspectRatio
                                    ratio={hints.ratio.replace(':', '/')}
                                    sx={{ borderRadius: 'sm', overflow: 'hidden', maxHeight: 200 }}
                                >
                                    <img
                                        src={currentUrl}
                                        alt={hints.title}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                </AspectRatio>
                                <Button
                                    size="sm"
                                    color="danger"
                                    variant="soft"
                                    startDecorator={<DeleteOutlineRoundedIcon />}
                                    sx={{ mt: 1 }}
                                    onClick={() => setDeleteOpen(true)}
                                >
                                    Видалити зображення
                                </Button>
                            </Box>
                        ) : (
                            <Card
                                variant="soft"
                                color="neutral"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: 120,
                                    gap: 1,
                                }}
                            >
                                <ImageRoundedIcon sx={{ fontSize: 40, color: 'text.tertiary' }} />
                                <Typography level="body-sm" textColor="text.tertiary">
                                    Зображення не встановлено
                                </Typography>
                                <Chip size="sm" variant="soft" color="warning">
                                    Показується локальне фото за замовчуванням
                                </Chip>
                            </Card>
                        )}
                    </Box>

                    <Divider />

                    {/* Upload new image */}
                    <Box>
                        <Typography level="title-sm" sx={{ mb: 1 }}>
                            {currentUrl ? 'Замінити зображення' : 'Завантажити зображення'}
                        </Typography>

                        {localError && (
                            <Alert
                                color="danger"
                                startDecorator={<ErrorOutlineRoundedIcon />}
                                sx={{ mb: 1 }}
                                size="sm"
                            >
                                {localError}
                            </Alert>
                        )}

                        {/* File picker */}
                        <Button
                            component="label"
                            variant="outlined"
                            color="neutral"
                            startDecorator={<FileUploadRoundedIcon />}
                            fullWidth
                        >
                            Вибрати файл
                            <VisuallyHiddenInput
                                ref={inputRef}
                                type="file"
                                accept={hints.accept}
                                onChange={handleFileChange}
                            />
                        </Button>

                        {/* Preview */}
                        {preview && file && (
                            <Card variant="outlined" orientation="horizontal" sx={{ mt: 1.5, gap: 1.5, alignItems: 'flex-start' }}>
                                <AspectRatio ratio="1" sx={{ width: 80, flexShrink: 0 }}>
                                    <img src={preview} alt="preview" style={{ objectFit: 'cover' }} />
                                </AspectRatio>
                                <CardContent>
                                    <Typography level="body-sm" noWrap sx={{ maxWidth: 200 }}>
                                        {file.name}
                                    </Typography>
                                    <Typography level="body-xs" textColor="text.tertiary">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </Typography>
                                    <Button
                                        size="sm"
                                        variant="plain"
                                        color="danger"
                                        onClick={handleCancelPreview}
                                        sx={{ mt: 0.5, px: 0 }}
                                    >
                                        Скасувати
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Progress bar */}
                        {uploading && (
                            <Box sx={{ mt: 1 }}>
                                <LinearProgress />
                                <Typography level="body-xs" textColor="text.tertiary" sx={{ mt: 0.5 }}>
                                    Завантаження…
                                </Typography>
                            </Box>
                        )}

                        {/* Upload button */}
                        {file && !uploading && (
                            <Button
                                fullWidth
                                sx={{ mt: 1.5 }}
                                onClick={handleUpload}
                                startDecorator={<FileUploadRoundedIcon />}
                            >
                                Завантажити та зберегти
                            </Button>
                        )}
                    </Box>
                </Stack>
            </CardContent>

            {/* Delete confirmation modal */}
            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon color="warning" />
                        Видалити зображення?
                    </DialogTitle>
                    <DialogContent>
                        Зображення буде видалено з S3 та бази даних. На головній сторінці відображатиметься
                        локальне фото за замовчуванням. Цю дію не можна скасувати.
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => {
                                setDeleteOpen(false);
                                onDelete();
                            }}
                        >
                            Видалити
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setDeleteOpen(false)}>
                            Скасувати
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Card>
    );
};

const BannerTable = () => {
    const dispatch = useDispatch();
    const {
        desktopUrl,
        mobileUrl,
        uploadingDesktop,
        uploadingMobile,
        loading,
        error,
        successMessage,
    } = useSelector(state => state.bannerReducer);

    useEffect(() => {
        dispatch(bannerActions.getBanner());
    }, [dispatch]);

    // Auto-clear messages after 5 seconds
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                dispatch(bannerActions.clearBannerMessages());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    const handleUploadDesktop = useCallback(async (formData) => {
        await dispatch(bannerActions.uploadDesktopBanner(formData));
    }, [dispatch]);

    const handleUploadMobile = useCallback(async (formData) => {
        await dispatch(bannerActions.uploadMobileBanner(formData));
    }, [dispatch]);

    const handleDeleteDesktop = useCallback(async () => {
        await dispatch(bannerActions.deleteBanner('desktop'));
    }, [dispatch]);

    const handleDeleteMobile = useCallback(async () => {
        await dispatch(bannerActions.deleteBanner('mobile'));
    }, [dispatch]);

    return (
        <Box sx={{ pb: 4 }}>
            {/* Page header */}
            <Box sx={{ mb: 3 }}>
                <Typography level="h3">Фото головної сторінки</Typography>
                <Typography level="body-sm" textColor="text.secondary">
                    Керуйте зображеннями банера. Desktop та Mobile — незалежні. Нове зображення замінить
                    поточне лише після успішного завантаження в S3.
                </Typography>
            </Box>

            {/* Global alerts */}
            {successMessage && (
                <Alert
                    color="success"
                    startDecorator={<CheckCircleOutlineRoundedIcon />}
                    sx={{ mb: 2 }}
                >
                    {successMessage}
                </Alert>
            )}
            {error && (
                <Alert
                    color="danger"
                    startDecorator={<ErrorOutlineRoundedIcon />}
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>
            )}
            {loading && <LinearProgress sx={{ mb: 2 }} />}

            {/* Two banner sections */}
            <Stack
                direction={{ xs: 'column', lg: 'row' }}
                spacing={3}
                alignItems="flex-start"
            >
                <BannerSection
                    hints={DESKTOP_HINTS}
                    currentUrl={desktopUrl}
                    uploading={uploadingDesktop}
                    onUpload={handleUploadDesktop}
                    onDelete={handleDeleteDesktop}
                />
                <BannerSection
                    hints={MOBILE_HINTS}
                    currentUrl={mobileUrl}
                    uploading={uploadingMobile}
                    onUpload={handleUploadMobile}
                    onDelete={handleDeleteMobile}
                />
            </Stack>
        </Box>
    );
};

export { BannerTable };
