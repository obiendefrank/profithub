import { standalone_routes } from '@/components/shared';
import { DerivLogo, useDevice } from '@deriv-com/ui';
import './app-logo.scss';

export const AppLogo = () => {
    const { isDesktop } = useDevice();

    return null;
};

export default AppLogo;
