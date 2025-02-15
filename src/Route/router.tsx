import { createBrowserRouter } from "react-router-dom";
import { routePath } from "../utils/routePath";
import {Home, Products, Cart, About, Checkout, Policy, Login, Register, Contact, Shop, Success, New} from "./routeImport";
import Loader from "../features/Loader";

export const router = createBrowserRouter([
    {
        Component: Home,
        path: routePath.HOME,
        hydrateFallbackElement: <Loader />,
        HydrateFallback: Loader,
    },
    {
        Component: Products,
        path: routePath.PRODUCTS,
  
    },
    {
        Component: Products,
        path: routePath.PRODUCTS,
  
    },
    {
        Component: New,
        path: routePath.New,
 
    },
    {
        Component: Cart,
        path: routePath.CART,
        hydrateFallbackElement: <Loader />,
        HydrateFallback: Loader,
    },
    {
        Component: About,
        path: routePath.ABOUT,
 
    },
    {
        Component: Contact,
        path: routePath.CONTACT,
 
    },
    {
        Component: Login,
        path: routePath.LOGIN,
 
    },
    {
        Component: Register,
        path: routePath.REGISTER,
 
    },
    {
        Component: Policy,
        path: routePath.POLICY,
 
    },
    {
        Component: Shop,
        path: routePath.SHOP,
 
    },
    {
        Component: Checkout,
        path: routePath.CHECKOUT,
    },
    {
        Component: Success,
        path: routePath.SUCCESS,
    },
]);