const form = document.querySelector('#my-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario (enviar a una nueva página)

  const formData = new FormData(form); // Crear un objeto FormData con los valores del formulario

  try {
    const response = await fetch('/messages', {
      method: 'POST',
      body: formData
    });

    const data = await response.json(); // Si la respuesta del servidor es JSON
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
