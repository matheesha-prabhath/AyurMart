import React, { useEffect, useState } from "react";
import MainNav from "./MainNav.js";
import Footer from "./Footer.js"
import "../assets/styles/productpage.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3005/products/all")
            .then((response) => response.json())
            .then((data) => setProducts(data.data))
            .catch((error) => console.log(error));
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    return (
        <div><MainNav />
            <div className="product-grid"> {/* Add the article-grid class here */}
                {products.map((product) => (
                    <div className="product-card" key={product._id}> {/* Add the article-card class here */}
                        <img src={`http://localhost:3005/${product.productImage}`} alt={`${product.productName}`} /> {/* Add the alt attribute for accessibility */}
                        <a href={`/shop/${product._id}`}>{product.productName}</a> {/* Add a link to the full article */}
                        <p>{formatPrice(product.productPrice)}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;
