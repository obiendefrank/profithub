import React from 'react';

type TAuthLoadingWrapper = {
    children: React.ReactNode;
};

const AuthLoadingWrapper = ({ children }: TAuthLoadingWrapper) => {
    return <>{children}</>;
};

export default AuthLoadingWrapper;
