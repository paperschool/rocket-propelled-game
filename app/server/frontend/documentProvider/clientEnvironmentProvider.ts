import environmntProvider from "../../../environmentProvider";

const clientEnvironmentProvider = () => {

    const environmentVariables = environmntProvider();

    const clientVariables = Object.entries(environmentVariables)
        .filter(([key, value]: any) =>
            key.substring(0, 7) === "CLIENT_")
        .reduce((clientVariableObject, [key, value]: any) =>
            ({ ...clientVariableObject, [key]: parseInt(value) ? parseInt(value) : value }), {})

    return `<script>window.environment = ${JSON.stringify(clientVariables)}</script>`
}
export default clientEnvironmentProvider