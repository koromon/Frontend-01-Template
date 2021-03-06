/**
 * 两层循环，效率低下 O(m*n)
 * @param {*} source
 * @param {*} pattern
 */
function find(source, pattern) {
  for (let i = 0; i < source.length; i++) {
    let matched = true;
    for (let j = 0; j < pattern.length; j++) {
      if (source[i + j] !== pattern[j]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return true;
    }
  }
  return false;
}

console.log("====", find("abcxxyz", "xy"));

function kmp(source, pattern) {
  // 比较pattern中相似的字符，每次消费后可以快速回到对应的位置（因为前面的字符已经判断过是一样的，所以只要接着后面不一样的开始匹配即可）
  // abcabx => [0,0,0,1,2,0]
  let table = new Array(pattern.length).fill(0);
  let k = 0;
  for (let j = 1; j < pattern.length; j++) {
    if (pattern[j] === pattern[k]) {
      k++;
    } else {
      k = 0;
    }
    table[j] = k;
  }
  console.log(table);

  let j = 0;
  for (let i = 0; i < source.length; i++) {
    console.log(source[i], pattern[j]);

    if (source[i] === pattern[j]) {
      j++;
    } else {
      while (source[i] !== pattern[j] && j > 0) {
        j = table[j - 1];
      }

      if (source[i] === pattern[j]) {
        j++;
      } else {
        j = 0;
      }
    }

    if (j === pattern.length) {
      return true;
    }
  }
  return false;
}

console.log(find("abcabcabx", "abcabx"));
console.log(kmp("abcabcabx", "abcabx"));
