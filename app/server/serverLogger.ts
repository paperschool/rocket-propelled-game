declare global {
    interface Console {
        server(...content: any[]): any;
    }

    interface Number {
        padZero(places: number): string;
    }
}

const serverLogger = (showDate = true, showTime = true): void => {
    Number.prototype.padZero = function (places): string {
        return this.toString().padStart(places, '0');
    };

    console.server = (...content: any): void => {
        const dateTimeInstance = new Date();
        const date = showDate
            ? [
                  dateTimeInstance.getFullYear(),
                  dateTimeInstance.getMonth().padZero(2),
                  dateTimeInstance.getDay().padZero(2),
              ].join('-')
            : '';

        const time = showTime
            ? [
                  dateTimeInstance.getHours().padZero(2),
                  dateTimeInstance.getMinutes().padZero(2),
                  dateTimeInstance.getSeconds().padZero(2),
              ].join(':')
            : '';

        const spacing = showDate && showTime ? ' ' : '';

        console.log(`${date}${spacing}${time}:`, ...content);
    };
};

export default serverLogger;
