import { getLastProductId } from '../models/product_model.js';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  
const numbers = '0123456789';                   
const symbols = '!@#$%^&*';                     
const extraChars = 'XYZ123';                   

async function generateUniqueId() {
  const lastId = await getLastProductId();

  const newId = lastId % (letters.length * numbers.length * symbols.length * extraChars.length);

  const letterIndex = newId % letters.length;
  const numberIndex = Math.floor(newId / letters.length) % numbers.length;
  const symbolIndex = Math.floor(newId / (letters.length * numbers.length)) % symbols.length;
  const extraIndex = Math.floor(newId / (letters.length * numbers.length * symbols.length)) % extraChars.length;

  const uniqueId = `${letters[letterIndex]}${numbers[numberIndex]}${symbols[symbolIndex]}${extraChars[extraIndex]}`;

  return uniqueId;
}

export { generateUniqueId };
