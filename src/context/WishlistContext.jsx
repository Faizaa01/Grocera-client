import { createContext } from "react";
import useWishlist from "../hooks/useWishlist";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const allValue = useWishlist();
  return (
    <WishlistContext.Provider value={allValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
