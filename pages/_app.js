import Page from '../components/Page';
import { BookmarksStateProvider } from '../lib/bookmarksState';

function MyApp({ Component, pageProps }) {
    return (
        <BookmarksStateProvider>
            <Page>
                <Component {...pageProps} />
            </Page>
        </BookmarksStateProvider>
    );
}

export default MyApp;
