// app

export const isAppReady = (state: any) => isSocketConnected(state)

export const isSocketConnected = (state: any) => state.user.isSocketConnected;

// device

export const getDeviceId = (state: any) => state.user.deviceId;

// room

export const getRoomCode = (state: any) => state.room.id;
export const getRoomCodeValidity = (state: any) => state.room.valid;
export const getRoomCodeValidated = (state: any) => state.room.validity;

// error

export const getNotifications = (state: any) => state.notifications;
export const getNotificationCount = (state: any) => state.notifications.length;

