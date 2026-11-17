import test from 'node:test';
import assert from 'node:assert/strict';
import {eventIsCurrent} from '../docs/training-events.mjs';
const end = '2026-12-05T18:00:00Z';
test('workshop archives exactly at its ending, regardless of offset', () => {
  assert.equal(eventIsCurrent(end, Date.parse('2026-12-05T17:59:59Z')), true);
  assert.equal(eventIsCurrent(end, Date.parse(end)), false);
  assert.equal(eventIsCurrent(end, Date.parse('2026-12-05T12:00:00-06:00')), false);
  assert.equal(eventIsCurrent(end, Date.parse('2027-01-01T00:00:00Z')), false);
});
test('invalid dates cannot advertise registration', () => {
  assert.equal(eventIsCurrent('invalid'), false);
});
