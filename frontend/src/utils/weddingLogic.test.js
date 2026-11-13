import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WEDDING_TIMESTAMP,
  calculateTimeLeft,
  formatCountdownUnit,
} from './countdown.js';
import {
  validateWishInput,
  checkWishCooldown,
} from './wishValidation.js';

test('calculateTimeLeft computes exact days, hours, minutes, seconds for Asia/Tashkent wedding date', () => {
  const twoDaysThreeHoursMs = (2 * 24 + 3) * 60 * 60 * 1000 + 14 * 60 * 1000 + 9 * 1000;
  const result = calculateTimeLeft(WEDDING_TIMESTAMP - twoDaysThreeHoursMs, WEDDING_TIMESTAMP);

  assert.deepEqual(result, {
    days: 2,
    hours: 3,
    minutes: 14,
    seconds: 9,
    isPassed: false,
  });
});

test('calculateTimeLeft clamps to zero and marks isPassed when wedding time has passed', () => {
  const result = calculateTimeLeft(WEDDING_TIMESTAMP + 5000, WEDDING_TIMESTAMP);
  assert.deepEqual(result, {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: true,
  });
});

test('formatCountdownUnit pads single digits cleanly', () => {
  assert.equal(formatCountdownUnit(4), '04');
  assert.equal(formatCountdownUnit(24), '24');
  assert.equal(formatCountdownUnit(-3), '00');
});

test('validateWishInput rejects empty or short fields with Uzbek messages', () => {
  const shortName = validateWishInput({ name: 'A', message: 'Baxtli bo\'linglar!' });
  assert.equal(shortName.valid, false);
  assert.match(shortName.error, /ism-familiya/i);

  const shortMsg = validateWishInput({ name: 'Azizbek', message: 'Hi' });
  assert.equal(shortMsg.valid, false);
  assert.match(shortMsg.error, /tilagingizni/i);

  const valid = validateWishInput({ name: '  Dilnoza Karimova ', message: '  Baxt va saodat tilayman!  ' });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.cleaned, {
    name: 'Dilnoza Karimova',
    message: 'Baxt va saodat tilayman!',
  });
});

test('checkWishCooldown blocks rapid repeat submissions and allows after cooldown', () => {
  const blocked = checkWishCooldown(10_000, 15_000, 15_000);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.remainingSeconds, 10);

  const allowed = checkWishCooldown(10_000, 26_000, 15_000);
  assert.equal(allowed.allowed, true);
  assert.equal(allowed.remainingSeconds, 0);
});
