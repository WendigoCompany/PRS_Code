// import GET_ASIAN_SEED from "./asian_seed";
import seeds from "./raw_seeds.json";
export let seed = [];

export let zip_char = [];

let base = 2;
const filtrateSeed = (arr) => {
  arr.split("").map((k) => {
    if (seed.indexOf(k) == -1) {
      seed.push(k);
    }
  });
};

const genen_seed_zip = () => {
  // let specialSeed = "qwertyuiopasdfghjklzxcvbnm".split("");

  // let seed1 = "23456789".split("");
  // let s = "qwertyuiopasdfghjklzxcvbnm".split("");
  // let seed3 = ",-{+};_".split("");
  // let seed2 = [];

  // seed = seed.concat(seed1);
  // for (let i = 0; i < s.length; i++) {
  //   seed2.push(s[i]);
  //   seed2.push(s[i].toUpperCase());
  // }
  // seed = seed.concat(seed2);
  // seed = seed.concat(seed3);
  // seed = seed.concat(GET_ASIAN_SEED());

  // seed = seed.concat(kanjis.split(""));

  // seed = seed.concat(kana);

  seeds.map((s) => {
    filtrateSeed(s);
  });
};

const parseBoolArr = (bArr) => {
  return bArr.map((v) => (v ? 1 : 0));
};

const toBinary = (value) => {
  let binary = "";

  if (!Number.isInteger(value)) {
    for (let i = 0; i < value.length; i++) {
      let ascii = value.charCodeAt(i).toString(2);
      binary += ascii + "z";
    }
  } else {
    binary = value.toString(2) + "z";
  }

  return binary;
};

// const toBinary = (value) => {
//   let binary = "";

//   if (!Number.isInteger(value)) {
//     for (let i = 0; i < value.length; i++) {
//       let ascii = value.charCodeAt(i).toString(2);
//       binary += "0".repeat(8 - ascii.length) + ascii;
//     }
//   } else {
//     binary = value.toString(2);
//   }

//   return binary;
// };

// const binToString = (binary) => {
//   let word = "";
//   for (let i = 0; i < binary.length; i += 8) {
//     word += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
//   }
//   return word;
// };

const binToString = (binary) => {
  let word = "";
  const binary_frags = binary.split("z").filter((bf) => bf != "");
  // for (let i = 0; i < binary.length; i += 8) {
  //   word += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
  // }
  for (let i = 0; i < binary_frags.length; i++) {
    word += String.fromCharCode(parseInt(binary_frags[i], 2));
  }

  console.log(word);
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
    // table.push({ val: seed[i], bin: i.toString(2).padStart(HEAD, "0") });
    table.push({ val: seed[i], bin: i.toString(2) });
  }
  return table;
};

const zip_binary = (binary, head) => {
  const table = generate_table(head);
  let max = Math.floor(binary.replaceAll("z", "").length / head);

  let token = "";
  let rest = "";

  const binary_frags = binary.split("z").filter((bf) => bf != "");

  let toBin = "";

  for (let i = 0; i < binary_frags.length; i++) {
    // if(toBin.length >  ){

    // }else if(){

    // }else if(){

    // }

    token += table.filter((b) => b.bin == binary_frags[i])[0].val;
  }

  // for (let i = 0; i < max; ++i) {
  //   token += table.filter(
  //     (b) => b.bin == binary.substring(i * head, (i + 1) * head)
  //   )[0].val;
  // }

  // rest = binary.substring(max * head, binary.length);

  // if (rest.length != 0) {
  //   rest = zip_binary(rest, rest.length)
  //     .replaceAll("*", "")
  //     .replaceAll("@", "")
  //     .split("|");
  //   rest = `${rest[0]}:${rest[2]}`;
  // }
  // token += "@" + rest;

  //   console.log(zip_binary());

  return `${head}|${token}`;
};

const unzip_rest = (rest) => {
  const [head, cont] = rest.split(":");
  const table = generate_table(head);
  return table.filter((b) => b.val == cont)[0].bin;
};

const unzip_binary = (token) => {
  const [head, content] = token.split("|");
  const [dataco, rest] = content.split("@");
  const table = generate_table(head);
  let binary = "";

  console.log(dataco, rest);

  for (let i = 0; i < dataco.length; ++i) {
    // token += table.filter(b => b.bin == binary.substring(i * head, (i + 1) * head))[0].val;
    binary += table.filter((b) => b.val == dataco[i])[0].bin + "z";
  }

  if (rest != undefined && rest.length != 0) {
    binary += unzip_rest(rest);
  }

  return binary;
};

export const build_url = (data) => {
  const Binary_Data = toBinary(data);
  const Head = calculate_base(Binary_Data.replaceAll("z", "").length);
  return zip_binary(Binary_Data, Head);
};

export const decode_url = (url) => {
  const BinaryData = unzip_binary(url);
  return binToString(BinaryData);
};

genen_seed_zip();

const t =
  "12|会亻仙仵价仅亻仙企仙仓亻仭伀伓伎伂仙亻仓仵价仅亻仙仓仵价仅仓亻伄伍亻伜";

const passToDict = (password) => {
  const dict = {};
  for (let i = 0; i < password.length; i++) {
    if (dict[password[i]] == undefined) {
      dict[password[i]] = 0;
    }
    dict[password[i]]++;
  }

  const arr = [];

  Object.keys(dict).map((k) => {
    if (dict[k] > 2) {
      arr.push({ v: k, r: dict[k] });
    }
  });
  return arr;
};

const unzip_password = (token) => {
  const max_size = " qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split(
    ""
  );

  if (token.split("|").length == 3) {
    let word = token.split("|")[2];
    const head = token.split("|")[1];
    for (let i = 0; i < head.length; i++) {
      const specialADD = max_size[Math.floor(i / 10)] || "";
      word = word.replaceAll(
        `${specialADD}${i - 10 * (Math.floor(i / 10))}`,
        head[i]
      );
    }

    token = token.split("|")[0] + "|" + word;
  }

  return token;
};

const zip_password = (password) => {
  let pass_raw = password.split("|")[1];
  pass_raw = pass_raw.substring(0, pass_raw.length);
  const repeats = passToDict(pass_raw);

  if (repeats.length > 0) {
    let finalPassword = password.split("|")[0] + "|";
    let dict = "";

    //  repeats.map(r => dict+=r.v)

    const max_size =
      " qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split("");

    for (let i = 0; i < repeats.length; i++) {
      dict += repeats[i].v;
      const specialADD = max_size[Math.floor(i / 10)] || "";
      pass_raw = pass_raw.replaceAll(repeats[i].v, `${specialADD}${i - 10 * (Math.floor(i / 10))}`);

    }

    dict += "|" + pass_raw;

    finalPassword += dict;
    return finalPassword;
  } else {
    return password;
  }
};

console.clear();
const token = zip_password(t);
console.log(token);
const word = unzip_password(token);
console.log(word);
console.log(t == word);

