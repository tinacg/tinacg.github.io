function accumulate(input, output, tree) {
  if (input.length === 0) {
    // return tree.py || "";
    return output;
  } else {
    if (input[0] in tree) {
      return accumulate(input.substring(1), output, tree[input[0]]);
    } else {
      return accumulate(input.substring(1), output + " " + tree.py, cedict_tree);
    }
  }
}
  

function convert(input) {
  var output = "";
  for (var i = 0, len = input.length; i < len; i++) {
    // try 
    if (i === len - 1) {  // or next letter is not part of word
      // return accumulated
    }
    
  }
  return output;
}

console.log(accumulate("樂一一樂一一", "", cedict_tree));
