import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouerInt } from "./types";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SiginIn from "./pages/SiginIn";
import SiginUp from "./pages/SiginUp";
import Header from "./components/Header";

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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/siginin",
    element: <SiginIn />,
  },
  {
    path: "/siginup",
    element: <SiginUp />,
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
