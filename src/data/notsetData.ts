export type NotsetObj = {
    state: boolean;
    settingtype: 'User'|'Device';
    id: number
    setting: string; 
    perp: number;
    message: string;
    time: Date
};

const notsetData : NotsetObj[] = [
    {
        state: true,
        settingtype: 'Device',
        id: 1,
        setting: 'Charlotte unlock and lock access',
        perp: 0,
        message: 'Removed access',
        time: new Date('2024-01-23T12:45:00'),
    },
    {
        state: true,
        settingtype: 'User',
        setting: 'Notification',
        id: 4,
        perp: 0,
        message: 'Turned on',
        time: new Date('2024-01-24T13:45:00'),
    },
    {
        state: true,
        settingtype: 'Device',
        setting: "Charlotte unlock and lock access",
        id: 2,
        perp: 4,
        message: 'Removed access',
        time: new Date('2024-01-24T23:45:00'),
    },
    {
        state: false,
        settingtype: 'User',
        setting: 'Notification',
        id: 3,
        perp: 2,
        message: 'Turned on',
        time: new Date('2024-01-24T05:43:00'),
    },
    {
        state: true,
        settingtype: 'Device',
        setting: 'Elphaba unlock and lock access',
        id: 2,
        perp: 1,
        message: 'turned on',
        time: new Date('2024-01-24T05:25:00'),
    },
]


export default notsetData