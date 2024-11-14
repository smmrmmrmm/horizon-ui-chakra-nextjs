export type LogObj = {
    logId: number;
    time: Date;
    action: string;
    userId: number;
    userName: string;
    deviceId: number;
    deviceName: string;
};


const logData: LogObj[] = [
    // Doorbells
    {
        logId: 0,
        time: new Date('2024-01-24T03:43:00'),
        action: 'Motion detected',
        userId: 0,
        userName: 'Alice',
        deviceId: 0,
        deviceName: 'doorbell'
    },
    {
        logId: 1,
        time: new Date('2024-01-24T09:44:00'),
        action: 'Motion detected',
        userId: 0,
        userName: 'Alice',
        deviceId: 0,
        deviceName: 'doorbell'
    },
    {
        logId: 2,
        time: new Date('2024-01-24T12:44:00'),
        action: 'Motion detected',
        userId: 0,
        userName: 'Alice',
        deviceId: 0,
        deviceName: 'doorbell'
    },
    {
        logId: 3,
        time: new Date('2024-01-24T17:45:00'),
        action: 'Doorbell rang',
        userId: 3,
        userName: 'David',
        deviceId: 0,
        deviceName: 'doorbell'
    },
    {
        logId: 4,
        time: new Date('2024-01-24T17:45:00'),
        action: 'Doorbell rang',
        userId: 1,
        userName: 'Bob',
        deviceId: 0,
        deviceName: 'doorbell'
    },
    //frontdoorlock
    {
        logId: 5,
        time: new Date('2024-01-24T08:45:00'),
        action: 'Door unlock - keyfob',
        userId: 0,
        userName: 'Alice',
        deviceId: 1,
        deviceName: 'frontdoorlock'
    },
    {
        logId: 6,
        time: new Date('2024-01-24T08:47:00'),
        action: 'Door lock - keyfob',
        userId: 0,
        userName: 'Alice',
        deviceId: 1,
        deviceName: 'frontdoorlock'
    },
    {
        logId: 7,
        time: new Date('2024-01-24T10:45:00'),
        action: 'Door unlock - fingerprint',
        userId: 1,
        userName: 'Bob',
        deviceId: 1,
        deviceName: 'frontdoorlock'
    },
    {
        logId: 8,
        time: new Date('2024-01-24T10:47:00'),
        action: 'Door lock - fingerprint',
        userId: 2,
        userName: 'Charlotte',
        deviceId: 1,
        deviceName: 'frontdoorlock'
    },
    {
        logId: 9,
        time: new Date('2024-01-24T17:45:00'),
        action: 'Door unlock - keyfob',
        userId: 0,
        userName: 'Alice',
        deviceId: 1,
        deviceName: 'frontdoorlock'
    },
    // backdoorlock
    {
        logId: 10,
        time: new Date('2024-01-24T03:45:00'),
        action: 'Door unlock - keyfob',
        userId: 3,
        userName: 'David',
        deviceId: 2,
        deviceName: 'backdoorlock'
    },
    {
        logId: 11,
        time: new Date('2024-01-24T03:45:15'),
        action: 'Door lock - keyfob',
        userId: 3,
        userName: 'David',
        deviceId: 2,
        deviceName: 'backdoorlock'
    },
    {
        logId: 12,
        time: new Date('2024-01-24T06:31:00'),
        action: 'Door unlock - fingerprint',
        userId: 1,
        userName: 'Bob',
        deviceId: 2,
        deviceName: 'backdoorlock'
    },
    {
        logId: 13,
        time: new Date('2024-01-24T06:34:00'),
        action: 'Door lock - fingerprint',
        userId: 1,
        userName: 'Bob',
        deviceId: 2,
        deviceName: 'backdoorlock'
    },
    //charlottespeaker
    {
        logId: 14,
        time: new Date('2024-01-24T03:48:00'),
        action: 'Connect bluetooth',
        userId: 3,
        userName: 'Charlotte',
        deviceId: 3,
        deviceName: 'charlottespeaker'
    },
    {
        logId: 15,
        time: new Date('2024-01-24T03:49:00'),
        action: 'Shut down',
        userId: 3,
        userName: 'Charlotte',
        deviceId: 3,
        deviceName: 'charlottespeaker'
    },
    //babymonitor
    {
        logId: 16,
        time: new Date('2024-01-24T06:30:00'),
        action: 'Shut down',
        userId: 1,
        userName: 'Bob',
        deviceId: 4,
        deviceName: 'babymonitor'
    },
    // kitchen light
    {
        logId: 17,
        time: new Date('2024-01-24T03:45:30'),
        action: 'Turn on',
        userId: 2,
        userName: 'Charlotte',
        deviceId: 5,
        deviceName: 'kitchenlight'
    },
    {
        logId: 18,
        time: new Date('2024-01-24T03:46:00'),
        action: 'Turn off',
        userId: 2,
        userName: 'Charlotte',
        deviceId: 5,
        deviceName: 'kitchenlight'
    },
    {
        logId: 19,
        time: new Date('2024-01-24T06:30:30'),
        action: 'Turn on',
        userId: 1,
        userName: 'Bob',
        deviceId: 5,
        deviceName: 'kitchenlight'
    },
    {
        logId: 20,
        time: new Date('2024-01-24T07:30:00'),
        action: 'Turn off',
        userId: 3,
        userName: 'David',
        deviceId: 5,
        deviceName: 'kitchenlight'
    },
    {
        logId: 21,
        time: new Date('2024-01-24T17:30:00'),
        action: 'Turn on',
        userId: 0,
        userName: 'Alice',
        deviceId: 5,
        deviceName: 'kitchenlight'
    },
    {
        logId: 22,
        time: new Date('2024-01-24T22:45:30'),
        action: 'Turn off',
        userId: 0,
        userName: 'Alice',
        deviceId: 5,
        deviceName: 'kitchenlight'
    },
    //loungelight
    {
        logId: 23,
        time: new Date('2024-01-24T06:40:30'),
        action: 'Turn on',
        userId: 1,
        userName: 'Bob',
        deviceId: 6,
        deviceName: 'loungelight'
    },
    {
        logId: 24,
        time: new Date('2024-01-24T10:46:30'),
        action: 'Turn off',
        userId: 2,
        userName: 'Charlotte',
        deviceId: 6,
        deviceName: 'loungelight'
    },
    {
        logId: 25,
        time: new Date('2024-01-24T17:45:45'),
        action: 'Turn on',
        userId: 0,
        userName: 'Alice',
        deviceId: 6,
        deviceName: 'loungelight'
    },
    {
        logId: 26,
        time: new Date('2024-01-24T22:45:30'),
        action: 'Turn off',
        userId: 1,
        userName: 'Bob',
        deviceId: 6,
        deviceName: 'loungelight'
    },
    //loungespeaker
    {
        logId: 27,
        time: new Date('2024-01-24T08:30:00'),
        action: 'Play music',
        userId: 1,
        userName: 'Bob',
        deviceId: 7,
        deviceName: 'loungelight'
    },
    {
        logId: 28,
        time: new Date('2024-01-24T09:50:00'),
        action: 'Shut down',
        userId: 1,
        userName: 'Bob',
        deviceId: 7,
        deviceName: 'loungelight'
    },
    {
        logId: 29,
        time: new Date('2024-01-24T17:40:00'),
        action: 'Connect to television',
        userId: 2,
        userName: 'Charlotte',
        deviceId: 7,
        deviceName: 'loungelight'
    },
    {
        logId: 30,
        time: new Date('2024-01-24T22:40:30'),
        action: 'Shut down',
        userId: 1,
        userName: 'Bob',
        deviceId: 7,
        deviceName: 'loungelight'
    },
    //kidtablet
    {
        logId: 31,
        time: new Date('2024-01-24T06:22:00'),
        action: 'Sign-in',
        userId: 3,
        userName: 'David',
        deviceId: 8,
        deviceName: 'kidtablet'
    },
    {
        logId: 32,
        time: new Date('2024-01-24T06:30:00'),
        action: 'Sign-out',
        userId: 3,
        userName: 'David',
        deviceId: 8,
        deviceName: 'kidtablet'
    },
    {
        logId: 33,
        time: new Date('2024-01-24T06:30:30'),
        action: 'Sign-in',
        userId: 4,
        userName: 'Elphaba',
        deviceId: 8,
        deviceName: 'kidtablet'
    },
    {
        logId: 34,
        time: new Date('2024-01-24T07:10:00'),
        action: 'Sign-out',
        userId: 4,
        userName: 'Elphaba',
        deviceId: 8,
        deviceName: 'kidtablet'
    },
    //alexahub
    {
        logId: 35,
        time: new Date('2024-01-24T03:45:00'),
        action: 'Voice Activation',
        userId: 2,
        userName: 'Charlotte',
        deviceId: 9,
        deviceName: 'alexahub'
    },
    {
        logId: 36,
        time: new Date('2024-01-24T06:45:00'),
        action: 'Voice Activation',
        userId: 1,
        userName: 'Bob',
        deviceId: 9,
        deviceName: 'alexahub'
    },
    {
        logId: 37,
        time: new Date('2024-01-24T07:15:00'),
        action: 'Quiz Game',
        userId: 4,
        userName: 'Elphaba',
        deviceId: 9,
        deviceName: 'alexahub'
    },


];

export default logData;