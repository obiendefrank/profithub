import { LegacyWhatsappIcon } from '@deriv/quill-icons/Legacy';
import { useTranslations } from '@deriv-com/translations';
import { Tooltip } from '@deriv-com/ui';

const WhatsApp = () => {
    const { localize } = useTranslations();
    const whatsappNumber = '+254115549500';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <Tooltip
            as='a'
            className='app-footer__icon'
            href={whatsappUrl}
            target='_blank'
            tooltipContent={localize('WhatsApp')}
        >
            <LegacyWhatsappIcon iconSize='xs' />
        </Tooltip>
    );
};

export default WhatsApp;
