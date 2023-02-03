const userInfo = () => {
    let userInfo = localStorage.getItem('user');
    if(userInfo !== undefined){
        userInfo = JSON.parse(localStorage.getItem('user'));
    }else{
        localStorage.clear();
    }
    return userInfo;
};

const cartItems = () => {
    let cartInfo = localStorage.getItem('cart');
    if(cartInfo !== undefined){
        cartInfo = JSON.parse(localStorage.getItem('cart'));
    }else{
        localStorage.clear();
    }
    return cartInfo ? cartInfo : [];
};

export const initialState = {
    cartItems: cartItems(),
    user: userInfo(),
    items: null,
    cart:false,
}