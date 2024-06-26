import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouerInt } from "./types";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SiginIn";
import SignUp from "./pages/SiginUp";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatListing from "./pages/CreatListing";
import ViewListings from "./pages/ViewListings";
import UpdateListing from "./pages/UpdateListing";

const routes: RouerInt[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "",
    element: <PrivateRoute />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/viewlisting",
        element: <ViewListings />,
      },
    ],
  },
  {
    path: "",
    element: <AdminPrivateRoute />,
    children: [
      {
        path: "/creatlisting",
        element: <CreatListing />,
      },
      {
        path: "/viewlisting",
        element: <ViewListings />,
      },
      {
        path: "/updatelisting/:id",
        element: <UpdateListing />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
