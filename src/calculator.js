#!/usr/bin/env node
'use strict';

/**
 * Calculate two numbers using addition (+), subtraction (-),
 * multiplication (* or ×), division (/ or ÷), modulo (%),
 * or exponentiation (^ or **).
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
    case '%':
      return modulo(left, right);
    case '^':
    case '**':
      return power(left, right);
    default:
      throw new TypeError('Operator must be +, -, *, /, %, ^, **, ×, or ÷.');
  }
}

function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Both operands must be finite numbers.');
  }
  if (b === 0) {
    throw new RangeError('Cannot modulo by zero.');
  }
  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new TypeError('Both operands must be finite numbers.');
  }
  return base ** exponent;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new TypeError('The operand must be a finite number.');
  }
  if (n < 0) {
    throw new RangeError('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(n);
}

if (require.main === module) {
  const [, , ...args] = process.argv;

  if (args.length === 2 && args[0] === 'sqrt') {
    try {
      console.log(squareRoot(Number(args[1])));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
  } else if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/|%|^|**|×|÷> <number> | sqrt <number>');
    process.exitCode = 1;
  } else {
    try {
      const [leftInput, operator, rightInput] = args;
      const result = calculate(Number(leftInput), operator, Number(rightInput));
      console.log(result);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

module.exports = { calculate, modulo, power, squareRoot };
