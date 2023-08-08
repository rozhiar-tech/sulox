// Get references to the form elements
const form = document.querySelector("form");
const quantityDecreaseBtn = document.querySelector(".quantity-decrease");
const quantityIncreaseBtn = document.querySelector(".quantity-increase");
const quantityDisplay = document.querySelector(".quantity-display");
const productSelect = document.getElementById("products");
const productTypeSelect = document.getElementById("product_types");
const priceDisplay = document.getElementById("price"); // Add this line

// Initial quantity value
let quantity = 1;

// Product types data
const productTypes = {
  "Hand & Skin Disinfectant": [
    { type: "Hand & Skin Disinfectant 125ml", price: 2500 },
    { type: "Hand & Skin Disinfectant 750ml", price: 6000 },
  ],
  "Multi Surface Disinfectant": [
    { type: "Multi surface Dis 1 L", price: 6000 },
    { type: "Multi surface Dis 5 L", price: 20000 },
    { type: "Multi surface Dis 10 L", price: 40000 },
  ],
  "Air Disinfectant": [
    { type: "Air Disinfectant 5 L", price: 5000 },
    { type: "Air Disinfectant 10 L", price: 10000 },
  ],
  "Pet Disinfectant": [
    { type: "Pet Disinfectant 1 L", price: 9000 },
    { type: "Pet Disinfectant 5 L", price: 25000 },
  ],
  "Fruits & Vegetable Disinfectant": [
    { type: "Fruits & Vegetable Disinfectant 1 L", price: 5000 },
    { type: "Fruits & Vegetable Disinfectant 5 L", price: 15000 },
  ],
  // Add more product types as needed
};

// Event listener for decreasing quantity
quantityDecreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = `Quantity: ${quantity}`;
    updatePrice(); // Update price when quantity changes
  }
});

// Event listener for increasing quantity
quantityIncreaseBtn.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = `Quantity: ${quantity}`;
  updatePrice(); // Update price when quantity changes
});

// Event listener for updating product types
productSelect.addEventListener("change", () => {
  const selectedProduct = productSelect.value;
  const types = productTypes[selectedProduct] || [];

  productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';

  types.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.textContent = `${item.type} (IQD ${item.price}/-)`;
    productTypeSelect.appendChild(option);
  });

  updatePrice(); // Update price when product type changes
});

// Event listener for updating product types
productTypeSelect.addEventListener("change", () => {
  updatePrice(); // Update price when product type changes
});

// Update price display based on selected product, type, and quantity
function updatePrice() {
  const selectedProduct = productSelect.value;
  const selectedTypeIndex = parseInt(productTypeSelect.value);
  const selectedType = productTypes[selectedProduct]?.[selectedTypeIndex];

  if (selectedType) {
    const totalPrice = selectedType.price * quantity;
    priceDisplay.textContent = `Price: IQD ${totalPrice}/-`;
  }
}

// Form submission handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get user inputs
  const firstName = document.getElementById("first_name").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const province = document.getElementById("countries").value;
  const product = productSelect.value;
  const productTypeIndex = parseInt(productTypeSelect.value);
  const productType = productTypes[product]?.[productTypeIndex];
  const totalAmount = productType ? productType.price * quantity : 0;

  if (
    firstName &&
    phoneNumber &&
    province !== "Select Province" &&
    product !== "Select Product" &&
    productTypeIndex >= 0
  ) {
    const formData = {
      firstName,
      phoneNumber,
      province,
      product,
      productType: productType.type,
      quantity,
      totalAmount,
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
