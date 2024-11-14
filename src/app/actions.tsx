'use server'
 
import { cookies } from 'next/headers'
import userList, { User, Visibles } from 'usersanddevices/userobject'
import { Hierarchy } from 'hierarchies/hierarchies'
import hierarchyList from 'hierarchies/hierarchies'
import deviceList from 'usersanddevices/deviceobjects'
import { getSecondariesandLogs } from './fileactions'
import { MdVideoStable } from 'react-icons/md'




export async function getUserCookie(){
    const userc =  cookies().get('user');
    if (userc === undefined){
        throw new Error('No User Cookie')
    };
    const usercookie = userc.value;
    const userobject = userList.find(element => String(element.id) == usercookie);
    if (userobject === undefined){
        throw new Error('Cookie invalid')
    }
    else{
        return userobject
    };
};


export async function getUserandMode(){
    var username =  ''
    var modename = ''
    const userc = cookies().get('user');
    const modec = cookies().get('mode');
    if(userc === undefined){
        username = 'No user selected'
    }
    else{
        username = userList.find(element => String(element.id) == userc.value).name
        if (username === undefined){
            username = 'No user selected'
        }
    }
    if(modec === undefined){
        modename = 'No mode selected'
    }
    else{
        modename = hierarchyList.find(element => String(element.id) == modec.value).mode
        if (modename === undefined){
            modename = 'No mode selected'
        }
    }
    return ({username:username, modename:modename})
}


export async function createUser(data:User) {
    cookies().set({
        name: 'user',
        value: String(data.id),
        httpOnly: true,
        path: '/',
    })
    return data.name
};

export async function createMode(data:Hierarchy) {
    cookies().set({
        name: 'mode',
        value: String(data.id),
        httpOnly: true,
        path: '/'
    })
    return data.mode
};

export async function deleteUserCookie() {
    cookies().delete('user')
    return 'No user selected'
};

export async function deleteModeCookie() {
    cookies().delete('mode')
    return('No mode selected')
};

export async function getTransparent(){
    const modec = cookies().get('mode');
    if ((modec === undefined)){
        throw new Error('No mode cookie')
    }
    else{
        if(Number(modec.value) > 2){
            return true
        }
        else{
            return false
        }
    }
}

export async function getVisibles() {
    const modec = cookies().get('mode');
    const userc = cookies().get('user');
    if ((modec === undefined) || (userc === undefined)){
        throw new Error('Cookies Undefined')
    }
    else{
        const modecookie = modec.value;
        const modeobject = hierarchyList.find(element => String(element.id) == modecookie);
        const usercookie = userc.value;
        const userobject = userList.find(element => String(element.id) == usercookie);
        if (modeobject !== undefined && userobject !== undefined) {
            var visibles : Visibles = {userids: [], deviceprimary: [], devicesecondary: [], deviceslogs: [], transparent: false}
            var level = 1;
            if(modeobject.superusers.includes(userobject) || modeobject.supertransparent.includes(userobject)){
                level = 0;
            }
            //transparent not default
            var transparent = false;
            if(modeobject.id > 2){
                visibles.transparent = true
                transparent = true
            }

            // Users you can affect
            if(level == 0){
                visibles.deviceprimary = visibles.deviceprimary.concat(deviceList.map((device)=>device.id))
                if(transparent){
                    visibles.userids = visibles.userids.concat(modeobject.supertransparent.map((user) => user.id));
                    visibles.userids = visibles.userids.concat(modeobject.transparent.map((user) => user.id));
                }
                else{
                    visibles.userids = [userobject.id]
                    visibles.userids = visibles.userids.concat(modeobject.users.map((user) => user.id));
                }
            }
            if(level == 1){
                visibles.userids = [userobject.id]
                deviceList.forEach((device)=>{
                    if(device.users.includes(userobject.id)){
                        visibles.deviceprimary = visibles.deviceprimary.concat([device.id])
                    }
                    }
                )
                if(transparent){
                    visibles.userids = visibles.userids.concat(modeobject.transparent.map((user)=>user.id));
                }
            }



            const data = await getSecondariesandLogs(userobject.id, transparent)
            // console.log('getthesettings',data)
            // Devices secondary control - the same for both
            
            visibles.devicesecondary = data.settings;

            // Device log control - by type

            // normal

            // transparent

            if(transparent){
                visibles.deviceslogs = visibles.deviceslogs.concat(deviceList.map((device)=>device.id))
            }
            else{
                visibles.deviceslogs = data.logs;
            }
            return visibles            
            // //bject.superusers.includes(userobject)){
            //     visibles.users = visibles.users.concat([userobject],modeobject.users)
            // }
            // else if (modeobject.supertransparent.includes(userobject)){
            //     visibles.users = visibles.users.concat(modeobject.transparent,modeobject.supertransparent)
            // }
            // else if (modeobject.users.includes(userobject)){
            //     visibles.users = visibles.users.concat([userobject])
            // }
            // else if(modeobject.transparent.includes(userobject)){
            //     visibles.users = visibles.users.concat(modeobject.transparent)
            // }
            // else {
            //     return undefined
            // };
            // visibles.users.forEach((user)=> {
            //     visibles.devices = visibles.devices.concat(user.devices);
            //     visibles.userids = visibles.userids.concat(user.id);
                
            // });
            // const setdevices = [...new Set(visibles.devices)]
            // visibles.devices = Array.from(setdevices.values())
            // return visibles

        }
        else {
            throw new Error('Cookies undefined')
        };
    };
};



