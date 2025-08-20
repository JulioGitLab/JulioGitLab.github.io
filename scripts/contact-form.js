const form = document.getElementById("form");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Honeypot check (deprecated and no longer supported by Web3Forms?)
  const botCheck = form.querySelector('input[name="botcheck"]');
  if (botCheck.checked) {
    result.innerHTML = "You are a robot!";
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const json = JSON.stringify(data);
  result.innerHTML = "Please wait...";
  // submitBtn.setAttribute("disabled", true); // Alternative method to disable the button
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    });

    const responseData = await response.json();
    if (response.ok) {
      result.innerHTML = "Form submitted successfully";
    } else {
      result.innerHTML = responseData.message || "An error occurred. Please try again later.";
    }
  } catch (error) {
    console.error(error);
    result.innerHTML = "Something went wrong!";
  } finally {
    // submitBtn.removeAttribute("disabled"); // Alternative method to enable the button
    submitBtn.disabled = false;
    form.reset();
    setTimeout(() => {
      result.style.display = "none";
    }, 3000);
  }
});
