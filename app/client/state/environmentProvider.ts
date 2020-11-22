const environmentProvider = (): any => {
    return window.environment ? window.environment : {};
};

export default environmentProvider;
