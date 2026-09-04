import React, { useState } from 'react';
import { LegacyWarningIcon } from '@deriv/quill-icons/Legacy';
import { Localize, useTranslations } from '@deriv-com/translations';
import { Tooltip } from '@deriv-com/ui';
import Modal from '@/components/shared_ui/modal';
import './risk-disclaimer.scss';

const RiskDisclaimer = () => {
    const { localize } = useTranslations();
    const [is_modal_open, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Tooltip
                as='button'
                className='app-footer__icon risk-disclaimer-button'
                onClick={openModal}
                tooltipContent={localize('Risk Warning')}
            >
                <LegacyWarningIcon iconSize='xs' />
            </Tooltip>

            {is_modal_open && (
                <Modal
                    className='risk-disclaimer-modal'
                    is_open={is_modal_open}
                    toggleModal={closeModal}
                    has_close_icon
                    title={localize('Risk Warning')}
                >
                    <div className='risk-disclaimer-modal__content'>
                        <p>
                            <Localize i18n_default_text='Deriv offers complex derivatives, such as options and contracts for difference ("CFDs"). These products may not be suitable for all clients, and trading them puts you at risk. Please make sure that you understand the following risks before trading Deriv products:' />
                        </p>
                        <ul className='risk-disclaimer-modal__list'>
                            <li>
                                <Localize i18n_default_text='You may lose some or all of the money you invest in the trade' />
                            </li>
                            <li>
                                <Localize i18n_default_text='If your trade involves currency conversion, exchange rates will affect your profit and loss' />
                            </li>
                        </ul>
                        <p className='risk-disclaimer-modal__warning'>
                            <Localize i18n_default_text='You should never trade with borrowed money or with money that you cannot afford to lose.' />
                        </p>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default RiskDisclaimer;
