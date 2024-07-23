document.addEventListener("DOMContentLoaded", function() {
  const passwordToCheck = document.getElementById("passwordToCheck").value;
  const csvUrl = "https://raw.githubusercontent.com/Leoneyy/datx/main/pass.csv";

  fetch(csvUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.text();
    })
    .then(data => {
      const isPasswordPresent = data.split('\n').some(line => line.includes(passwordToCheck));
      if (isPasswordPresent) {
        loadPopupContent();
      } else {
        showError();
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      showError();
    });

  function loadPopupContent() {
    if (typeof loadContent === 'function') {
      loadContent();
    } else {
      console.error('loadContent function is not defined in popup.js');
    }
  }

  function showError() {
    document.getElementById("root").innerHTML = `
      <p><b>Account Suspended</b><br/><br/>Renew:<br/>03200485873</p>
    `;
  }
});

