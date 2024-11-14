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
  cookieStorageManager,
  Card,
  Switch,
  Heading,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';

import{ User } from 'usersanddevices/userobject';
import userList from 'usersanddevices/userobject';
import { cookies } from 'next/headers';

import { createUser} from 'app/actions'

import { useForceUpdate } from '@chakra-ui/react';

import { deviceandsettings, myFileCreator, myFileRead, getSettingsFile, saveSettings, getDevicesSettings, saveDeviceSettingsPrimary, saveDeviceSettingSecondary } from 'app/fileactions';
import { useEffect, useState } from 'react';

import { getUserCookie } from 'app/actions';

import { DeviceSettingsType, DeviceSecondarySettingsType } from 'settings/devices/devicesettingstype';

import SettingsMenu from 'components/menu/SettingsMenu'

import { Settings } from 'settings/users/settingstype';
import { read } from 'fs';
import { json } from 'stream/consumers';


function hasItSaved(hasit : boolean){
  if (hasit){
    return(
      <Heading> All settings saved :) </Heading>
    )
  }
  else {
    return(
      <Heading> Beware! You have unsaved settings! </Heading>
    )
  }
}

const array = [0]



export default function dashboard({}) {
  const textColor = 'navy'

  const [readfile, setfilestate] = useState(null);

  const [readdevices, setdevicestate] = useState<deviceandsettings[]>(null);

  const [filterstate, setfilterstate] = useState<string>('all')

  const [data, setdata] = useState<deviceandsettings>(null)

  const [saved, setsaved] = useState<boolean>(true)
  

  useEffect(() => {
    setfilestate(null);
    getSettingsFile().then((value)=>setfilestate(value));
  },[]);

  useEffect(()=>{
    setdevicestate(null);
    getDevicesSettings().then((value)=>setdevicestate(value));
  },[]);

  function changeDisplay(state:string) {
    setfilterstate(state);
    for (const obj of readdevices){
      if(obj.devicename == state){
        setdata(obj)
      }
    }
    
  }
  
  if(readfile === null || readdevices === null) {
    return(
      <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
          <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
          </Text>
          <Text>
          loading
          </Text>
          </Card>
      )
  }
  else {

    const data : Settings = JSON.parse(readfile);
    var notifications = data.Notifications;
    const notificationkeys = Object.keys(notifications) as Array<keyof typeof notifications>;
    var devicegen = data.Devices;
    const devicekeysgen = Object.keys(devicegen) as Array<keyof typeof devicegen>;



    var primarysettings : DeviceSettingsType[] = [];
    var secondarysettings : DeviceSecondarySettingsType[] = [];
    var names : string[] = []

    for (const obj of readdevices){
      names = names.concat([obj.devicename]);
      primarysettings = primarysettings.concat([obj.settingsprimary])
      secondarysettings = secondarysettings.concat([obj.settingssecondary])
    }


    // for (const obj  of readdevices){
    //   names = names.concat([obj.devicename]);
    //   ne = newdevicesettings.concat([obj.settings])
    // }

    // const devicesettings : Object[] = [... newdevicesettings];
  


    return(
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        {hasItSaved(saved)}
        <SimpleGrid        
        columns={{ base: 2, md: 2, lg: 2, '2xl': 6 }}
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
          <Heading>
            Notification Settings
          </Heading>

          { notificationkeys.map((key) => {
            var value = notifications[key];
            return(
              <Text>
              {key}
              <Switch id={key} defaultChecked={Boolean(value)} onChange={()=>{value=!value; notifications[key] = value; setsaved(false)}}></Switch>
              </Text>
            )
          })}
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
          <Heading>
            Device Settings
          </Heading>
          <Text color={textColor}>
            General Settings
          </Text>

          { devicekeysgen.map((key) => {
            var value = devicegen[key];
            return(
              <Text>
              {key}
              <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; devicegen[key] = value; setsaved(false)}}></Switch>
              </Text>
            )
          })}

          <Text color={textColor}>
            Device Settings <SettingsMenu devicenames={names} changestate={changeDisplay} />
          </Text>

          {  array.map( () => {
            const ind = names.indexOf(filterstate);

            if ( ind == -1) {
              return(
                <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
                <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
                </Text>
                <Text>
                No Device Selected
                </Text>
                </Card>
              )
            }
            else {
              const secondary = secondarysettings[ind];
              const primary = primarysettings[ind];

              var secondaryflex = <Flex></Flex>;
              var general = <Flex></Flex>;
              var access = <Flex></Flex>;
              var log= <Flex></Flex>;

              if(secondary !== null){
                const secondarykeys = Object.keys(secondary) as Array<keyof typeof secondary>;
                secondaryflex = <Flex flexDirection="column"> 
                  {secondarykeys.map((key)=>{
                  var value = Boolean(secondary[key]);
                  return(

                    <Flex    
                    gap="10px"   >
                    <Text>
                      {key}
                      </Text>
                      <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; secondarysettings[ind][key] = value; setsaved(false)}}></Switch>
        
                    </Flex>
                  )
                  } )
                }
                </Flex>
              }
              else{
                secondaryflex = null
              }
              //return(secondaryflex)
              if(primary !== null){
                const generals = primary['General Settings'];

                const generalkeys = Object.keys(generals) as Array<keyof typeof generals>;

                general = <Flex flexDirection="column">
                  {generalkeys.map((key)=>{
                    var value1 = Boolean(generals[key]);
                    return(
                      <Flex gap="10px" > 
                      <Text>
                      {key}
                      </Text>
                      <Switch id={key} defaultChecked={value1} onChange={()=>{value1=!value1; primarysettings[ind]['General Settings'][key] = value1; setsaved(false)}}></Switch>
        
                      </Flex>

                    )
                  })}
                </Flex>
                //return(secondaryflex)

                const accesses ={... primary['User Access Settings']};
                const accesskeys = Object.keys(accesses) as Array<keyof typeof accesses>;
                access = <Flex flexDirection="column">
                  {accesskeys.map((key)=>{
                    var value2 = accesses[key];
                    if(value2 === null){
                      return(
                        <Text></Text>
                      )
                    }
                    return(
                      <Flex gap="10px" > 
                      <Text>
                      {userList[Number(key)].name}
                      </Text>

                      <Popover trigger='hover' id={key} gutter={20} >
                        <PopoverTrigger>
                          <Switch id={key} defaultChecked={value2} onChange={()=>{value2=!value2; primarysettings[ind]['User Access Settings'][key]= value2; setsaved(false)}}></Switch>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Caution</PopoverHeader>
                          <PopoverBody>Turning off these setting may have adverse effects on other user's experience</PopoverBody>
                        </PopoverContent>
                      </Popover>


                      
                      </Flex>

                    )
                  })}
                </Flex>


                    const logs ={... primary['User Access Logs']};
                    if(false){
                      log = <Flex> You can't change user access to logs as this mode is transparent </Flex>
                    }
                    else{
                    const logkeys = Object.keys(logs) as Array<keyof typeof logs>;
                    log = <Flex flexDirection="column">
                      {logkeys.map((key)=>{
                        var value3 = logs[key];
                        if(value3 === null){
                          return(
                            <Text></Text>
                          )
                        }
                        return(
                          <Flex gap="10px" > 
                          <Text>
                          {userList[Number(key)].name}
                          </Text>

                          <Popover trigger='hover' id={key} gutter={20} >
                            <PopoverTrigger>
                              <Switch id={key} defaultChecked={value3} onChange={()=>{value3=!value3; primarysettings[ind]['User Access Logs'][key]= value3; setsaved(false)}}></Switch>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader>Caution</PopoverHeader>
                              <PopoverBody>Turning off these setting may have adverse effects on other user's experience</PopoverBody>
                            </PopoverContent>
                          </Popover>
                          </Flex>

                        )
                      })}
                    </Flex>
                    }


                    return(
                      <Flex flexDirection="column" gap='10px'>
                          <Text color={textColor}>
                        {names[ind]}  
                        </Text>
                        <Text color={textColor}>
                        General Settings - these are representative and not part of the study
                        </Text>
                        {secondaryflex }
                        {general}
                        <Text color={textColor}>
                        Which users can access this device's settings?
                        </Text>
                        {access}
                        <Text color={textColor}>
                        Which users can see this device's log?
                        </Text>
                        {log}
                      </Flex>
                    )

                    }
                else{
                  return(
                    <Flex flexDirection="column" gap='10px'>
                        <Text color={textColor}>
                      {names[ind]}  
                      </Text>
                      <Text color={textColor}>
                      General Settings
                      </Text>
                      {secondaryflex }
                    </Flex>
                  )
                }

                //return(secondaryflex)

              }

          //     const devicekeys = Object.keys(device) as Array<keyof typeof device>;
          //     return(
          //       <Flex         flexDirection="column">
          //         <Text color={textColor}>
          //           {names[ind]}  
          //         </Text>
          //         {devicekeys.map((key)=>{
          //         var value = device[key];
          //         return(

          //           <Flex    
          //           gap="10px"   >
          //           <Text>
          //             {key}
          //             </Text>
          //             <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; newdevicesettings[ind][key]=value; setsaved(false)}}></Switch>
        
          //           </Flex>
          //     )
          //   })
          // }
          // </Flex>
          // )
        
        })
      }
    

        {/* // {devicesettings.map((device,index)=>{
        //   const devicekeys = Object.keys(device) as Array<keyof typeof device>;
        //   return(
        //     <Flex>
        //       <Text color={textColor}> {names[index]} </Text>
        //       {devicekeys.map((key)=>{
        //         var value = device[key];
        //         return(
        //           <Text>
        //             {key}
        //             <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; newdevicesettings[index][key]=value}}></Switch>
        //           </Text>
        //         )
        //       })}

        //     </Flex>
        //   )
        // })} */}


        </Flex>



        </SimpleGrid>

        <Button onClick={()=>{const set = saveSettings({Notifications:notifications,Devices:devicegen});
          const prim = saveDeviceSettingsPrimary(primarysettings,names);
          const sec = saveDeviceSettingSecondary(secondarysettings,names)
            if (set && prim && sec){
              setsaved(true)
            }
          }
        }> Save </Button>
        
    </Box>
    )
  }
}








