import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-G2QBZGYFP3", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}
