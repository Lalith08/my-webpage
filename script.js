document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.about-me');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
        }
      });
    });
    observer.observe(section);
  });


  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Validate form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (!name || !email || !message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!'
      });
      return;
    }
  
    const data = {
      name: name,
      email: email,
      message: message
    };
  
    fetch(event.target.action, {
      method: event.target.method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been sent successfully!',
          confirmButtonText: 'OK'
        });
        event.target.reset();
      } else {
        return response.json().then(data => {
          throw new Error(data.error || 'Something went wrong');
        });
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error sending message. Please try again later.'
      });
      console.error('Error:', error);
    });
  });
  
  
  
  //https://formspree.io/f/xovaanae