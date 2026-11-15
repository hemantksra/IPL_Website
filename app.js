// Function to display notifications
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;

  const msgSpan = document.createElement('span');
  msgSpan.className = 'toast-message';
  msgSpan.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'toast-close';
  closeBtn.textContent = 'x';
  closeBtn.onclick = function () {
    toast.remove();
  };

  toast.appendChild(msgSpan);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(function () {
      toast.remove();
    }, duration);
  }
}

// Set up smooth scrolling and form actions when page loads
document.addEventListener('DOMContentLoaded', function () {
  const bookingSection = document.getElementById('booking');
  const matchSelect = document.getElementById('match');

  // Find all schedule book buttons
  const bookButtons = document.querySelectorAll('table a[href*="booking"], a[href="#booking"]');

  bookButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      if (bookingSection) {
        event.preventDefault();

        // Get match name from the table row if available
        const row = button.closest('tr');
        let matchName = '';
        if (row) {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 2) {
            matchName = cells[1].textContent.trim();
          }
        }

        // Select the match in the dropdown
        if (matchSelect && matchName) {
          for (let i = 0; i < matchSelect.options.length; i++) {
            const option = matchSelect.options[i];
            if (option.text.toLowerCase().includes(matchName.toLowerCase()) || 
                option.value.toLowerCase().includes(matchName.toLowerCase())) {
              matchSelect.value = option.value;
              break;
            }
          }
        }

        // Smooth scroll to the form
        bookingSection.scrollIntoView({ behavior: 'smooth' });

        // Show confirmation toast
        if (matchName) {
          showToast('Selected ' + matchName + '. Please complete your booking.', 'success');
        } else {
          showToast('Please fill out the booking form.', 'info');
        }
      }
    });
  });

  // Display notification on form submit
  const forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function () {
      if (form.checkValidity()) {
        showToast('Ticket booking submitted successfully!', 'success');
      }
    });
  });
});
