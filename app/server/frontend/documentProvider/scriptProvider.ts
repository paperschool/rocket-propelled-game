import manifestProvider from "./manifestProvider";

const isScript = (assetFileName: string): boolean => assetFileName.substring(assetFileName.length - 3, assetFileName.length) === ".js";

export const scriptLineGenerator = (script: ScriptProperty): string =>
    `<script src="/${script.src}" integrity="${script.integrity}"></script>`


export type ScriptProperty = {
    src: string;
    integrity: string;
}

export const scriptPaths = (): ScriptProperty[] => Object.entries(manifestProvider())
    .reduce((scriptAssets, [assetKey, { src, integrity }]) =>
        [...scriptAssets, isScript(assetKey)
            ? ({ src, integrity })
            : undefined
        ], [])
    .filter(Boolean);


export default () => scriptPaths().reduce((acc, elem) => `${acc}${scriptLineGenerator(elem)}\n`, "")

