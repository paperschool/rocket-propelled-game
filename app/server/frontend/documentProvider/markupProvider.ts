export default (title: string,
    styles: string,
    externalScripts: string,
    scripts: string,
    appContainer: string,
    clientEnvironment: string
): string => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    ${styles}
</head>
<body>
    <div id="${appContainer}"></div>
    ${clientEnvironment}
    ${externalScripts}
    ${scripts}
</body> 
</html>
`