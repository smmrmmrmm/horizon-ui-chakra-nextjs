// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Image from 'next/image'
import image from 'views/iot/dashboard/variables/18C.png'

export default function Conversion(props: { [x: string]: any }) {
	const {... rest}= props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	return (
		<Card p='100px' alignItems='center' flexDirection='column' w='100%' >
		
		<Image fill={true} src={image} alt={'image'} />

            
        </Card>




    )
    }