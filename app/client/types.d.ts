declare var PRODUCTION: boolean;

declare module "*.scss";

declare module "react-context-devtool";
declare module "react-waterfall";

declare module "*.svg" {
    const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
    export default value;
}

interface Window {
    environment: any
}


