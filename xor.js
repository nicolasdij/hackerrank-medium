const MAX_N = 4294967295;
const MAX_BN = 2147483647;

function minOperations(n) {
  let mult = 1;
  let add = 0;
  if (n > MAX_BN) {
    mult = 2;
    n = n / 2;
    add = Number.isInteger(n) ? 1 : 0;
  }

  const binDigits = Math.floor(Math.log2(n)) + 1;
  let accumulator = 0;
  let sign = 1;
  const history = [];

  for (let i = binDigits; i > 0; --i) {
    const mask = 1 << (i - 1);
    const power = n & mask;
    const bitValue = power >> (i - 1);
    const steps = (power * 2 - 1) * bitValue;

    accumulator += steps * sign;
    sign = sign * (bitValue == 0 ? 1 : -1);
    // history.push({ power: power, steps: steps });
  }

  // console.log(history);
  // console.log(accumulator);

  return accumulator * mult + add;
}

function altMinops(n) {
  const binDigits = Math.floor(Math.log2(n)) + 1;
}

let N = 2147483648 + 10;
console.log(`${N} | ${minOperations(N)}`);
N = N / 2;
console.log(`${N} | ${minOperations(N)}`);

// 4294967259
