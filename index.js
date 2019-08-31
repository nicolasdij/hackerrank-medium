const BIN_PAD = 8;
const LABEL_PAD = 10;

function decToBin(dec) {
  return dec.toString(2).padStart(BIN_PAD, '0');
}

function prettyBinary(label, dec, ...other) {
  console.log(label.padStart(LABEL_PAD, '  '), decToBin(dec), ...other);
}

function prettyOther(label, ...val) {
  console.log(label.padStart(LABEL_PAD, '  '), ...val);
}

/**
 * Finds if there's a digit on which the first rule can be applied
 * @param {number} num base-10 number
 * @returns {number} left-to-right zero-based index of the digit that can be switched
 */
function findRuleOne(num) {
  const binStr = num.toString(2);
  const digitCount = binStr.length;
  let res = -1;

  for (let i = digitCount, j = 0; res < 0 && i > 1; --i, ++j) {
    const digitProbeMask = 1 << (i - 2);
    const removeTrailingMask = Math.pow(2, i - 1) - 1;

    const noTrailingDigits = num & removeTrailingMask;
    if (noTrailingDigits == digitProbeMask) res = j;
  }

  return res;
}

/**
 * Switches a specific bit from the binary representation of a decimal number
 * @param {number} num base-10 number
 * @param {number} pos left-to-right zero-based position of the digit to switch
 * @returns {number} the resulting decimal number after switching the requested bit
 */
function switchDigit(num, pos) {
  if (pos < 0) {
    return num;
  }

  const digits = num.toString(2).length - 1;
  return num ^ (1 << Math.min(digits, digits - pos));
}

/**
 *
 * @param {number} num
 * @param {Array=[]} hist
 */
function minOperations(num, hist = []) {
  if (num == 0) {
    return [num];
  }

  hist.push(num);

  // const log2 = Math.log2(num);
  // if(Number.isInteger(log2)) {
  //   return [log2*2];
  // }  

  const r1Pos = findRuleOne(num);
  let r1Path = [];

  if (r1Pos >= 0) {
    const r1Switched = switchDigit(num, r1Pos);
    if (hist.indexOf(r1Switched) < 0) {
      r1Path = minOperations(r1Switched, hist);
    }
  }

  const r2Pos = num.toString(2).length - 1;
  let r2Path = [];
  const r2Switched = switchDigit(num, r2Pos);

  if (hist.indexOf(r2Switched) < 0) {
    r2Path = minOperations(r2Switched, hist);
  }

  let ret;
  if (r1Path.length == 0 && r2Path.length == 0) {
    ret = [];
  }
  if (r1Path.length > 0 && r1Path.length > r2Path.length) {
    ret = [num, ...r1Path];
  }
  if (r2Path.length > 0 && r2Path.length > r1Path.length) {
    ret = [num, ...r2Path];
  }

  return ret;
}

// console.log('START >>>');
// const binStr = '1011';
// const num = 20; //parseInt(binStr, 2);
// const result = minOperations(num);
// console.group('History >>>');
// result.forEach(num => {
//   console.log(decToBin(num));
// });
// console.log('\nResult >>>', result.length - 1);
// console.groupEnd();

// for(let i=2; i<=64; ++i) {
//   console.log(`${i};${minOperations(i).length - 1}`);
// }

const i = 65;
console.log(`${i};${minOperations(i).length - 1}`)