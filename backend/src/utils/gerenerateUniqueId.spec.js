const gerenerateUniqueId = require('../../src/utils/generateUniqueId');

describe('GEnerate Unique ID', () => {
    it(' Should generate an unique ID', () => {
        const id = gerenerateUniqueId();

            expect(id).toHaveLength(8);
    });
});