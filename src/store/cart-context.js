import React from 'react';

// Pay no mind to these values, the name of the properties helpt with intellisense, that's all.
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default CartContext;