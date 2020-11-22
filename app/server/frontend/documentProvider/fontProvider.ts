import manifestProvider from './manifestProvider';

const isFont = (assetFileName: string): boolean =>
    assetFileName.substring(assetFileName.length - 5, assetFileName.length) === '.woff' ||
    assetFileName.substring(assetFileName.length - 6, assetFileName.length) === '.woff2';

export const scriptLineGenerator = (script: ScriptProperty): string =>
    `<script src="/${script.src}" integrity="${script.integrity}"></script>`;

export type ScriptProperty = {
    src: string;
    integrity: string;
};

export const fontPaths = (): ScriptProperty[] =>
    Object.entries(manifestProvider())
        .reduce(
            (scriptAssets, [assetKey, { src, integrity }]) => [
                ...scriptAssets,
                isFont(assetKey) ? { src, integrity } : undefined,
            ],
            []
        )
        .filter(Boolean);

export default () => fontPaths().reduce((acc, elem) => `${acc}${scriptLineGenerator(elem)}\n`, '');
