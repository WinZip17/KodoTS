import React from 'react';
import CartScreenComponent from '../Components/CartScreen';
import ItemOptions from '../Components/SharedComponents/ItemOptions';

const CartScreen: React.FC = (): JSX.Element => {
  return (
    <>
      <ItemOptions />
      <CartScreenComponent />
    </>
  );
};

export default CartScreen;
