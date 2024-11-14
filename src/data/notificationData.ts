import { Device } from "usersanddevices/deviceobjects";
// import notdevData from "./notdevData";
// import notsetData from "./notsetData";
import { RowSelection } from "@tanstack/react-table";

import { NotdevObj } from "./notdevData";
import { NotsetObj } from "./notsetData";



export type NotRow = {
    type: 'setting' | 'device';
    time: Date;
    state: boolean;
    thing: string;
    message: string;
};

export function notificationDataSort(notdevDat: NotdevObj[], notsetDat: NotsetObj[]){
    var notData : NotRow[] = [];


    notdevDat.map((rowobj)  => {
        notData = notData.concat([{thing: rowobj.device.name, type: 'device', time: rowobj.time, state: rowobj.state, message: rowobj.message}])
    })

    notsetDat.map((rowobj) => {
        notData = notData.concat([{thing: rowobj.setting, type: 'setting',time:rowobj.time,state:rowobj.state,message:rowobj.message}])
    })

    const using = ([...notData].sort((a,b)=> b.time.getTime() - a.time.getTime()))

    return using;
};
