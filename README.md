At first, I tried to solve it with a recursive depth-first function (in NodeJS) but it just worked for small numbers - an input value such as `10^5` would generate a runtime error due to the number of recursive calls in the stack.

So then I tried to see how I could reduce the problem to the sum of smaller problems and found out that the number of steps for N, being N a power of 2, was 

Rule #1
-------
> N * 2 - 1

(e.g.: number of steps for 2 is 3, for 32 is 63, for 256 is 511, and so on). 

Then I had find what to do with any other number (that is not a power of 2) and since any integer is the sum of different powers of 2 (hence the binary representation), I only had to see if the number of steps would add up as well ... but it was not the case. However, I did find that I had to not just add the number of steps from every power of two, but to 

Rule #2
-------
> subtract and add the steps in an alternate fashion, starting from the highest order digit


Demonstration
=============
Given number **42** (`101010` in binary)

Let's first apply **Rule #1**

```
1 0 1 0 1 0
^ ^ ^ ^ ^ ^
| | | | | |_           0 steps
| | | | |___  2*2-1 =  3 steps
| | | |_____           0 steps
| | |_______  2*8-1 = 15 steps
| |_________           0 steps
|___________ 2*32-1 = 63 steps
```

And secondly, applying **Rule #2**:
```
63 - 15 + 3 = 51
```

> The total number of steps is **51**


Implementation (JavaScript)
===

``` lang-js
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
```
