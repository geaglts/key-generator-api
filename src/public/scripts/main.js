const $ = (selector) => document.querySelector(selector);

let itemsToCopy = [];

const validateKeySize = () => {
  try {
    const sizeValue = $('#key-size')?.value;
    if (sizeValue) {
      if (isNaN(parseInt(sizeValue))) {
        throw new Error('El valor ingresado no es un número');
      }
      return parseInt(sizeValue);
    } else {
      $('#key-size').value = 18;
      return 18;
    }
  } catch (error) {
    $('#key-size').value = 18;
    return 18;
  }
};

const submitForm = (evt) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    generateKey();
  }
};

const generateKey = () => {
  itemsToCopy = [];
  const keySize = validateKeySize();
  fetch(`/api/v1/key-generator/random-key?size=${keySize}`, {
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if ($('#key-title').value) {
        itemsToCopy.push($('#key-title').value);
      }
      itemsToCopy.push(data.key);
      $('#generated-key').textContent = data.key;
    });
};

const clearKeyInput = () => {
  $('#key-size').value = null;
  $('#key-title').value = null;
  $('#generated-key').textContent = 'La clave generada es:';
  itemsToCopy = [];
};

const copyKey = () => {
  if (itemsToCopy.length > 0) {
    navigator.clipboard.writeText(itemsToCopy.join('\n'));
  }
};

$('#key-generator').addEventListener('keydown', submitForm);
