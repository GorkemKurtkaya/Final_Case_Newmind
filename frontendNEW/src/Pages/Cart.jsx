import React from "react";
import ShopContextProvider from "../Context/ShopContext";
import CartItems from "../Components/CartItems/CartItems";

const App = () => {
  return (
    <ShopContextProvider>
      <CartItems />
    </ShopContextProvider>
  );
};

export default App;
