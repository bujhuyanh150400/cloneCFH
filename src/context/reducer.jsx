export const actionType = {
  SET_USER: "SET_USER",
  SET_ITEMS: "SET_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cart: action.cart,
      };
      case actionType.SET_CART_ITEMS:
        return {
          ...state,
          cartItems: action.cartItems,
        };
    default:
      return state;
  }
};

export default reducer;
