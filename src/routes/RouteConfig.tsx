
import EditItem from "../pages/EditItem";
import Home from "../pages/Home";
import ItemDetail from "../pages/ItemDetail";
export const ROUTES = {
    HOME: "/",
    ITEM_DETAIL: "/item/:id",
    EDIT_ITEM: "/edit/:id",
  };
  export const routesConfig = [
    { path: ROUTES.HOME, component: Home },
    { path: ROUTES.ITEM_DETAIL, component: ItemDetail },
    { path: ROUTES.EDIT_ITEM, component: EditItem },
  ];