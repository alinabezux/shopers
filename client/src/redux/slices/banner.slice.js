import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bannerService } from "../../services";

const initialState = {
    desktopUrl: null,
    mobileUrl: null,
    loading: false,
    uploadingDesktop: false,
    uploadingMobile: false,
    error: null,
    successMessage: null,
};

const getBanner = createAsyncThunk(
    'bannerSlice/getBanner',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await bannerService.getBanner();
            return data;
        } catch (e) {
            return rejectWithValue(e.response?.data);
        }
    }
);

const uploadDesktopBanner = createAsyncThunk(
    'bannerSlice/uploadDesktopBanner',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await bannerService.uploadDesktopBanner(formData);
            return data;
        } catch (e) {
            return rejectWithValue(e.response?.data);
        }
    }
);

const uploadMobileBanner = createAsyncThunk(
    'bannerSlice/uploadMobileBanner',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await bannerService.uploadMobileBanner(formData);
            return data;
        } catch (e) {
            return rejectWithValue(e.response?.data);
        }
    }
);

const deleteBanner = createAsyncThunk(
    'bannerSlice/deleteBanner',
    async (type, { rejectWithValue }) => {
        try {
            const { data } = await bannerService.deleteBanner(type);
            return { ...data, type };
        } catch (e) {
            return rejectWithValue(e.response?.data);
        }
    }
);

const bannerSlice = createSlice({
    name: 'bannerSlice',
    initialState,
    reducers: {
        clearBannerMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        // getBanner
        builder
            .addCase(getBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBanner.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.desktopUrl = payload.desktopBannerUrl;
                state.mobileUrl  = payload.mobileBannerUrl;
            })
            .addCase(getBanner.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message || 'Помилка завантаження банера.';
            });

        // uploadDesktopBanner
        builder
            .addCase(uploadDesktopBanner.pending, (state) => {
                state.uploadingDesktop = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(uploadDesktopBanner.fulfilled, (state, { payload }) => {
                state.uploadingDesktop = false;
                state.desktopUrl = payload.desktopBannerUrl;
                state.mobileUrl  = payload.mobileBannerUrl;
                state.successMessage = 'Desktop-банер успішно збережено!';
            })
            .addCase(uploadDesktopBanner.rejected, (state, { payload }) => {
                state.uploadingDesktop = false;
                state.error = payload?.message || 'Помилка завантаження Desktop-банера.';
            });

        // uploadMobileBanner
        builder
            .addCase(uploadMobileBanner.pending, (state) => {
                state.uploadingMobile = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(uploadMobileBanner.fulfilled, (state, { payload }) => {
                state.uploadingMobile = false;
                state.desktopUrl = payload.desktopBannerUrl;
                state.mobileUrl  = payload.mobileBannerUrl;
                state.successMessage = 'Mobile-банер успішно збережено!';
            })
            .addCase(uploadMobileBanner.rejected, (state, { payload }) => {
                state.uploadingMobile = false;
                state.error = payload?.message || 'Помилка завантаження Mobile-банера.';
            });

        // deleteBanner
        builder
            .addCase(deleteBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteBanner.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.desktopUrl = payload.desktopBannerUrl;
                state.mobileUrl  = payload.mobileBannerUrl;
                state.successMessage = `${payload.type === 'desktop' ? 'Desktop' : 'Mobile'}-банер видалено.`;
            })
            .addCase(deleteBanner.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message || 'Помилка видалення банера.';
            });
    }
});

const { reducer: bannerReducer, actions } = bannerSlice;
const bannerActions = {
    ...actions,
    getBanner,
    uploadDesktopBanner,
    uploadMobileBanner,
    deleteBanner,
};

export { bannerReducer, bannerActions };
