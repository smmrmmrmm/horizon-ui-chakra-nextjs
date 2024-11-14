export type Device = {
    id: number;
    name: string;
    users: number[]
    settings: string;
    secondarysettings: string; //file path
};

const deviceList: Device[] = [
    {
        id: 0,
        name: 'doorbell',
        users: [0],
        settings: './src/settings/devices/0/settings.json',
        secondarysettings: './src/settings/devices/0/'
    },
    {
        id: 1,
        name: 'frontdoorlock',
        users: [0],
        settings: './src/settings/devices/1/settings.json',
        secondarysettings: './src/settings/devices/1/'
    },
    {
        id: 2,
        name: 'backdoorlock',
        users: [0],
        settings: './src/settings/devices/2/settings.json',
        secondarysettings: './src/settings/devices/2/'
    },    
    {
        id: 3,
        name: 'charlottespeaker',
        users: [2],
        settings: './src/settings/devices/3/settings.json',
        secondarysettings: './src/settings/devices/3/'
    },
    {
        id: 4,
        name: 'babymonitor',
        users: [1],
        settings: './src/settings/devices/4/settings.json',
        secondarysettings: './src/settings/devices/4/'
    },
    {
        id: 5,
        name: 'kitchenlight',
        users: [0],
        settings: './src/settings/devices/5/settings.json',
        secondarysettings: './src/settings/devices/5/'
    },
    {
        id: 6,
        name: 'loungelight',
        users: [0],
        settings: './src/settings/devices/6/settings.json',
        secondarysettings: './src/settings/devices/6/'
    },
    {
        id: 7,
        name: 'loungespeaker',
        users: [0],
        settings: './src/settings/devices/7/settings.json',
        secondarysettings: './src/settings/devices/7/'
    },
    {
        id: 8,
        name: 'kidtablet',
        users: [0],
        settings: './src/settings/devices/8/settings.json',
        secondarysettings: './src/settings/devices/8/'
    },
    {
        id: 9,
        name: 'alexahub',
        users: [0],
        settings: './src/settings/devices/9/settings.json',
        secondarysettings: './src/settings/devices/9/'
    },

]

export default deviceList