const crypto = require("crypto");

const alg = "aes-256-ctr";
const pwd = "senha-secreta";

const encode = (text: string) => {
  const cipher = crypto.createCipher(alg, pwd);
  const crypted = cipher.update(text, "utf8", "hex");
  return crypted;
};

const decode = (text: string) => {
  const decipher = crypto.createDecipher(alg, pwd);
  const plain = decipher.update(text, "hex", "utf8");
  return plain;
};

export const $crypto = { encode, decode };
