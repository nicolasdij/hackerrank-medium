function GetResult(intNumberSearch) {
  const binNumberSearch = intNumberSearch.toString(2).length % 2 ? '0' + intNumberSearch.toString(2) : intNumberSearch.toString(2);

   return SearchResult(binNumberSearch);
}

function SearchResult(binNumberSearch) {
  const arrSequence = [];
  const parts = binNumberSearch.length / 2;
  getSequences(parts, parts, true, '' , arrSequence);

  var Index = arrSequence.indexOf(binNumberSearch);
  return Index;
 
}
function getSequences(topLevel, level, sequence, partNumber , arrSequence) {
  if (level > 0) {
    var index, bitNumber;

    var parentSequence = sequence;

    for (index = 1; index < 5; index++) {
      bitNumber = partNumber.concat(parentSequence ? getFirstSequence(index) : getSecondSequence(index));

      if(index === 1){
        sequence = true;
      }
      getSequences(topLevel, level - 1, sequence, bitNumber , arrSequence);
      sequence = !sequence;
      if (topLevel === level)
        partNumber = '';
    };
  }
  else {
    arrSequence.push(partNumber);
  }
}

function getFirstSequence(level) {
  var sequence = '';
  switch (level) {
    case 1:
      sequence = '00';
      break;
    case 2:
      sequence = '01';
      break;
    case 3:
      sequence = '11';
      break;
    case 4:
      sequence = '10';
      break;
    default:
      sequence = '';
      break;
  }
  return sequence;
}

function getSecondSequence(level) {
  var sequence = '';
  switch (level) {
    case 1:
      sequence = '10';
      break;
    case 2:
      sequence = '11';
      break;
    case 3:
      sequence = '01';
      break;
    case 4:
      sequence = '00';
      break;
    default:
      sequence = '';
      break;
  }
  return sequence;
}

const num = 10000000;
console.log(`GetResult(${num})`, GetResult(num));