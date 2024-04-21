import React from 'react';
import Box from '@mui/material/Box';
import Image from "next/image";
import Typography from '@mui/material/Typography';
import { Button,Container } from '@mui/material';


interface GameCardProps {
    title: string;
    comingsoon: boolean;
    description: string;
    image: any;
    onClick?: () => void;
}
const GameCard: React.FC<GameCardProps> = ({title,comingsoon,description,image,onClick}) => {
  return (
    <Box >
      <Image src={image} objectFit="cover"  alt=""/>
      <Container>
      <Typography textAlign="left" color="#fff" fontSize="20px" fontWeight={900} mt={3}>{title}</Typography>
      {comingsoon&&<Typography textAlign="left" color="#D209AC" fontSize="15px">即将推出</Typography>}
      <Typography textAlign="left" color="#fff" fontWeight={400} fontSize="14px" mt={2}>{description}</Typography>
      <Button sx={{marginTop:'20px'}} variant="contained" onClick={onClick}>探索游戏</Button>
      </Container>
    </Box>
  );
};

export default GameCard;
