const debounce = (callback: Function, timeout: number = 1000) => {
    let debounceTimeout: NodeJS.Timeout;

    return () => {

        const later = () => {
            console.log("Calling Later...")
            debounceTimeout = null;
            callback.apply(this)
        }

        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
            console.log("Calling Later...")

            later()
        }, timeout);
    }
}

export default debounce