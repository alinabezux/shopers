import { Box, Typography } from '@mui/joy';

const AnalyticsTable = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: 'column',
                    alignItems: 'start',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="h2" component="h1">
                    Аналітика
                </Typography>
                <iframe
                    title="Аналітика Looker Studio"
                    width="100%"
                    height="750"
                    src="https://lookerstudio.google.com/embed/reporting/12863f4e-f57c-4b00-a60e-b9d43764f965/page/M4dUF"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: '20px' }}
                    allowFullScreen
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                />
            </Box>
        </Box>
    );
};

export { AnalyticsTable };
