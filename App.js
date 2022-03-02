
import React from 'react';
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'

import AuthNavigator from './app/navigations/auth-navigator';


export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
        <AuthNavigator />
    </ApplicationProvider>
)



