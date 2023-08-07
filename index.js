// Get references to the form elements
const form = document.querySelector("form");
const quantityDecreaseBtn = document.querySelector(".quantity-decrease");
const quantityIncreaseBtn = document.querySelector(".quantity-increase");
const quantityDisplay = document.querySelector(".quantity-display");
const productSelect = document.getElementById("products");
const productTypeSelect = document.getElementById("product_types"); // Add this line

// Initial quantity value
let quantity = 1;

// Product types data
const productTypes = {
  "Hand & Skin Disinfectant": [
    "Hand & Skin Disinfectant 125ml",
    "Hand & Skin Disinfectant 750ml",
  ],
  "Multi Surface Disinfectant": [
    "Multi surface Dis 1 L",
    "Multi surface Dis 5 L",
    "Multi surface Dis 10 L",
  ],
  "Air Disinfectant": ["Air Disinfectant 5 L", "Air Disinfectant 10 L"],
  "Pet Disinfectant": ["Pet Disinfectant 1 L", "Pet Disinfectant 5 L"],
  "Fruits & Vegetable Disinfectant": [
    "Fruits & Vegetable Disinfectant 1 L",
    "Fruits & Vegetable Disinfectant 5 L",
  ],

  // Add more product types as needed
};

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

// Event listener for updating product types
productSelect.addEventListener("change", () => {
  const selectedProduct = productSelect.value;
  const types = productTypes[selectedProduct] || [];

  // Clear existing options
  productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';

  // Add new options based on selected product
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    productTypeSelect.appendChild(option);
  });
});

// Form submission handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get user inputs
  const firstName = document.getElementById("first_name").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const province = document.getElementById("countries").value;
  const product = productSelect.value; // Update this line
  const productType = productTypeSelect.value; // Add this line

  if (
    firstName &&
    phoneNumber &&
    province !== "Select Province" &&
    product !== "Select Product" &&
    productType !== "Select Product Type" // Add this condition
  ) {
    const formData = {
      firstName,
      phoneNumber,
      province,
      product,
      productType, // Add this line
      quantity,
      price: quantity * 100, // Update this line
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
