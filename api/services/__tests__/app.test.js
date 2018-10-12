/**
 * @jest-environment node
 */

const assert = require('assert');
const rp = require('request-promise');
const url = require('url');

const app = require('../../app');

const port = app.get('port') || 3030;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('application tests', () => {
  beforeEach(function (done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  afterEach(function (done) {
    this.server.close(done);
  });

  it('application started and body has html tag', () => rp(getUrl()).then(body => assert.ok(body.indexOf('<html>') !== -1)));

  describe('404', () => {
    it('shows a 404 HTML page', () => rp({
      url: getUrl('path/to/nowhere'),
      headers: {
        Accept: 'text/html'
      }
    }).catch(res => {
      assert.strictEqual(res.statusCode, 404);
      assert.ok(res.error.indexOf('<html>') !== -1);
    }));

    it('shows a 404 JSON error without stack trace', () => rp({
      url: getUrl('path/to/nowhere'),
      json: true
    }).catch(res => {
      assert.strictEqual(res.statusCode, 404);
      assert.strictEqual(res.error.code, 404);
      assert.strictEqual(res.error.message, 'Page not found');
      assert.strictEqual(res.error.name, 'NotFound');
    }));
  });

  describe('401 - test protected API', () => {
    it('users/ is protected', () => rp({
      url: getUrl('users/'),
      json: true
    })
      .catch(res => {
        assert.strictEqual(res.statusCode, 401);
        assert.strictEqual(res.error.message, 'No auth token');
        assert.strictEqual(res.error.name, 'NotAuthenticated');
      }));
  });

  describe('200 - test unprotected API', () => {
    const unprotected = ['zenbot-backfill/', 'zenbot-backfill/binance/', 'visitors/', 'load-info/', 'messages/'].sort();
    for (let i = 0; i < unprotected.length; i += 1) {
      const site = unprotected[i];
      it(`${site} unprotected and gives some response`, () => rp({
        url: getUrl(site),
        json: true
      })
        .then(res => {
          assert.strictEqual(typeof res, 'object', 'should be not empty response');
        }));
    }
  });
});
