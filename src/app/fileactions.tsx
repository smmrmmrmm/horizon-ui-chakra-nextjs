'use server'

// import { writeFile } from "fs/promises";s
// import { Buffer } from 'node:buffer';
import { promises as fs } from 'fs';
import { getUserCookie, getVisibles } from './actions';
import { Visibles } from 'usersanddevices/userobject';
import { Settings } from 'settings/users/settingstype';
import deviceList from 'usersanddevices/deviceobjects';
import { Device } from 'usersanddevices/deviceobjects';
import logData from 'data/logData';
import { MdDataSaverOff } from 'react-icons/md';
import { RowSelectionState } from '@tanstack/react-table';

import { DeviceSettingsType, DeviceSecondarySettingsType, UserAccessLogs } from 'settings/devices/devicesettingstype';

export type deviceandsettings = {
    devicename : string;
    settingsprimary : DeviceSettingsType;
    settingssecondary : DeviceSecondarySettingsType;
}

type RowObj = {
    logId: number;
    time: Date;
    action: string;
    userId: number;
    userName: string;
    deviceId: number;
    deviceName: string;
};

export async function myFileCreator(data: string, filename: string) {

  // 1. Convert your string into a NodeJS Buffer
//   const bufferString = Buffer.from("Hello universe!");

//   // 2. Convert your buffer into a Uint8Array
//   const content = new Uint8Array(bufferString);

  // 3. Specify file name or path

  // 4. Write the file!
  await fs.writeFile(filename, data); 
}

export async function SavePrivateLog(data:RowSelectionState){
    var cookie = null;
    try{
        cookie = await getUserCookie();
    }
    catch {
        return false
    }
    if (cookie === null || cookie === undefined) {
        return false
    }
    var saving: RowObj[] = []
    logData.forEach((row)=>{
        if(data[row.logId]){
            saving = saving.concat(row)
        }
    }
    )
    const date = new Date().toJSON()
    var file = cookie.settings.slice(0,-13) + date.slice(0, 10) +'-'+ date.slice(11,13) +'-' + date.slice(14,16) +'-'  + date.slice(17,19) + '.json'
    try{
        await myFileCreator(JSON.stringify(saving), file)
        return true
    }
    catch{
        return false
    }
}

export async function myFileRead(filename: string) {
    const data = String(await fs.readFile(filename,'utf-8'));
    return data;
}

async function getUserAccesses(device: Device){
    var devicesettingsstring;
    var devicesettings : DeviceSettingsType
    try{
        devicesettingsstring = await myFileRead(device.settings)
    }
    catch(error){
        devicesettingsstring = await myFileRead('./src/settings/devices/template.json')
    }
    finally{
        devicesettings = JSON.parse(devicesettingsstring)
    }
    return devicesettings
}


export async function getSecondariesandLogs(user: number, transparent: boolean){
    var settings : number[] = []
    var logs : number[] = []



    for(const device of deviceList){
        const data = await getSecondariesandlogsinternal(device);
        if(data.settings.includes(user)){
            settings = settings.concat(device.id)
        }
        if(!transparent){
            if(data.logs.includes(user)){
                logs = logs.concat(device.id)
            }
        }
    }
    return {settings:settings,logs:logs}
}

async function getSecondariesandlogsinternal(device: Device) {
    var devicesettingsstring;
    var devicesettings : DeviceSettingsType
    try{
        devicesettingsstring = await myFileRead(device.settings)
    }
    catch(error){
        devicesettingsstring = await myFileRead('./src/settings/devices/template.json')
    }
    finally{
        devicesettings = JSON.parse(devicesettingsstring)
    }
    const secondaries = devicesettings['User Access Settings']
    const keysec = Object.keys(secondaries) as Array<keyof typeof secondaries>;
    var i = 0;
    var devicesets : number[] = []
    keysec.forEach((key)=>{
        if(secondaries[key]){
            devicesets = devicesets.concat(i)
        }
        i++; //25/04 check here
        })
    
    const logs = devicesettings['User Access Logs']
    const keylog = Object.keys(logs) as Array<keyof typeof logs>;
    var i = 0;
    var devicelogs : number[] = []
    keylog.forEach((key)=>{
        if(logs[key]){
            devicelogs = devicelogs.concat(i)
        }
        i++; //25/04 check here
        })
    return({settings:devicesets,logs:devicelogs})
}



export async function saveSettings(data : Settings){
    var cookie = null;
    try{
        cookie = await getUserCookie();
    }
    catch {
        return false
    }
    if (cookie === null || cookie === undefined) {
        return false
    }
    else{
        await myFileCreator(JSON.stringify(data), cookie.settings)
        return true
    }
}

export async function saveDeviceSettingsPrimary(data : DeviceSettingsType[], devicenames :string[]){
    const results = await Promise.all(data.map((datlet,ind)=>{
        try{
            return internalsaveDeviceSettingsPrimary(datlet,devicenames[ind])
        }
        catch{
            return false
        }
    }))
    if(results.includes(false)){
        return false
    }
    else{
        return true
    }
}

