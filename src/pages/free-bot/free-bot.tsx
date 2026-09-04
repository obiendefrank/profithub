import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import Button from '@/components/shared_ui/button';
import Text from '@/components/shared_ui/text';
import { LegacyLoaderStartIcon } from '@deriv/quill-icons/Legacy';
import { Localize, localize } from '@deriv-com/translations';
import './free-bot.scss';

const FreeBotPage = observer(() => {
    const { free_bot_store } = useStore();
    const { free_bot_strategies, loadFreeBotStrategy } = free_bot_store;

    return (
        <div className='free-bot-page'>
            <div className='free-bot-page__header'>
                <Text as='h1' size='l' weight='bold'>
                    <Localize i18n_default_text='Bot Strategies Library' />
                </Text>
                <Text as='p' size='s' className='free-bot-page__description'>
                    <Localize i18n_default_text='Ready to deploy • Click to load' />
                </Text>
            </div>

            {free_bot_strategies.length > 0 && (
                <div className='free-bot-page__strategies'>
                    <div className='free-bot-page__categories'>
                        {/* Normal Bots */}
                        <div className='free-bot-page__category'>
                            <Text as='h2' size='m' weight='bold' className='free-bot-page__category-title'>
                                🎯 Normal Bots
                            </Text>
                            <div className='free-bot-page__bot-list'>
                                {free_bot_strategies
                                    .filter(s => !s.isPremium)
                                    .map(strategy => (
                                        <div key={strategy.id} className='bot-item'>
                                            <div className='bot-item__left'>
                                                <div className='bot-item__icon'>
                                                    <LegacyLoaderStartIcon fill='#fff' width='20px' height='20px' />
                                                </div>
                                                <div className='bot-item__info'>
                                                    <div className='bot-item__name'>{strategy.name}</div>
                                                    <div className='bot-item__status'>
                                                        <Localize i18n_default_text='Ready to deploy • Click to load' />
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                text={localize('Load Bot')}
                                                onClick={() => loadFreeBotStrategy(strategy)}
                                                primary
                                                has_effect
                                                className='bot-item__button'
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Premium Bots */}
                        <div className='free-bot-page__category'>
                            <Text as='h2' size='m' weight='bold' className='free-bot-page__category-title'>
                                ⭐ Premium Automated Bots
                            </Text>
                            <div className='free-bot-page__bot-list'>
                                {free_bot_strategies
                                    .filter(s => s.isPremium)
                                    .map(strategy => (
                                        <div key={strategy.id} className='bot-item bot-item--premium'>
                                            <div className='bot-item__left'>
                                                <div className='bot-item__icon bot-item__icon--premium'>
                                                    <LegacyLoaderStartIcon fill='#fff' width='20px' height='20px' />
                                                </div>
                                                <div className='bot-item__info'>
                                                    <div className='bot-item__name'>
                                                        {strategy.name}
                                                        <span className='bot-item__badge'>PREMIUM</span>
                                                    </div>
                                                    <div className='bot-item__status'>
                                                        <Localize i18n_default_text='Ready to deploy • Click to load' />
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                text={localize('Load Bot')}
                                                onClick={() => loadFreeBotStrategy(strategy)}
                                                primary
                                                has_effect
                                                className='bot-item__button'
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {free_bot_strategies.length === 0 && (
                <div className='free-bot-page__empty'>
                    <Text as='p' size='s' align='center'>
                        <Localize i18n_default_text='Loading bot strategies...' />
                    </Text>
                </div>
            )}
        </div>
    );
});

export default FreeBotPage;
