import {API} from './../config';

export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const createProduct = (userId, token, product) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getCategories = () => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const listOrders = (userId, token) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getStatusValues = (userId, token) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const updateOrderStatus = (userId, orderId, token, status) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getProducts = () => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/products?limit=undefined`, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const deleteProduct = (productId, userId, token) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getProduct = (productId) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const updateProduct = (productId, userId, token, product) => {
    // console.log(name, email, password);
    console.log(`${API}`)
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}