async function internalsaveDeviceSettingsPrimary(data : DeviceSettingsType, devicename : string) {
    var visibles = null
    try{
        visibles = await getVisibles();
    }
    catch{
        return false;
    }
    if(data === null){
        throw new Error('No data')
    }
    else{
        const device = deviceList.find((device)=>(device.name == devicename))
        const backup = await getUserAccesses(device)
        const useraccesssettingsdata = backup['User Access Settings']
        const useraccesslogsdata = backup['User Access Logs']
        
        //get the users
        //refill users not accessed
        const keys1 = Object.keys(useraccesssettingsdata) as Array<keyof typeof useraccesssettingsdata>
        keys1.forEach(key=>{
            if(data['User Access Settings'][key] === null){
                data['User Access Settings'][key] = useraccesssettingsdata[key]
            }
        })

        const keys2 = Object.keys(useraccesslogsdata) as Array<keyof typeof useraccesslogsdata>
        keys2.forEach(key=>{
            if(data['User Access Logs'][key] === null){
                data['User Access Logs'][key] = useraccesslogsdata[key]
            }
        })
        //save it to the right file

        return await myFileCreator(JSON.stringify(data), device.settings)
    }
}


export async function saveDeviceSettingSecondary(data : DeviceSecondarySettingsType[], devicenames : string[] ) {
    var visibles;
    try{
        visibles = await getVisibles();
    }
    catch (error){
        return error
    }
    const deviceids = visibles.devicesecondary;
    // var devicesettingsstring : string;
    const devices = deviceList.filter(device=>
        deviceids.includes(device.id))

    for (let i = 0; i<devices.length; i++){
        const device = devices[i]

        if(data[i] === null){
            var devicesettingsstring = ''
            try{
                devicesettingsstring = await myFileRead(await getSecondarySettingsString(device.settings))
            }
            catch(error){
                devicesettingsstring = await myFileRead('./src/settings/devices/secondtemplate.json')
            }
            finally{
                data[i] = JSON.parse(devicesettingsstring)
                devicesettingsstring = ''
            }
            await myFileCreator(JSON.stringify(data[i]), await getSecondarySettingsString(device.secondarysettings))
        }
        else{
        await myFileCreator(JSON.stringify(data[i]), await getSecondarySettingsString(device.secondarysettings))
        }
    }
    return true
}

// export async function saveDeviceSettings(data : DeviceSettingsType[] ){
//     const visibles = await getVisibles();
//     if (visibles === undefined){
//         return false
//     }
//     else{
//         const deviceids = visibles.devices;
//         var devicesettingsstring : string;
//         const devices = deviceList.filter(device=>
//             deviceids.includes(device.id))

//         for (let i = 0; i<devices.length; i++){
//             const device = devices[i]
//             await myFileCreator(JSON.stringify(data[i]), device.settings)
//         }
//     }
//     return true
// }


export async function getSettingsFile(){
    var cookie = null;
    try{
        cookie = await getUserCookie();
    }
    catch {
        return false
    }
    if (cookie === null || cookie === undefined) {
        return undefined
    }
    else{
        try{
            var data = await myFileRead(cookie.settings)
        }
        catch(error){
            data = await myFileRead('./src/settings/users/template.json');
        }
        finally{
            return data
        }
    }
}


async function getSecondarySettingsString(currentstring : string){
    var cookie = null;
    try{
        cookie = await getUserCookie()
    }
    catch {
        return null
    }
    const id = cookie.id
    return currentstring + id + 'secondarysettings.json'
}


export async function getDevicesSettings(){
    var visibles:Visibles = null;
    try{
        visibles = await getVisibles();
    }
    catch (error){
        return null;
    }
    var data : deviceandsettings[] = []
    var devicesettingsstring : string;
    //console.log('visibles' , {visibles})
    await Promise.all(deviceList.map(async (device)=> {
        var primary : DeviceSettingsType= null;
        var secondary : DeviceSecondarySettingsType= null;
        if(visibles.deviceprimary.includes(device.id)){
            try{
                devicesettingsstring = await myFileRead(device.settings)
            }
            catch(error){
                devicesettingsstring = await myFileRead('./src/settings/devices/template.json')
            }
            finally{
                primary = JSON.parse(devicesettingsstring)
                devicesettingsstring = ''
            }
            const settingkeys = Object.keys(primary['User Access Settings']) as Array<keyof typeof primary['User Access Settings']>
            settingkeys.forEach((key)=>{
                if(!visibles.userids.includes(Number(key))){
                    primary['User Access Settings'][key] = null;
                }
            })
            const logkeys = Object.keys(primary['User Access Logs']) as Array<keyof typeof primary['User Access Logs']>
            logkeys.forEach((key)=>{
                if(!visibles.userids.includes(Number(key)) || visibles.transparent){
                    primary['User Access Logs'][key] = null;
                }
            })
        }
        if(visibles.devicesecondary.includes(device.id) || primary !== null){
            try{
                devicesettingsstring = await myFileRead(await getSecondarySettingsString(device.settings))
            }
            catch(error){
                devicesettingsstring = await myFileRead('./src/settings/devices/secondtemplate.json')
            }
            finally{
                secondary = JSON.parse(devicesettingsstring)
                devicesettingsstring = ''
            }
        }
        if(primary!==null || secondary!=null){
            data = data.concat([{devicename:device.name,settingsprimary:primary,settingssecondary:secondary}])
        }
        
    }))
    // console.log(data[0])
    return data;
}



        //    if (user !== null){
//       console.log('hi');
//       myFileRead(user.settings).then((value)=>setfilestate(value));
//     }
//   },[]);

//   if(readfile === undefined){
//     useEffect(() => {
//       settemplate(null);
//       myFileRead('/settings/settingstype.tsx').then((value)=>settemplate(value));