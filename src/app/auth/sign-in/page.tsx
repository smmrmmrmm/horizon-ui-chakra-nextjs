'use client';
/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  SimpleGrid,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import UserMenu from 'components/menu/UserMenu';
import {User} from 'usersanddevices/userobject'
import userList from 'usersanddevices/userobject';

import ModeMenu from 'components/menu/ModeMenu'
import { Hierarchy } from 'hierarchies/hierarchies';
import hierarchyList from 'hierarchies/hierarchies';

import { deleteUserCookie, deleteModeCookie, getVisibles, getUserandMode, createUser, createMode } from 'app/actions';
import { useState, useEffect } from 'react'


// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
import { validateHeaderName } from 'http';
import { cookies } from 'next/headers';
// Assets
// import Link from 'next/link';
// import { FcGoogle } from 'react-icons/fc';
// import { MdOutlineRemoveRedEye } from 'react-icons/md';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { cookies } from 'next/headers';

type cookies = {
  username:string;
  modename:string
}
function showuser(cookievalues : string){
  if (cookievalues === null){
    return(<Text></Text>);
  }
  else{
  return(
    <Text>
      Current User: {cookievalues}
    </Text>
  )
}
}
function showmode(cookievalues : string){
  if (cookievalues === null){
    return(<Text></Text>);
  }
  else{
  return(
    <Text>
      Current Mode: {cookievalues}
    </Text>
  )
}
}


export default function SignIn() {
  // Chakra color mode
  const [cookieuser, setuser] = useState(null);
  const [cookiemode, setmode] = useState(null)

  useEffect(() => {
    getUserandMode().then(value=> {
      setuser(value.username);
      setmode(value.modename)
      })
    },[]);

  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  return (
    //<DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid        
          columns={{ base: 1, md: 2, lg: 2, '2xl': 6 }}
          gap="20px"
          mb="20px">
        <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="top"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
        gap="50px"
      > 

      <Heading >
        User Sign In
      </Heading>

      { showuser(cookieuser) }


      {userList.map((user)=>{
        return(<Button key={user.id}
          onClick={() => {setuser(createUser(user))}}>
            { user.name }
          </Button>)
      })}
      
      <Button 
      onClick={()=>setuser(deleteUserCookie())}>
        Sign out
      </Button>
      </Flex> 

      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="top"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
        gap="50px"
      >
        <Heading >
          Mode Selection
        </Heading> 

        { showmode(cookiemode) }

      {hierarchyList.map((mode)=>	{ 
        return(
			<Button key={mode.id}
			onClick={() => {setmode(createMode(mode))}}>
				{ mode.mode }
			</Button>)})}

      <Button
      onClick={()=>{setmode(deleteModeCookie())}}>
        Remove Mode Selection
      </Button>

      

      </Flex>

      </SimpleGrid>
      </Box>
    //</DefaultAuthLayout>
  );
}
