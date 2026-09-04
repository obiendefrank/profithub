import { action, makeObservable, observable, runInAction } from 'mobx';
import { load, save_types } from '@/external/bot-skeleton';
import RootStore from './root-store';

export interface FreeBotStrategy {
    id: string;
    name: string;
    xml: string;
    uploadedAt: number;
    isPremium?: boolean;
}

export default class FreeBotStore {
    root_store: RootStore;
    free_bot_strategies: FreeBotStrategy[] = [];
    is_uploading = false;

    constructor(root_store: RootStore) {
        makeObservable(this, {
            free_bot_strategies: observable,
            is_uploading: observable,
            uploadFreeBotFile: action.bound,
            loadFreeBotStrategy: action.bound,
            deleteFreeBotStrategy: action.bound,
        });

        this.root_store = root_store;
        this.preloadBots();
    }

    preloadBots = async () => {
        try {
            const { PRE_LOADED_BOTS_DATA } = await import('../pages/free-bot/preloaded-bots-data');

            runInAction(() => {
                this.free_bot_strategies = PRE_LOADED_BOTS_DATA.map(bot => ({
                    id: bot.id,
                    name: bot.name,
                    xml: bot.xml,
                    uploadedAt: Date.now(),
                    isPremium: bot.isPremium,
                }));
            });
        } catch (error) {
            console.error('Error preloading bots:', error);
        }
    };

    uploadFreeBotFile = async (file: File, isPremium: boolean = false): Promise<boolean> => {
        this.is_uploading = true;
        try {
            const text = await file.text();

            // Validate XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const parserError = xmlDoc.querySelector('parsererror');

            if (parserError) {
                this.is_uploading = false;
                return false;
            }

            const strategy: FreeBotStrategy = {
                id: Date.now().toString(),
                name: file.name.replace('.xml', ''),
                xml: text,
                uploadedAt: Date.now(),
                isPremium,
            };

            runInAction(() => {
                this.free_bot_strategies.push(strategy);
                this.saveToLocalStorage();
                this.is_uploading = false;
            });

            return true;
        } catch (error) {
            console.error('Error uploading file:', error);
            runInAction(() => {
                this.is_uploading = false;
            });
            return false;
        }
    };

    loadFreeBotStrategy = async (strategy: FreeBotStrategy) => {
        try {
            await load({
                block_string: strategy.xml,
                file_name: strategy.name,
                workspace: (window as any).Blockly?.derivWorkspace,
                from: save_types.UNSAVED,
                drop_event: {},
            });
        } catch (error) {
            console.error('Error loading strategy:', error);
        }
    };

    deleteFreeBotStrategy = (id: string) => {
        runInAction(() => {
            this.free_bot_strategies = this.free_bot_strategies.filter(s => s.id !== id);
            this.saveToLocalStorage();
        });
    };
}
