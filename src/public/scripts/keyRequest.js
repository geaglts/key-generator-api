const formInputKey = document.getElementById('form-key-input');

formInputKey.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const formData = Object.fromEntries(new FormData(evt.target));
  const response = await fetch('/file/secure/validate-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (response.status !== 200) {
    if (data.message) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = data.message;
      setTimeout(() => {
        errorMessage.textContent = '';
      }, 4000);
    }
  } else {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${data.base64}`;
    link.download = data.fileName;
    link.click();
  }
});
