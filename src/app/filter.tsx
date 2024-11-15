'use server'


import { useState, useEffect } from "react";
import { getVisibles, getTransparent } from "./actions";
import { Visibles } from "usersanddevices/userobject";

import { NotdevObj } from "data/notdevData";
import { NotsetObj } from "data/notsetData";
import notdevData from "data/notdevData";
import notsetData from "data/notsetData";

import deviceData from "data/deviceData";

import logData from "data/logData";

import { DevObj } from "data/deviceData";


export  async function filterDevices(){
    var transparent = null
    try{
        transparent = await getTransparent()
    }
    catch{
        return null;
    }

    if(transparent){
        return deviceData;
    }
    var visibles : Visibles;
    try{
        visibles = await getVisibles();
    }
    catch {
        return []
    }
    var data : DevObj[] = []
    deviceData.map((row)=> {
        if(visibles.deviceslogs.includes(row.id) || visibles.userids.includes(row.userid)){
            data = data.concat([row])
        }
    })
    return data;
};


type RowObj2 = {
    logId: number;
    time: Date;
    action: string;
    userId: number;
    userName: string;
    deviceId: number;
    deviceName: string;
};

export async function filterLog(){
    var transparent = null
    try{
        transparent = await getTransparent()
    }
    catch{
        return null 
    }
    if(transparent){
        return logData;
    }
    var visibles : Visibles;
    try{
        visibles = await getVisibles();
    }
    catch {
        return []
    }
    var data : RowObj2[] = []
    logData.map((row)=> {
        if(visibles.deviceslogs.includes(row.deviceId) || visibles.userids.includes(row.userId)){
            data = data.concat([row])
        }
    })
    return data;
        
};


export async function filterNotification() : Promise<{devdata: NotdevObj[]; setdata: NotsetObj[]}> {
    var transparent = null;
    try{
        const transparent = await getTransparent()
    }
    catch{
        return null
    }
    if(transparent){
        return {devdata: notdevData, setdata: notsetData};
    }

    var visibles : Visibles;
    try{
        visibles = await getVisibles();
    }
    catch {
        return undefined
    }
    if(visibles === null){
        return {devdata: [], setdata: []}
    }
    var data1 : NotdevObj[] = [];
    notdevData.map((row) => {
        if(visibles.deviceslogs.includes(row.device.id) || visibles.userids.includes(row.perp) || visibles.userids.some(r =>  row.device.users.includes(r))){
            data1 = data1.concat([row])
        }
    });

    var data2 : NotsetObj[] = [];
    notsetData.map((row) => {
        if(visibles.userids.includes(row.perp)){
            data2 = data2.concat([row])
        } 
    });



    return {devdata: data1, setdata: data2}

};







// {state === 'loading' ? ('waitin'):JSON.stringify(state)}


// function filter(bigdata:RowObj[],filtering:display){
// 	var totals : number[] = [];
// 	var labels : string[] = [];
// 	switch(filtering){
// 		case 'device':
// 			bigdata.forEach(row => {
// 				totals.push(row.watt);
// 				labels.push(row.name);
// 			});
// 			return({totals:totals,labels:labels, title:'device'});
// 			break;
// 		case 'room':
// 			bigdata.forEach(row =>  {
// 				const i = labels.findIndex(y => y === row.room);
// 				if(i === -1){
// 					totals.push(row.watt);
// 					labels.push(row.room);
// 				}
// 				else{
// 					totals[i] += row.watt;
// 				}
// 			});
// 			return({totals:totals,labels:labels, title:'room'});
// 			break;
// 		case 'type':
// 			bigdata.forEach(row =>  {
// 				const i = labels.findIndex(y => y === row.type);
// 				if(i === -1){
// 					totals.push(row.watt);
// 					labels.push(row.type);
// 				}
// 				else{
// 					totals[i] += row.watt;
// 				}
// 			});
// 			return({totals:totals,labels:labels, title:'type'});
// 			break;
// 		case 'user':
// 			bigdata.forEach(row =>  {
// 				const i = labels.findIndex(y => y === row.user);
// 				if(i === -1){
// 					totals.push(row.watt);
// 					labels.push(row.user);
// 				}
// 				else{
// 					totals[i] += row.watt;
// 				}
// 			});
// 			return({totals:totals,labels:labels, title:'user'});
// 			break;			
// 	}
// }