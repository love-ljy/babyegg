import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const LoadingAnimation :React.FC<{open:boolean}>= ({open}) => {
    return (
        <>
             <Backdrop  sx={{ color: '#fff', zIndex: 9999 }} open={open}>
             <CircularProgress  color="inherit" />
                </Backdrop>
        </>
    )
};

export default LoadingAnimation;