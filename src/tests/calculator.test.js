'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { calculate, modulo, power, squareRoot } = require('../calculator');

test('adds numbers', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(-2, '+', 3), 1);
  assert.equal(calculate(0, '+', 0), 0);
});

test('subtracts numbers', () => {
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(4, '-', 10), -6);
  assert.equal(calculate(-4, '-', -10), 6);
});

test('multiplies numbers with either supported symbol', () => {
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(45, '×', 2), 90);
  assert.equal(calculate(-3, '*', 4), -12);
  assert.equal(calculate(0, '*', 4), 0);
});

test('divides numbers with either supported symbol', () => {
  assert.equal(calculate(20, '/', 5), 4);
  assert.equal(calculate(20, '÷', 5), 4);
  assert.equal(calculate(7, '/', 2), 3.5);
  assert.equal(calculate(-20, '/', 5), -4);
});

test('calculates modulo and rejects a zero divisor', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
  assert.equal(calculate(5, '%', 2), 1);
  assert.equal(calculate(10, '%', 3), 1);
  assert.throws(() => modulo(10, 0), {
    name: 'RangeError',
    message: 'Cannot modulo by zero.',
  });
  assert.throws(() => calculate(10, '%', 0), {
    name: 'RangeError',
    message: 'Cannot modulo by zero.',
  });
});

test('raises a base to an exponent', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(2, -2), 0.25);
  assert.equal(calculate(2, '^', 3), 8);
  assert.equal(calculate(2, '**', 3), 8);
});

test('calculates square roots and rejects negative numbers', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
  assert.throws(() => squareRoot(-1), {
    name: 'RangeError',
    message: 'Cannot calculate the square root of a negative number.',
  });
});

test('rejects division by positive or negative zero', () => {
  assert.throws(() => calculate(20, '/', 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
  assert.throws(() => calculate(20, '÷', -0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('rejects unsupported operators', () => {
  assert.throws(() => calculate(2, '?', 3), {
    name: 'TypeError',
    message: 'Operator must be +, -, *, /, %, ^, **, ×, or ÷.',
  });
});

test('rejects operands that are not finite numbers', () => {
  for (const [left, right] of [
    [Number.NaN, 1],
    [1, Number.NaN],
    [Number.POSITIVE_INFINITY, 1],
    [1, Number.NEGATIVE_INFINITY],
  ]) {
    assert.throws(() => calculate(left, '+', right), {
      name: 'TypeError',
      message: 'Both operands must be finite numbers.',
    });
  }
});
