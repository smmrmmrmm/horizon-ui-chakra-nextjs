import { Device } from "usersanddevices/deviceobjects";
import deviceList from "usersanddevices/deviceobjects";

export type DevObj = {
    device: Device;
    id: number;
    name: string;
    type: string;
    room: string;
    watt: number;
    status: boolean;
    user: string;
    userid: number;
};


const deviceData: DevObj[] = [
	{
        device: deviceList[0],
        id: 0,
        name: 'doorbell',
        type: 'security',
        room: 'external',
        watt: 5,
        status: true,
        user: 'Alice',
        userid: 0

    },
    {
        device: deviceList[1],
        id: 1,
        name: 'frontdoorlock',
        type: 'lock',
        room: 'external',
        watt: 45,
        user: 'Alice',
        status: true,
        userid: 0
    },
    {
        device: deviceList[2],
        id: 2,
        name: 'backdoorlock',
        type: 'lock',
        room: 'external',
        watt: 2,
        user: 'Alice',
        status: true,
        userid: 0
    },
    {
        device: deviceList[3],
        id: 3,
        name: 'charlottespeaker',
        type: 'entertainment',
        room: 'bedroom',
        watt: 4,
        user: 'Charlotte',
        status: false,
        userid: 2
    },
    {
        device: deviceList[4],
        id: 4,
        name: 'babymonitor',
        type: 'entertainment',
        room: 'bedroom',
        watt: 22,
        user: 'Alice',
        status: false,
        userid: 0
    },
    {
        device: deviceList[5],
        id: 5,
        name: 'kitchenlight',
        type: 'light',
        room: 'kitchen',
        watt: 20,
        user: 'Alice',
        status: false,
        userid: 0
    },
    {
        device: deviceList[6],
        id: 6,
        name: 'loungelight',
        type: 'light',
        room: 'lounge',
        watt: 19,
        user: 'Alice',
        status: false,
        userid: 0
    },
    {
        device: deviceList[7],
        id: 7,
        name: 'loungespeaker',
        type: 'entertainment',
        room: 'lounge',
        watt: 12,
        user: 'Alice',
        status: true,
        userid: 0
    },
    {
        device: deviceList[8],
        id: 8,
        name: 'kidtablet',
        type: 'entertainment',
        room: 'bedroom',
        watt: 13,
        user: 'David',
        status: true,
        userid: 3
    },
    {
        device: deviceList[9],
        id: 9,
        name: 'alexahub',
        type: 'entertainment',
        room: 'kitchen',
        watt: 23,
        user: 'Alice',
        status: true,
        userid: 0
    },
];

export default deviceData;