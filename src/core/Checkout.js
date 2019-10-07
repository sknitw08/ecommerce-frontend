import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';

import {isAuthenticated} from './../auth/';
import {getBraintreeClientToken, processPayment, createOrder} from './apiCore';
import {emptyCart} from './cartHelpers';

const Checkout = ({products, setRun = f => f, run = undefined}) => {
    const [data, setData] = useState({
        loading: false,
        success : false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.errror});
            } else {
                console.log(data.clientToken);
                setData({clientToken: data.clientToken});
            }
        })
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }
    const showCheckOut = () => {
        console.log('coming here');
        return isAuthenticated() ? (
                <div>{showDropIn()}</div>
            ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
            );
    }

    let deliveryAddress = data.address;
    const buy = () => {
        setData({ loading: true});
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data);
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(userId, token, paymentData)
            .then(response => {
                console.log(response);

                const createOrderData = {
                    products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }
                createOrder(userId, token, createOrderData)
                .then(response => {
                    emptyCart(() => {
                        console.log('empty cart');
                        setData({ loading: false});
                    });
                    setData({...data, success: true});
                    setRun(!run);
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
                setData({loading: false});
            });
        })
        .catch(error => {
            console.log('dropin error: ', error);
            setData({...data, error: error.message});
        })
    }

    const showError = error => (
        <div className="alert alert-danger" style={{display: error? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success? '' : 'none'}}>
            Your payment was successful!!!!
        </div>
    )

    const showLoading = (loading) => loading && <h2>Loading...</h2>

    const handleAddress = event => {
        setData({...data, address: event.target.value});
    }

    const showDropIn = () => {
        console.log('Show karooo');
        return <div onBlur={() => setData({...data, error:''})}>
            {(data.clientToken !== null && products.length > 0) ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your delivery address" />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: 'vault'
                        }
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ) : null }
        </div>
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckOut()}
        </div>
    )
}

export default Checkout;