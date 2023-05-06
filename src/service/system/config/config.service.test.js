import { ConfigManager } from './config.service';
import assert from 'assert';
import "mocha"

describe('ConfigManager', () => {

    it('should return all expected config models from getAllConfigModels after running loadConfigModels', () => {
        ConfigManager.loadConfigModels();
        const configModels = ConfigManager.getAllConfigModels();
        assert.equal(configModels.length, 2);
        assert.equal(configModels[0].getName(), 'channel');
        assert.equal(configModels[1].getName(), 'reactionrole');
    })
})