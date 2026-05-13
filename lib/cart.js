import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ADD */
  const addToCart = (product) => {

    setCart((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );

      /* already exists */
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      /* new item */
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setOpenCart(true);
  };

  /* INCREASE */
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /* DECREASE */
  const decreaseQuantity = (id) => {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* REMOVE */
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        openCart,
        setOpenCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}