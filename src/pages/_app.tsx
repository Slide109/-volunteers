import * as React from 'react';
import ReactNotification from 'react-notifications-component';
import { AppProps } from 'next/app';

import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import '~/assets/css/reset.css';
import '~/assets/css/styles.css';
import 'react-notifications-component/dist/theme.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Component {...pageProps} />
            <ReactNotification />
        </>
    );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
};

export default MyApp;
