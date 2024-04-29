import React from 'react';
import Box from '@mui/material/Box';
import Image from "next/image";
import Typography from '@mui/material/Typography';
import { Button,Container } from '@mui/material';
import { useTranslation } from 'next-i18next'

interface GameCardProps {
    title: string;
    comingsoon: boolean;
    description: string;
    image: any;
    onClick?: () => void;
}
const GameCard: React.FC<GameCardProps> = ({title,comingsoon,description,image,onClick}) => {
    // @ts-ignore
    const { t } = useTranslation('common')
  return (
    <Box >
      <Image  width={350} height={220} src={image}   alt=""/>
      <Container>
      <Typography textAlign="left" color="#fff" fontSize="20px" fontWeight={900} mt={3}>{title}</Typography>
      {comingsoon&&<Typography textAlign="left" color="#D209AC" fontSize="15px">{t('Coming Soon')}</Typography>}
      <Typography textAlign="left" color="#fff" fontWeight={400} fontSize="14px" mt={2}>{description}</Typography>
      <Button sx={{marginTop:'20px'}} variant="contained" onClick={onClick}>{t('Explore Game')}</Button>
      </Container>
    </Box>
  );
};

export default GameCard;
