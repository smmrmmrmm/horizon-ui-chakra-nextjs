'use client'
/* HOME */

import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { filterLog } from 'app/filter';

import Log from 'views/iot/dashboard/components/Log';

import LogBig from 'views/iot/activity/LogBig'
import { SavePrivateLog } from 'app/fileactions';

// full logs! (maybe filter by available users)

export default function dashboard({}) {
  // const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColor = 'blue'

  const [logData, setlogstate] = useState(null);
    useEffect(() => {
    setlogstate(null);
    filterLog().then(value=> {
      setlogstate(value)
      })
    },[]);
  return(
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <LogBig tableData={logData} max={0} />

  </Box>
  )
}
