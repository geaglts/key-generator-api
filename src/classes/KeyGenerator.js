class KeyGenerator {
  #key = '';

  #size = 0;

  #characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '123456789',
    symbols: '!@#$%^&*()+_=-<>.;:~ñ[]?,{}',
  };

  constructor(size = 0) {
    this.#size = Number(size);
  }

  static randomNumber(end = 1) {
    return Math.floor(Math.random() * end);
  }

  generateKey() {
    this.#key = '';
    const { lowercase, uppercase, numbers, symbols } = this.#characters;
    const concat = `${lowercase}${uppercase}${numbers}${symbols}`;
    for (let i = 0; i < this.#size; i += 1) {
      const randomNumber = KeyGenerator.randomNumber(concat.length);
      this.#key += concat[randomNumber];
    }
  }

  get key() {
    return this.#key;
  }

  set key(key) {
    this.#key = key;
  }

  get size() {
    return this.#size;
  }

  set size(size) {
    if (Number(size) < 1) {
      this.#size = 0;
    } else {
      this.#size = Number(size);
    }
  }
}

export default KeyGenerator;
