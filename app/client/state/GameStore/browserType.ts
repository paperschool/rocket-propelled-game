
export enum Browsers {
    CHROME = "CHROME",
    FIREFOX = "FIREFOX",
    EDGE = "EDGE",
    OTHER = "OTHER"
}

export const getUserAgent = () => navigator.userAgent;

export const getBrowserType = () => {
    const userAgent = getUserAgent()

    if (userAgent.indexOf("Edg") !== -1) {
        return Browsers.EDGE;
    }

    if (userAgent.indexOf("Firefox") !== -1) {
        return Browsers.FIREFOX;
    }

    if (userAgent.indexOf("Chrome") !== -1) {
        return Browsers.CHROME;
    }

    return Browsers.OTHER;

}

const permissionsNames: PermissionName[] = [
    "geolocation",
    "notifications",
    "push",
    "midi",
    "camera",
    "microphone",
    "speaker",
    "device-info",
    "background-sync",
    "bluetooth",
    "persistent-storage",
    "ambient-light-sensor",
    "accelerometer",
    "gyroscope",
    "magnetometer",
    "clipboard",
]

const getPermission = (permission: PermissionName) => {
    return new Promise(async (res, rej) => {
        let granted;

        try {
            await navigator.permissions.query({
                name: permission
            })
            granted = true;
        } catch (e) {
            granted = false;
        }
        res({
            name: permission,
            permitted: granted
        });

    });
}
export const getBrowserPermissions = async () => {

    const awaitingPermissions = permissionsNames.map(permission => getPermission(permission))

    const permissions = await Promise.all(awaitingPermissions);

    return permissions.reduce((permissionObject: any, { name, permitted }: any) =>
        ({ ...permissionObject, [name]: permitted })
        , {});
}
