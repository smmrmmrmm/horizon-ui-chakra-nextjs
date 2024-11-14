import { Device } from "usersanddevices/deviceobjects";
import deviceList from "usersanddevices/deviceobjects";

export type NotdevObj = {
    state: boolean;
    device: Device;
    perp: number;
    message: string;
    time: Date;
};

const notdevData : NotdevObj[] = [
    //doorbell
    {
        state: true,
        device: deviceList[0],
        perp: 0,
        message: 'motion detected',
        time: new Date('2024-01-24T03:43:00')
    },
    {
        state: true,
        device: deviceList[0],
        perp: 0,
        message: 'Motion detected',
        time: new Date('2024-01-24T09:44:00'),
    },
    {
        state: true,
        device: deviceList[0],
        perp: 0,
        message: 'Motion detected',
        time: new Date('2024-01-24T12:44:00'),
    },
    {
        state: true,
        device: deviceList[0],
        perp: 3,
        message: 'Doorbell rang',
        time: new Date('2024-01-24T17:45:00'),
    },
    {
        state: true,
        device: deviceList[0],
        perp: 1,
        message: 'Doorbell rang',
        time: new Date('2024-01-24T12:45:00'),
    },   
    //backdoor
    {
        state: true,
        device: deviceList[2],
        perp: 3,
        message: 'Lock usage outside of set window',
        time: new Date('2024-01-24T03:45:00'),
    },
    {
        state: true,
        device: deviceList[2],
        perp: 3,
        message: 'Lock usage outside of set window',
        time: new Date('2024-01-24T03:45:15'),
    },
    //charlottespeaker
    {
        state: true,
        device: deviceList[3],
        perp: 2,
        message: 'Connect Bluetooth',
        time: new Date('2024-01-24T03:48:00'),
    },
    //kitchenlight
    {
        state: true,
        device: deviceList[5],
        perp: 2,
        message: 'Turn on',
        time: new Date('2024-01-24T03:45:30'),
    },
    {
        state: true,
        device: deviceList[5],
        perp: 2,
        message: 'Turn off',
        time: new Date('2024-01-24T03:46:00'),
    },
    {
        state: true,
        device: deviceList[5],
        perp: 1,
        message: 'Turn on',
        time: new Date('2024-01-24T06:30:30'),
    },
    {
        state: true,
        device: deviceList[5],
        perp: 3,
        message: 'Turn off',
        time: new Date('2024-01-24T07:00:00'),
    },
    {
        state: true,
        device: deviceList[5],
        perp: 0,
        message: 'Turn on',
        time: new Date('2024-01-24T17:30:00'),
    },
    {
        state: true,
        device: deviceList[5],
        perp: 0,
        message: 'Turn off',
        time: new Date('2024-01-24T22:45:30'),
    },
    //loungelight
    {
        state: true,
        device: deviceList[6],
        perp: 1,
        message: 'Turn on',
        time: new Date('2024-01-24T06:40:30'),
    },
    {
        state: true,
        device: deviceList[6],
        perp: 2,
        message: 'Turn off',
        time: new Date('2024-01-24T10:46:30'),
    },
    {
        state: true,
        device: deviceList[6],
        perp: 0,
        message: 'Turn on',
        time: new Date('2024-01-24T17:45:45'),
    },
    {
        state: true,
        device: deviceList[6],
        perp: 1,
        message: 'Turn off',
        time:new Date('2024-01-24T22:45:30'),
    },
    //loungespeaker
    {
        state: true,
        device: deviceList[7],
        perp: 1,
        message: 'Play music',
        time: new Date('2024-01-24T08:30:00'),
    },
    {
        state: true,
        device: deviceList[7],
        perp: 2,
        message: 'Connect to television',
        time:  new Date('2024-01-24T17:40:00'),
    },
    //kidtablet
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'AppleFarmFriends needs Oats!',
        time: new Date('2024-01-24T06:15:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'Tap Tap Go!! misses you :(',
        time: new Date('2024-01-24T06:16:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'Come back! Your cows are starving!!',
        time: new Date('2024-01-24T06:17:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'Quick! A shiny hedghog has been spotted!',
        time: new Date('2024-01-24T06:10:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'WOW!! Your farm has a VIP visitor!',
        time: new Date('2024-01-24T06:11:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'Tap Tap Go!! misses you :(',
        time: new Date('2024-01-24T06:15:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'NEW ROCKS! Dig now!',
        time: new Date('2024-01-24T06:20:00')
    },
    {
        state: true,
        device: deviceList[8],
        perp: 4,
        message: 'Tap Tap Go!! misses you :(',
        time: new Date('2024-01-24T06:30:00')
    },
];


export default notdevData;