export type User = {
    id: number;
    name: string;
    settings: string; //file path
};

export type Visibles = {
    userids: number[];
    deviceprimary: number[]; 
    devicesecondary: number[]; 
    deviceslogs: number[]
    transparent: boolean
    //??
}


const userList: User[] = [
    {
        id: 0,
        name: 'Alice',
        settings: './src/settings/users/0/settings.json' //add him!
    },
    {
        id: 1,
        name: 'Bob',
        settings: './src/settings/users/1/settings.json' //add him!
    },
    {
        id: 2,
        name: 'Charlotte',
        settings: './src/settings/users/2/settings.json' //add him!
    },
    {
        id: 3,
        name: 'David',
        settings: './src/settings/users/3/settings.json' //add him!
    },
    {
        id: 4,
        name: 'Elphaba',
        settings: './src/settings/users/4/settings.json' //add him!
    }
];

export default userList;