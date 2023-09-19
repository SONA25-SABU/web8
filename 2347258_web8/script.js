// When the HTML document is fully loaded and ready
document.addEventListener("DOMContentLoaded", function () {
    // Get references to key HTML elements
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    let products = [];

    // Function to fetch products data from the server
    function fetchProducts() {
        fetch("https://cynthiaesthermetilda.github.io/Xhrdemo/products.json")
            .then((response) => response.json())
            .then((data) => {
                products = data;
                displayProducts(products);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }

    // Function to display products on the webpage
    function displayProducts(productsToDisplay) {
        productList.innerHTML = ""; // Clear the existing product list

        productsToDisplay.forEach((product) => {
            // Create a new product card
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            // Create an image element and set its source
            const productImage = document.createElement("img");
            productImage.src = product.image_url;

            // Create a heading for the product name
            const productName = document.createElement("h2");
            productName.textContent = product.name;

            // Create a paragraph for the product description
            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            // Create a paragraph for the product price
            const productPrice = document.createElement("p");
            productPrice.textContent = `$${product.price.toFixed(2)}`;

            // Append elements to the product card
            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);

            // Append the product card to the product list
            productList.appendChild(productCard);
        });
    }

    // Event listener for the search input
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Event listener for the sorting dropdown
    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        const sortedProducts = [...products].sort((a, b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortBy === "price") {
                return a.price - b.price;
            }
        });
        displayProducts(sortedProducts);
    });

    // Fetch products when the page loads
    fetchProducts();
});
