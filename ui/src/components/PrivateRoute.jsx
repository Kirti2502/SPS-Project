// react
import React from 'react';
// ext libs
import { Route, Redirect } from 'react-router-dom';

// mui hooks
// mui components
// mui icons
// hooks
// components
import AppLayout from './AppLayout';

// services
// errors
// utils
// configuration
// icons
// assets
// styles

export default function PrivateRoute({ component: Component, ...rest }) {
    return (<Route
        {...rest}
        render={ 
            (props) => (
                 <AppLayout><Component {...props} /></AppLayout>
            )           
        }
    />);
}