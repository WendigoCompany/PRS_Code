export let seed = [];
let string_seed = [];

export let zip_char = [];

const genen_seed_zip = () => {
  let seed1 = "23456789".split("");
  let s = "qwertyuiopasdfghjklzxcvbnm".split("");
  let seed3 = ",-{+};_".split("");
  let seed2 = [];
  seed = seed.concat(seed1);
  for (let i = 0; i < s.length; i++) {
    seed2.push(s[i]);
    seed2.push(s[i].toUpperCase());
  }
  seed = seed.concat(seed2);
  seed = seed.concat(seed3);
};


const parseBoolArr = (bArr) => {
  return bArr.map((v) => (v ? 1 : 0));
};

// export function convertToBase(number) {
//   const base = seed.length; // Base 64
//   let result = "";
//   while (number > 0) {
//     result = seed[number % base] + result;
//     number = Math.floor(number / base);
//   }

//   return result || "0"; // Manejo del caso de número 0
// }

// export function convertFromBase(str) {
//   const base = seed.length; // Base 64

//   let result = 0;
//   for (let i = 0; i < str.length; i++) {
//     const digitValue = seed.indexOf(str[i]);
//     result = result * base + digitValue;
//   }

//   return result;
// }


const toBinary = (value) => {
    let binary = "";
  
    if (!Number.isInteger(value)) {
      for (let i = 0; i < value.length; i++) {
        let ascii = value.charCodeAt(i).toString(2);
        binary += "0".repeat(8 - ascii.length) + ascii;
      }
    } else {
      binary = value.toString(2);
    }
  
    return binary;
  };
  
  
  
  const binToString = (binary) => {
    let word = "";
    for (let i = 0; i < binary.length; i += 8) {
      word += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
    }
    return word;
  };
  
  
  const calculate_base = (binary) => {
    let max_pow = 0;
  
    do {
      if (Math.pow(2, max_pow) >= seed.length) {
        if (Math.pow(2, max_pow) > seed.length) {
          max_pow--;
        }
        break;
      }
      max_pow++;
    } while (true);
  
    if (binary <= max_pow) {
      return binary;
    } else {
      return max_pow;
    }
  };
  
  const generate_table = (HEAD) => {
    let table = [];
    let equi = [];
    for (let i = 0; i < Math.pow(2, HEAD); i++) {
      table.push({ val: seed[i], bin: i.toString(2).padStart(HEAD, "0") });
    }
    return table;
  };
  
  
  const zip_binary = (binary, head) => {
    const table = generate_table(head);
    let max = Math.floor(binary.length / head);
    let token = "";
    let rest = "";
  
    for (let i = 0; i < max; ++i) {
      token += table.filter(
        (b) => b.bin == binary.substring(i * head, (i + 1) * head)
      )[0].val;
    }
  
    rest = binary.substring(max * head, binary.length);
  
    if (rest.length != 0) {
      rest = zip_binary(rest, rest.length)
        .replaceAll("*", "")
        .replaceAll("@", "")
        .split("|");
      rest = `${rest[0]}:${rest[2]}`;
    }
    token += "@" + rest;
  
    //   console.log(zip_binary());
  
    return `*${head}|${max}|${token}*`;
  };
  
  const unzip_rest = (rest) => {
    const [head, cont] = rest.split(":");
    const table = generate_table(head);
  return table.filter((b) => b.val == cont)[0].bin;
  
  };
  
  const unzip_binary = (token) => {
    const [head, max, content] = token.split("|");
    const [dataco, rest] = content.split("@");
    const table = generate_table(head);
    let binary = "";
    for (let i = 0; i < dataco.length; ++i) {
      // token += table.filter(b => b.bin == binary.substring(i * head, (i + 1) * head))[0].val;
      binary += table.filter((b) => b.val == dataco[i])[0].bin;
    }
     if(rest.length != 0){
      binary += unzip_rest(rest)
     }
  
    return binary;
  };
  
  export const build_url =(data)=>{
      const Binary_Data = toBinary(data);
      const Head = calculate_base(Binary_Data.length);
      return zip_binary(Binary_Data, Head);
  
  }
  
  
 export const decode_url  =(url)=>{
      const BinaryData = unzip_binary(url.replaceAll("*", ""));
      return binToString(BinaryData)
  
  }


genen_seed_zip();


