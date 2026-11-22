import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatCount, interpolateCount } from '../lib/count-up.ts'

test('formats count-up values with stable units and precision', () => {
  assert.equal(formatCount(2000, 0), '2,000')
  assert.equal(formatCount(1.2, 1), '1.2')
  assert.equal(formatCount(15, 0), '15')
})

test('interpolates count-up values without exceeding their target', () => {
  assert.equal(interpolateCount(2000, 0, 0), 0)
  assert.equal(interpolateCount(2000, 0.5, 0), 1000)
  assert.equal(interpolateCount(1.2, 0.5, 1), 0.6)
  assert.equal(interpolateCount(60, 1.2, 0), 60)
})
