import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"
export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    // By default, I do not want to show topPriced candy, so pass "false" in useState for topPriced.
    const navigate = useNavigate()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPricedProducts, setTopPricedProducts] = useState(false)

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredProducts(searchedProducts)
        }, [ searchTermState ]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                }) // View the initial state of products
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (kandyUserObject.staff) {
                //for employees
                setFilteredProducts(products)
            } else {
               //for customers 
               const myProducts = products.filter(product => product.userId === kandyUserObject.id)
               setFilteredProducts(myProducts)
            }
        },
        [products]
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
           { 
                kandyUserObject.staff
                    ? <>
                    <button onClick={() => {setTopPricedProducts(true)}}>Top Priced</button>
                    <button onClick={() => navigate("/product/create")}>Create Kandy</button>
                    </>
                    : ""
        
        }

    <h2>List of Products</h2>
            <article className="products">
                {
                    filteredProducts.map(
                        (product) => {
                            return <section className="product" key={`product--${product.id}`}>
                                <header>{product.name}
                                </header>
                                <footer>Cost: ${product.price}
                                </footer>
                                <div>Kandy Kategory: {product.productType.type}</div>
                            </section>
                        }
                    )
                }
            </article>
            </>

}