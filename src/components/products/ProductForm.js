import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [productTypes, setProductTypes] = useState([])
    const [product, update] = useState({
        name: "",
        productTypeId:(0),
        price: "",
        onSale: false
    })
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productTypeArray) => {
                setProductTypes(productTypeArray)
            })
        },
        []
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
const navigate = useNavigate()
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Create the object to be saved to the API
            const productToSendToAPI = {
                productTypeId: product.productTypeId,
                name: product.name,
                price: product.price,
            }
        // TODO: Perform the fetch() to POST the object to the API
        fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/products")
        })
    }
    return (
        <form className="productForm">
            <h2 className="productForm__title">New Kandy Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Kandy Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter New Kandy Name Here"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Kandy Kategory:</label>
                   <select className="form-control" onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        }>
                       <option value="">Select Kandy Kategory</option>
                       {productTypes.map(productType => {
                           return <option value={productType.id}>{productType.type}</option>
                       })}

                   </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Kandy Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter New Kandy Price Here"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit New Kandy
            </button>
        </form>
    )
}