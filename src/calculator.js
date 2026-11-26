#!/usr/bin/env node
'use strict';

/**
 * Calculate two numbers using addition (+), subtraction (-),
 * multiplication (* or ×), or division (/ or ÷).
 */
function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError('Both operands must be finite numbers.');
  }

  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
    case '×':
      return left * right;
    case '/':
    case '÷':
      if (right === 0) {
        throw new RangeError('Cannot divide by zero.');
      }
      return left / right;
    default:
      throw new TypeError('Operator must be +, -, *, /, ×, or ÷.');
  }
}

if (require.main === module) {
  const [, , leftInput, operator, rightInput] = process.argv;

  if (process.argv.length !== 5) {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/|×|÷> <number>');
    process.exitCode = 1;
  } else {
    try {
      const result = calculate(Number(leftInput), operator, Number(rightInput));
      console.log(result);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

module.exports = { calculate };
