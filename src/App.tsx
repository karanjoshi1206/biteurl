import { createRouter, RouterProvider } from "@tanstack/react-router";
import UserProvider, { UserContext } from "./context/userContext";
import { routeTree } from "./routeTree.gen";
import { useContext } from "react";
import Spinner from "./components/Spinner";
import "./App.css";
const App = () => {
  const router = createRouter({
    routeTree,
    context: { auth: false! }
  });
  const { loading } = useContext(UserContext);
  function InnerApp() {
    console.log("USER LOGGED IN ", localStorage.getItem("user"))
    return <RouterProvider router={router} context={{ auth: localStorage.getItem("user") ? true : false }} />;
  }

  return (
    <UserProvider>
      {loading && <Spinner />}
      <InnerApp />
    </UserProvider>
  );
};

export default App;
