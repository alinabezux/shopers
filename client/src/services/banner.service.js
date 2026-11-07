import { $authHost, $host } from "./axios.service";
import { urls } from "../configs/urls";

const bannerService = {
    getBanner: () => $host.get(urls.banner),
    uploadDesktopBanner: (formData) => $authHost.patch(`${urls.banner}/desktop`, formData),
    uploadMobileBanner:  (formData) => $authHost.patch(`${urls.banner}/mobile`, formData),
    deleteBanner: (type) => $authHost.delete(urls.banner, { params: { type } }),
};

export { bannerService };
