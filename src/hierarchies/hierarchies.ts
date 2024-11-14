import { User } from 'usersanddevices/userobject'
import userList from 'usersanddevices/userobject';

// superuser - can see anyone below (above all)
// user - at bottom can only see themselves
// supertransparent - can see everyone
// transparent - can see everyone at their level
type Hierarch = 'superuser' | 'user' | 'supertransparent' | 'transparent'


// mode 1
export type Hierarchy ={
    mode: string;
    id: number;
    superusers: User[];
    users: User[];
    supertransparent: User[];
    transparent: User[];
};

const hierarchyList: Hierarchy[] = [
    {
        mode: 'one superuser',
        id: 1,
        superusers: [userList[0]],
        users: [userList[1],userList[2],userList[3],userList[4]],
        supertransparent: [],
        transparent: []
    },
    {
        mode: 'multiple superusers',
        id: 2,
        superusers: [userList[0],userList[1]],
        users: [userList[2],userList[3],userList[4]],
        supertransparent: [],
        transparent: []
    },
    {
        mode: 'transparent supusers',
        id: 3,
        superusers: [],
        users: [],
        supertransparent: [userList[0],userList[1]],
        transparent: [userList[2],userList[3],userList[4]]
    },
    {
        mode: 'flat transparency',
        id: 4,
        superusers: [],
        users: [],
        supertransparent: [userList[0],userList[1],userList[2],userList[3],userList[4]],
        transparent: []
    },
];

export default hierarchyList;