// Get references to the form elements
const form = document.querySelector("form");
const quantityDecreaseBtn = document.querySelector(".quantity-decrease");
const quantityIncreaseBtn = document.querySelector(".quantity-increase");
const quantityDisplay = document.querySelector(".quantity-display");

// Initial quantity value
let quantity = 1;

// Event listener for decreasing quantity
quantityDecreaseBtn.addEventListener("click", () => {
  console.log("clicked");
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = `Quantity: ${quantity}`;
  }
});

// Event listener for increasing quantity
quantityIncreaseBtn.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = `Quantity: ${quantity}`;
});

// Form submission handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get user inputs
  const firstName = document.getElementById("first_name").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const province = document.getElementById("countries").value;
  const product = document.getElementById("products").value;

  if (
    firstName &&
    phoneNumber &&
    province !== "Select Province" &&
    product !== "Select Product"
  ) {
    const formData = {
      firstName,
      phoneNumber,
      province,
      product,
      quantity,
    };

    // Replace 'YOUR_USER_ID' with your EmailJS user ID
    emailjs.init("mAo1J2xhp3Q1aUis7");

    try {
      const response = await emailjs.send(
        "service_eltrqgp",
        "template_q57pq8q",
        formData
      );

      if (response.status === 200) {
        alert("Your order has been placed successfully!");
      } else {
        console.error("Error sending email:", response.text);
      }
    } catch (error) {
      alert("There was an error sending your order. Please try again.");
    }
  } else {
    alert("Please fill out all the required fields.");
  }
});
