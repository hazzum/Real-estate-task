import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import ListingDetailsPage from "./pages/listingDetails/ListingDetails";
import ListingsPage from "./pages/listings/Listings";

const Routes = () => {
  const routesForNotAuthenticated: RouteObject[] = [
    {
      path: "/properties/:id",
      element: <ListingDetailsPage />,
    },
    {
      path: "/",
      element: <ListingsPage />,
    },
  ];
  const router = createBrowserRouter([...routesForNotAuthenticated]);
  return <RouterProvider router={router} />;
};

export default Routes;
