const $ = (selector) => document.querySelector(selector);

let itemsToCopy = [];

const validateKeySize = () => {
  try {
    const sizeValue = $('#key-size')?.value;
    if (sizeValue) {
      if (Number.isNaN(parseInt(sizeValue, 10))) {
        throw new Error('El valor ingresado no es un número');
      }
      return parseInt(sizeValue, 10);
    }
    $('#key-size').value = 18;
    return 18;
  } catch (error) {
    $('#key-size').value = 18;
    return 18;
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
      $('#generated-key').textContent = `${data.key.slice(0, 20)}...`;
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
    $('#copy-success').classList.remove('inactive');
    $('#copy-success').classList.add('active');
    setTimeout(() => {
      $('#copy-success').classList.remove('active');
      $('#copy-success').classList.add('inactive');
    }, 2000);
  }
};

const submitForm = (evt) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    generateKey();
  }
};

$('#key-generator').addEventListener('keydown', submitForm);
$('.key-action-generate').onClick = generateKey;
$('.key-action-clear').onClick = clearKeyInput;
$('.key-action-copy').onClick = copyKey;
