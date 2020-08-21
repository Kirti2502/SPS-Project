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
import { UserContext } from './userContext';

// services
// errors
// utils
// configuration
// icons
// assets
// styles

export default function PrivateRoute({ component: Component, ...rest }) {
    const userContext = React.useContext(UserContext);
    return (<Route
        {...rest}
        render={ 
            (props) => (userContext.isAuthenticated
                ? <AppLayout><Component {...props} /></AppLayout>
                : <Redirect to="/" />
            )           
        }
    />);
}