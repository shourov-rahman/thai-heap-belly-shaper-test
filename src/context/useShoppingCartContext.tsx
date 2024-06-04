import { useContext } from "react";
import { ShoppingCartContext } from "./shoppingCartContext";

export const useShoppingCartContext = () => useContext(ShoppingCartContext);
