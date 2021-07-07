import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';
import '../styles/nprogress.css';
import { BookmarksStateProvider } from '../lib/bookmarksState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
