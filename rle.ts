function compressRLE(input: string): string {
  let output = "";
  let count = 1;
  for (let i = 0; i < input.length; i++) {
    if ( input[i] === input[i + 1] ) {
        count++;
    } else {
      output += count + input[i];
      count = 1;
    }
  }
  return output;
}

let input = "AAAABBBCCDAA";
console.log(compressRLE(input)); // 4A3B2C1D2A