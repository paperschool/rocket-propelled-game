import markupProvider from './markupProvider';
import styleProvider from './styleProvider';
import scriptProvider from './scriptProvider';
import titleProvider from './titleProvider';
import appContainerProvider from './appContainerProvider';
import clientEnvironmentProvider from './clientEnvironmentProvider';

export default () =>
    markupProvider(
        titleProvider(),
        styleProvider(),
        '',
        scriptProvider(),
        appContainerProvider(),
        clientEnvironmentProvider()
    );
