import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './../core/Layout';
import {isAuthenticated} from './../auth';
import {getProducts, deleteProduct} from './apiAdmin'

const ManageProducts = () => {

    const {user, token} = isAuthenticated();
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts();
            }
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <Layout title="Manage Products" 
                description="CRUD on products"
                classname="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {products.length} products</h2>
                    <hr/>
                    <ul className="list-group">
                        {products.map((product, ind) => (
                            <li key={ind} className="list-group-item d-flex justify-content-between aligns-items-center">
                                <strong>{product.name}</strong>
                                <Link to={`/admin/product/update/${product._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span onClick = {() => destroy(product._id)} className="badge badge-danger badge-pill">
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts;