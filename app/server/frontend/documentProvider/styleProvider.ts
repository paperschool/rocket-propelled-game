import manifestProvider from './manifestProvider';

const styleLineGenerator = (stylesheet: StylesheetProperty): string =>
    `<link rel="stylesheet" href="/${stylesheet.src}" integrity="${stylesheet.integrity}" />`;

const isStylesheet = (assetFileName: string): boolean =>
    assetFileName.substring(assetFileName.length - 4, assetFileName.length) === '.css';

export type StylesheetProperty = {
    src: string;
    integrity: string;
};

export const stylePaths = (): StylesheetProperty[] =>
    Object.entries(manifestProvider())
        .reduce(
            (styleAssets, [assetKey, { src, integrity }]) => [
                ...styleAssets,
                isStylesheet(assetKey) ? { src, integrity } : undefined,
            ],
            []
        )
        .filter(Boolean);

export default () => stylePaths().reduce((acc, elem) => `${acc}${styleLineGenerator(elem)}\n`, '');
