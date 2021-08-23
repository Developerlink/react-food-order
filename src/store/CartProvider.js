import React, { useReducer } from "react";
import CartContext from "./cart-context";

// This is the default state.
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      // This is where the default state gets changed.
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    console.log(action.id);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(existingCartItemIndex);
    const existingCartItem = state.items[existingCartItemIndex];
    console.log(existingCartItem);
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    console.log("State items before going into the if-statement")
    console.log(state.items);
    if (existingCartItem.amount === 1) {
      console.log("The amount is 1");
      // If only 1 left then remove the item from the array.
      // This code keeps all items that are not the item to be removed.
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      console.log("The amount must be bigger than 1")
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    
    console.log("These are the updateditems after the if and before passing them on")
    console.log(updatedItems);
    console.log("Now going to return the newest state to state.")

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // Default in case the action is none of the above.
  return defaultCartState;
};

const CartProvider = (props) => {
  // This is where the default state is initialized.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
