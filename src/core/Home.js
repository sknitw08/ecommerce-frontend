import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import Search from './Search';

import {getProducts} from './apiCore';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data);
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data);
            }
        })
    }

    useEffect(() => {
        loadProductByArrival();
        loadProductBySell();
    }, [])

    return (
            <Layout title="Home Page" description="Ecommerce App" classname="container-fluid">
                <Search />
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productsByArrival.map((product, index) => (
                        <div key={index} className="col-4 mb-3">
                            <Card product={product}/>
                        </div>
                ))}
                </div>

                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((product, index) => (
                        <div key={index} className="col-4 mb-3">
                            <Card product={product}/>
                        </div>
                ))}
                </div>
            </Layout>
    )
}

export default Home;