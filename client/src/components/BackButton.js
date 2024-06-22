import React from 'react';
import {useNavigate} from "react-router-dom";
import WestRoundedIcon from "@mui/icons-material/WestRounded";

const BackButton = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <WestRoundedIcon sx={{fontSize: 30}} onClick={handleBack}/>
    );
};

export {BackButton};