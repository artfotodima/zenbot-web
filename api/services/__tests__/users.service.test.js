const assert = require('assert');
const app = require('../../app');

const users = app.service('users');

const email1 = 'test@example.com';
const email2 = 'test2@example.com';
const email3 = 'test3@example.com';
async function removeEmails() {
  await users.remove(null, { email: email1 });
  await users.remove(null, { email: email2 });
  await users.remove(null, { email: email3 });
}

describe('\'users\' service', () => {
  beforeAll(async () => {
    await removeEmails();
  });

  afterAll(async () => {
    await removeEmails();
  });

  it('check if services registered', () => {
    assert.ok(users, 'Registered the service');
  });

  it(`create ${email1} and make sure that password encrypted`, async () => {
    const user = await users.create({
      email: email1,
      password: 'secret',
      password_confirmation: 'secret',
    });
    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
    assert.ok(user.password_confirmation !== 'secret');
  });

  it(`create ${email2} and make sure that no password passed back for 'rest' request`, async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    const user = await users.create({
      email: 'test2@example.com',
      password: 'secret',
      password_confirmation: 'secret'
    }, params);

    console.log('user=', user);

    // Make sure password has been remove
    assert.ok(!user.password);
    assert.ok(!user.password_confirmation);
  });

  it(`second create ${email1} should fail`, done => {
    users.create({
      email: 'test@example.com',
      password: 'secret',
      password_confirmation: 'secret'
    }).catch(error => {
      assert.strictEqual('email: test@example.com already exists.', error.message);
      done();
    });
  });

  it(`create ${email3} without password should fail`, done => {
    users.create({
      email: email3,
      password: '',
      password_confirmation: '',
    }).catch(error => {
      assert.strictEqual('Incomplete oauth registration', error.message);
      done();
    });
  });
});
