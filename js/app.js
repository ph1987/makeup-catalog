window.addEventListener('DOMContentLoaded', () => {
    let data = [];
    let filteredData = [];
    let brandSelect = [];
    let typeSelect = [];

    const fetchProducts = () => {
        fetch('data/products.json')
        .then(response => response.json())
        .then(responseData => {
            data = responseData;
            filteredData = [...data];
            sortData("rating-desc");
            displayProducts();
            fillFilters();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    
    const filterData = () => {
        const nameFilter = document.getElementById('filter-name').value.toLowerCase();
        const brandFilter = document.getElementById('filter-brand').value.toLowerCase();
        const typeFilter = document.getElementById('filter-type').value.toLowerCase();

        filteredData = data.filter(product => {
            const nameMatches = product.name.toLowerCase().includes(nameFilter);
            const brandMatches = product.brand ? product.brand.toLowerCase().includes(brandFilter) : false;
            const typeMatches = product.product_type.toLowerCase().includes(typeFilter);

            return nameMatches && brandMatches && typeMatches;
        });
    }

    const sortData = (option) => {
        if (option === "rating-desc") {
            filteredData.sort((a,b) => b.rating - a.rating)
        }
        if (option === "price-asc") {
            filteredData.sort((a,b) => a.price - b.price)
        }
        if (option === "price-desc") {
            filteredData.sort((a,b) => b.price - a.price)
        }
        if (option === "name-asc") {
            filteredData.sort((a, b) => {
                let productA = a.name.toLowerCase().trim(),
                    productB = b.name.toLowerCase().trim();
            
                if (productA < productB) {
                    return -1;
                }
                if (productA > productB) {
                    return 1;
                }
                return 0;
            });
        }
        if (option === "name-desc") {
            filteredData.sort((a, b) => {
                let productA = a.name.toLowerCase().trim(),
                    productB = b.name.toLowerCase().trim();
            
                if (productB < productA) {
                    return -1;
                }
                if (productB > productA) {
                    return 1;
                }
                return 0;
            });
        }
    }

    const displayProducts = () => {
        let products = document.getElementById('products');
        products.innerHTML = '';
        filteredData.forEach(product => {
            const productName = product.name || '';
            const productBrand = product.brand || '';
            const productImg = product.image_link || '';
            const productPrice = (product.price * 5.50).toFixed(2) || 0;
            const rating = product.rating || 0;
            const category = product.category || '';
            const productType = product.product_type || '';

            const item = `
            <div class="product" data-name=${productName} data-brand=${productBrand} data-type="bronzer" tabindex="508">
                <figure class="product-figure">
                    <img src=${productImg} width="215" height="215" alt=${productName} onerror="javascript:this.src='img/unavailable.png'">
                </figure>
                <section class="product-description">
                    <h1 class="product-name">${productName}</h1>
                    <div class="product-brands">
                        <span class="product-brand background-brand">${productBrand}</span>
                        <span class="product-brand background-price">R$ ${productPrice}</span>
                    </div>
                </section>
                <section class="product-details">
                    <div class="details-row">
                        <div>Brand</div>
                        <div class="details-bar">
                        <div class="details-bar-bg" style="width= 250">${productBrand}</div>
                        </div>
                    </div>
                    <div class="details-row">
                        <div>Price</div>
                        <div class="details-bar">
                        <div class="details-bar-bg" style="width= 250">${productPrice}</div>
                        </div>
                    </div>
                    <div class="details-row">
                        <div>Rating</div>
                        <div class="details-bar">
                        <div class="details-bar-bg" style="width= 250">${rating}</div>
                        </div>
                    </div>
                    <div class="details-row">
                        <div>Category</div>
                        <div class="details-bar">
                        <div class="details-bar-bg" style="width= 250">${category}</div>
                        </div>
                    </div>
                    <div class="details-row">
                        <div>Product Type</div>
                        <div class="details-bar">
                        <div class="details-bar-bg" style="width= 250">${productType}</div>
                        </div>
                    </div>
                </section>
            </div>`;
            const card = document.createElement('div');
            card.innerHTML = item;
            products.appendChild(card);

            brandSelect.indexOf(productBrand) === -1 && brandSelect.push(productBrand);
            typeSelect.indexOf(productType) === -1 && typeSelect.push(productType);
        });
    }

    const fillFilters = () => {
        let brands = document.getElementById('filter-brand');
        let types = document.getElementById('filter-type');

        for (const brand of brandSelect) {
            if (brand.length) {
                brands.add(new Option(brand, brand));
            }
        }

        for (const type of typeSelect) {
            if (type.length) {
                types.add(new Option(type, type));
            }
        }
    }

    document.getElementById('filter-name').addEventListener('input', () => {
        filterData();
        sortData(document.getElementById('sort-type').value);
        displayProducts();
    });
    document.getElementById('filter-brand').addEventListener('input', () => {
        filterData();
        sortData(document.getElementById('sort-type').value);
        displayProducts();
    });
    document.getElementById('filter-type').addEventListener('input', () => {
        filterData();
        sortData(document.getElementById('sort-type').value);
        displayProducts();
    });
    document.getElementById('sort-type').addEventListener('input', () => {
        filterData();
        sortData(document.getElementById('sort-type').value);
        displayProducts();
    });

    fetchProducts();
});

