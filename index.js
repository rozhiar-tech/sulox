const form = document.querySelector("form");
const quantityDecreaseBtn = document.querySelector(".quantity-decrease");
const quantityIncreaseBtn = document.querySelector(".quantity-increase");
const quantityDisplay = document.querySelector(".quantity-display");
const priceDisplay = document.getElementById("price");
const productGrid = document.getElementById("productGrid");
const languageButton = document.getElementById("languageButton");

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
const translations = {
  en: {
    firstName: "First name",
    phoneNumber: "Phone Number",
    selectProvince: "Select Province",
    address: "Address",
    inputAddress: "Input the address",
    price: "Price",
    selectedProduct: "Selected Product",
    quantity: "Quantity",
    changeLanguage: "العربية",
    // Add more translations as needed
  },
  ar: {
    firstName: "اسم",
    phoneNumber: "رقم التليفون",
    selectProvince: "حدد مقاطعة",
    address: "عنوان",
    inputAddress: "أدخل العنوان",
    price: "سعر",
    selectedProduct: "المنتج المحدد",
    quantity: "كمية",
    submit: "تقديم الطلب",
    changeLanguage: "English",

    // Add translated product names
    "Fruits & Vegetable Disinfectant 1 L": "مطهر الخضار والفواكه 1ل",
    "Fruits & Vegetable Disinfectant 5 L": "مطهر الخضار والفواكه 5ل",
    "Hand & Skin Disinfectant 125ml": "مطهر اليدين والجلد 125مل",
    "Hand & Skin Disinfectant 750ml": "مطهر اليدين والجلد 750مل",
    "Multi surface Dis 1 L": "مطهر الأسطح 1ل",
    "Multi surface Dis 10 L": "مطهر الأسطح 10ل",
    "Multi surface Dis 5 L": "مطهر الأسطح 5ل",
    "Pet Disinfectant 1 L": "مطهر الحيوانات الأليفة 1ل",
    // Add more translations as needed
  },
};

// Default language
let currentLanguage = "en";

// Function to update text content based on the selected language
function updateLanguage(language) {
  // console.log("Updating language to", language);
  const translatedText = translations[language];
  Object.keys(translatedText).forEach((key) => {
    const element = document.querySelector(`[data-translate="${key}"]`);
    if (element) {
      element.textContent = translatedText[key];
    }
  });
}

// Handle language button click
document.getElementById("languageButton").addEventListener("click", () => {
  console.log(translations[currentLanguage].changeLanguage);
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  languageButton.textContent = translations[currentLanguage].changeLanguage;

  updateLanguage(currentLanguage);
});

// Initialize text content based on the default language
updateLanguage(currentLanguage);

quantityDecreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = `${translations[currentLanguage].quantity}: ${quantity}`;

    updatePrice();
  }
});

quantityIncreaseBtn.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = `${translations[currentLanguage].quantity}: ${quantity}`;

  updatePrice();
});

function generateProductGrid() {
  productGrid.innerHTML = "";

  products.forEach((productName) => {
    const productDiv = document.createElement("div");
    productDiv.className = "flex items-center cursor-pointer product-item";
    productDiv.addEventListener("click", () => updateProduct(productName));

    const productImage = new Image();
    productImage.src = `./assets/items/${productName}.svg`;
    productImage.alt = productName;
    productImage.className = "w-12 h-12 mr-2";

    const productNameElement = document.createElement("span");
    productNameElement.className = "text-sm font-semibold";

    // Get translated product name or use the default name if not available
    const translatedName =
      translations[currentLanguage][productName] || productName;
    productNameElement.textContent = translatedName;

    productNameElement.setAttribute("data-translate", productName);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productNameElement);
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
  document.querySelectorAll(".product-item").forEach((item) => {
    item.classList.remove("selected");
  });

  const selectedProductDiv = event.currentTarget;
  selectedProductDiv.classList.add("selected");

  const selectedProductElement = document.getElementById("selected_product");
  selectedProductElement.value = product; // Update selected product value

  // Translate and update selected product name
  const translatedProductName = translations[currentLanguage][product];
  selectedProductElement.setAttribute("data-translate", product);
  selectedProductElement.value = translatedProductName || product; // Use original product name if translation is not available

  updatePrice();
}
// Update the price display based on the selected product and quantity
function updatePrice() {
  const selectedProduct = document.getElementById("selected_product").value;
  const englishProductName = document
    .getElementById("selected_product")
    .getAttribute("data-translate");
  const translatedProductName =
    translations[currentLanguage][englishProductName];

  const price = getPrice(englishProductName) * quantity;

  priceDisplay.textContent = `Price: ${
    currentLanguage === "ar" ? price + " IQD" : "IQD " + price
  }`;
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
