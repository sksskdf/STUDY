function countFrequencies(str) {
  // 입력 문자열에서 각 문자의 빈도수를 계산하는 함수
  let freq = {};
  for (let i = 0; i < str.length; i++) {
    if (freq[str[i]]) {
      freq[str[i]]++;
    } else {
      freq[str[i]] = 1;
    }
  }
  return freq;
}

function buildHuffmanTree(freq) {
  // 주어진 빈도수로부터 허프만 이진트리를 만드는 함수
  let nodes = [];
  for (let char in freq) {
    nodes.push({ char: char, freq: freq[char], left: null, right: null });
  }

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);

    let left = nodes.shift();
    let right = nodes.shift();

    let newNode = {
      char: "",
      freq: left.freq + right.freq,
      left: left,
      right: right,
    };

    nodes.push(newNode);
  }

  return nodes[0];
}

function assignCodes(node, code, codes) {
  // 허프만 이진트리를 순회하며 각 노드에 이진 코드를 할당하는 함수
  if (!node.left && !node.right) {
    codes[node.char] = code;
    return;
  }

  assignCodes(node.left, code + "0", codes);
  assignCodes(node.right, code + "1", codes);
}

function compress(str) {
  // 문자열을 압축하는 함수
  let freq = countFrequencies(str);
  let huffmanTree = buildHuffmanTree(freq);
  let codes = {};
  assignCodes(huffmanTree, "", codes);

  let compressedStr = "";
  for (let i = 0; i < str.length; i++) {
    compressedStr += codes[str[i]];
  }

  return compressedStr;
}

function decompress(str, huffmanTree) {
  // 압축된 문자열을 해제하는 함수
  let decompressedStr = "";
  let node = huffmanTree;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "0") {
      node = node.left;
    } else {
      node = node.right;
    }

    if (!node.left && !node.right) {
      decompressedStr += node.char;
      node = huffmanTree;
    }
  }

  return decompressedStr;
}

let originalStr = "Hello, world!";
let compressedStr = compress(originalStr);

console.log("Original string:", originalStr);
console.log("Compressed string:", compressedStr);

let huffmanTree = buildHuffmanTree(countFrequencies(originalStr));
let decompressedStr = decompress(compressedStr, huffmanTree);

console.log("Decompressed string:", decompressedStr);
