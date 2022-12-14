import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAuthData } from '../../services/auth/auth';

const PrivateRoute = ({ children, ...rest }) => {
    const {token} = getAuthData();
    return (
        <Route
        {...rest}
        render={({ location }) => {
          return token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }}
        />
    );
};

export default PrivateRoute;