function compress(str) {
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

function decompress(str, tree) {
  let decompressedStr = "";
  let node = tree;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "0") {
      node = node.left;
    } else {
      node = node.right;
    }

    if (!node.left && !node.right) {
      decompressedStr += node.char;
      node = tree;
    }
  }

  return decompressedStr;
}

function assignCodes(node, code, codes) {
  if (!node.left && !node.right) {
    codes[node.char] = code;
    return;
  }

  assignCodes(node.left, code + "0", codes);
  assignCodes(node.right, code + "1", codes);
}

function buildHuffmanTree(freq) {
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

function countFrequencies(str) {
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

let originalStr = "Nam Hyun Woo";
let compressedStr = compress(originalStr);

console.log("original string:", originalStr);
console.log("compressed string:", compressedStr);

let huffmanTree = buildHuffmanTree(countFrequencies(originalStr));
let decompressedStr = decompress(compressedStr, huffmanTree);

console.log("decompressed string:", decompressedStr); 