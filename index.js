const form = document.querySelector("form");
const quantityDecreaseBtn = document.querySelector(".quantity-decrease");
const quantityIncreaseBtn = document.querySelector(".quantity-increase");
const quantityDisplay = document.querySelector(".quantity-display");
const priceDisplay = document.getElementById("price");
const productGrid = document.getElementById("productGrid");

let quantity = 1;

const products = [
  "Fruits & Vegetable Disinfectant 1 L",
  "Fruits & Vegetable Disinfectant 5 L",
  "Hand & Skin Disinfectant 125ml",
  "Hand & Skin Disinfectant 750ml",
  "Multi surface Dis 1 L",
  "Multi surface Dis 5 L",
  "Multi surface Dis 10 L",
  "Pet Disinfectant 1 L",
];

quantityDecreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = `Quantity: ${quantity}`;
    updatePrice();
  }
});

quantityIncreaseBtn.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = `Quantity: ${quantity}`;
  updatePrice();
});

function generateProductGrid() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "flex items-center cursor-pointer";
    productDiv.addEventListener("click", () => updateProduct(product));

    const productImage = document.createElement("img");
    productImage.src = `${window.location.origin}/assets/items/${product}.svg`;
    productImage.alt = product;
    productImage.className = "w-12 h-12 mr-2";

    const productName = document.createElement("span");
    productName.textContent = product;

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productGrid.appendChild(productDiv);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstName = document.getElementById("first_name").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const province = document.getElementById("countries").value;
  const selectedProduct = document.getElementById("selected_product").value;
  const totalAmount = getPrice(selectedProduct) * quantity;

  if (
    firstName &&
    phoneNumber &&
    province !== "Select Province" &&
    selectedProduct
  ) {
    const formData = {
      firstName,
      phoneNumber,
      province,
      selectedProduct,
      quantity,
      totalAmount,
    };

    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

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

// Update the product and price display
function updateProduct(product) {
  document.getElementById("selected_product").value = product;
  updatePrice();
}

// Update the price display based on the selected product and quantity
function updatePrice() {
  const selectedProduct = document.getElementById("selected_product").value;
  const totalPrice = getPrice(selectedProduct) * quantity;
  priceDisplay.textContent = `Price: IQD ${totalPrice}`;
}

// Get the price of a product
function getPrice(product) {
  switch (product) {
    case "Fruits & Vegetable Disinfectant 1 L":
      return 5000;
    case "Fruits & Vegetable Disinfectant 5 L":
      return 15000;
    case "Hand & Skin Disinfectant 125ml":
      return 2500;
    case "Hand & Skin Disinfectant 750ml":
      return 6000;
    case "Multi surface Dis 1 L":
      return 6000;
    case "Multi surface Dis 10 L":
      return 40000;
    case "Multi surface Dis 5 L":
      return 20000;
    case "Pet Disinfectant 1 L":
      return 9000;
    default:
      return 0;
  }
}

// Initialize the product grid
generateProductGrid();
