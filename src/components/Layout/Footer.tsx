import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', p: 3, position: 'fixed', bottom: 0, width: '100%' }}>
      <Typography variant="body2" color="inherit" align="center">
        © {new Date().getFullYear()} Your Website Name
      </Typography>
    </Box>
  );
};

export default Footer;
