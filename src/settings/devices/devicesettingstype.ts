export type DeviceSettingsType = {
    'General Settings': {key: boolean};
    'User Access Settings': UserAccessSettings;
    'User Access Logs': UserAccessLogs
}

//have to be in ascending order!
export type UserAccessSettings = {
    '0': boolean;
    '1': boolean;
    '2': boolean;
    '3': boolean;
    '4': boolean;
}

export type UserAccessLogs = {
    '0': boolean;
    '1': boolean;
    '2': boolean;
    '3': boolean;
    '4': boolean;
}


export type DeviceSecondarySettingsType = {
    key: boolean
}