export type NotificationSettings = {
    "Show Device Notifications": boolean;
    "Show Setting Notifications": boolean;
};

export type DeviceSettings = {
    "Individual Device Settings": boolean;
};


export type Settings = {
    Notifications: NotificationSettings;
    Devices: DeviceSettings;
};
