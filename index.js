const express = require('express');
const xor = require('./xor');

const app = express();

app.get('/api/min-operations/:num', (req, res) => {
  const {
    params: { num },
  } = req;

  const ret = xor.minOperations(Number.parseInt(num));
  console.log('Calculating minOperations for ' + num);
  console.log('ret', ret);

  res.json({
    minOperations: ret,
  });
});

app.listen(2401, () => console.log('Listening on port 2401'));
