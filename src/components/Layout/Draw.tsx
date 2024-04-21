import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#17172C', color: 'white', p: 3, width: '100%' }}>
      <Typography variant="body2" color="inherit" align="center">
        © {new Date().getFullYear()} Your Website Name
      </Typography>
      <Typography  color="inherit" fontSize="12px" sx={{opacity:'0.5'}} align="center">
      2024 BabyLoong all right reserved</Typography>
    </Box>
  );
};

export default Footer;
