import * as React from 'react';

import { MainLayout } from '~/components/layout/main-layout';
import { MainPageHero } from '~/components/main-page';
import { MainPageAbout } from '~/components/main-page/main-page-about';
import { MainPageHowItWorks } from '~/components/main-page/main-page-how-it-works';

const IndexPage = () => {
    return (
        <MainLayout>
            <MainPageHero />
            <MainPageAbout />
            <MainPageHowItWorks />
        </MainLayout>
    );
};

export default IndexPage;
