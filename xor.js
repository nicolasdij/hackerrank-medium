/* eslint-disable no-console */
function minOperations(n) {
  const bin = n.toString(2);
  const digitCount = bin.length;
  let accumulator = 0;
  let sign = 1;

  for (let i = 0; i < digitCount; ++i) {
    const digit = Number.parseInt(bin.charAt(i));
    const power = digit > 0 ? Math.pow(2, digitCount - (i + 1)) : 0;
    const steps = digit * (power * 2 - 1);

    accumulator += steps * sign;
    sign = sign * (digit == 0 ? 1 : -1);
  }
  return accumulator;
}

let N = 10000000000;
console.log(`${N} | ${minOperations(N)}`);
