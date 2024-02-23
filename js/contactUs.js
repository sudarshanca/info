document.addEventListener('DOMContentLoaded', function() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwpkbzRIX7Y2fl5fqBhIzUTyj_xlTYO91xqNURdxkLj17nndTWpeL6USigxlbKerZk1/exec';
  const form = document.forms['contactform'];
  const successMessage = document.getElementById('success-message');
  const loader = document.getElementById('loader');

  form.addEventListener('submit', e => {
      e.preventDefault();

      // Show the loader when the form is submitted
      loader.style.display = 'block';

      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              if (response.ok) {
                  // Hide the loader on success
                  loader.style.display = 'none';
                  // Show success message
                  successMessage.style.display = 'block';
                  // Reset the form after a delay
                  setTimeout(() => {
                      form.reset();
                      successMessage.style.display = 'none';
                  }, 3000); // Adjust the delay as needed
              } else {
                  throw new Error('Network response was not ok.');
              }
          })
          .catch(error => {
              console.error('Error!', error.message);
              // Hide the loader on error
              loader.style.display = 'none';
          });
  });
});
