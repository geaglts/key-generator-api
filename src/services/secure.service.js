import bcrypt from 'bcrypt';

export async function encrypt(value) {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(value, salt);
  return result;
}

export async function decrypt(input, secureInput) {
  const result = await bcrypt.compare(input, secureInput);
  return result;
}
