document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menu = document.querySelector("#menu");
  const navLinks = document.querySelector(".links");

  if (menu && navLinks) {
    menu.onclick = () => {
      menu.classList.toggle("fa-times");
      navLinks.classList.toggle("active");
    };
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Form Submission
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission

      // Show loading state
      const submitButton = form.querySelector("button[type='submit']");
      submitButton.innerHTML = "Sending...";
      submitButton.disabled = true;

      // Get the form data
      const formData = new FormData(form);

      // Send the form data to Formspree
      fetch("https://formspree.io/f/xjkgrkdk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show success message
            successMessage.style.display = "block";
            form.reset(); // Clear the form
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 3000); // Hide the message after 3 seconds
          } else {
            alert("Oops! Something went wrong. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Oops! Something went wrong. Please try again.");
        })
        .finally(() => {
          // Reset button state
          submitButton.innerHTML = "Submit";
          submitButton.disabled = false;
        });
    });
  } else {
    console.error("Form not found!");
  }
});
