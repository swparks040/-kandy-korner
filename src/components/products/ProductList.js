import { useEffect, useState } from "react"
import "./Products.css"
export const ProductList = () => {
    const [products, setProducts] = useState([])
    // By default, I do not want to show topPriced candy, so pass "false" in useState for topPriced.
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPricedProducts, setTopPricedProducts] = useState(false)
// Employee function
    // useEffect(
    //     () => {
    //         if ()
    //     }
    // )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                }) // View the initial state of products
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {setFilteredProducts(products)},[products]
    )

    useEffect(
        () => {
            if (topPricedProducts) {
                const topPricedProductArray = products.filter(product => {
                    return product.price > 2.00
                })
                setFilteredProducts(topPricedProductArray)
            }
            else {
                setFilteredProducts(products)

            }
        },
        [topPricedProducts]
    )
    return <>
    <button
        onClick={
            () => {setTopPricedProducts(true)}
        }
        >Top Priced</button>
    <h2>List of Products</h2>
            <article className="products">
                {
                    filteredProducts.map(
                        (product) => {
                            return <section className="product" key={`product--${product.id}`}>
                                <header>{product.name}
                                </header>
                                <footer>cost: {product.price}
                                </footer>
                            </section>
                        }
                    )
                }
            </article>
            </>

}