// return(
//   <Box>
//     hi
//   </Box>
// )

  // useEffect(() => {
  //   setuser(null);
  //   getUserCookie().then((value)=>setuser(value));
  // },[]);

  // if (user === null){
  //   return(
  //     <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
  //         <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
  //         </Text>
  //         <Text>
  //         loading
  //         </Text>
  //         </Card>
  //     )
  // };

  // useEffect(() => {
  //   setfilestate(null);
  //   if (user !== null){
  //     console.log('hi');
  //     myFileRead(user.settings).then((value)=>setfilestate(value));
  //   }
  // },[]);

  // if(readfile === undefined){
  //   useEffect(() => {
  //     settemplate(null);
  //     myFileRead('/settings/template.json').then((value)=>settemplate(value));
  //   },[]);

  //   if(template === null){
  //     return(
  //       <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
  //           <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
  //           </Text>
  //           <Text>
  //           loading 1
  //           </Text>
  //           </Card>
  //       )

  //   };

  //   if(template === undefined){
  //     return(
  //       )
  //   }

  //   setfilestate(template);

  // };

  // if(readfile === null){
  //   return(
	// 		<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
	// 			  <Text  fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>				  
  //         </Text>
	// 			  <Text>
	// 			  loading 2
	// 			  </Text>
	// 			  </Card>
	// 	  )
  // };


