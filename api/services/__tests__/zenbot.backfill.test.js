import _ from 'lodash';

const assert = require('assert');
const exchanges = require('../zenbot.backfill/zenbot.backfill.exchanges');
const app = require('../../app');

const backfill = app.service('zenbot-backfill');

it('check if service registered', () => {
  assert.ok(backfill, 'Registered the service');
});

it('get list of exchanges', async () => {
  const allexchanges = await backfill.find();
  assert.deepStrictEqual(allexchanges, exchanges);
});

for (let j = 0; j < exchanges.length; j += 1) {
  const exchange = exchanges[j];
  it(`${exchange}: get backfill list`, async () => {
    const backfillList = await backfill.get(exchange);
    console.log('backfillList=', backfillList[0]);
    // Makes sure the password got encrypted
    assert.ok(!_.isEmpty(backfillList));
    assert.strictEqual(typeof backfillList, 'object');
    for (let i = 0; i < backfillList[i]; i += 1) {
      const elem = backfillList[i];
      expect(elem)
        .toHaveProperty('id');
      expect(elem)
        .toHaveProperty('asset');
      expect(elem)
        .toHaveProperty('currency');
      expect(elem)
        .toHaveProperty('min_size');
      expect(elem)
        .toHaveProperty('max_size');
      expect(elem)
        .toHaveProperty('increment');
      expect(elem)
        .toHaveProperty('label');
    }
  });
}
