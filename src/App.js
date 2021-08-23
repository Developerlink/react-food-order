import React, {useState} from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

const App = () => {
  const [showCart, setShowCart] = useState(false);
  
  const showCartHandler = props => {
    setShowCart(true);
  }

  const closeCartHandler = props => {
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart onClose={closeCartHandler} />}
      <Header onClickCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
