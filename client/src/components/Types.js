import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const Types = () => {
    const {types} = useSelector(state => state.typeReducer);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {
                types.map(type =>
                    <Typography variant="h5" key={type._id} sx={{
                        fontFamily: 'Geologica, sans-serif',
                        fontSize: '20px',
                        textTransform: 'lowercase',
                        fontWeight: 300,
                        mx: "7px",
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: "#9E2922"
                        },

                    }}>
                        {type.name}
                    </Typography>
                )
            }
        </Box>
    );
};

export default Types;