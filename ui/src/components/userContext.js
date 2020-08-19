import React from 'react';

const UserContext = React.createContext();

function UserProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(localStorage.getItem('appContext') || false);
    const [userId, setUserId] = React.useState(null);

    React.useEffect(() => {
        if(isAuthenticated)
            localStorage.setItem('appContext', isAuthenticated);
        else
            localStorage.removeItem('appContext');
    },[isAuthenticated]);

    function updateAuthentication({ userId }) {
        setIsAuthenticated(true);
        setUserId(userId);
    }
    return(
        <UserContext.Provider value={{ isAuthenticated, userId, updateAuthentication }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};