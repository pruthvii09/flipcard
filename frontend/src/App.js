import "./App.css";
import Navbar from "./components/Navbar";
import FlashCard from "./pages/FlashCard";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllQuestions from "./pages/AllQuestions";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";
import ShareCard from "./pages/ShareCard";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <FlashCard />,
      },
      {
        path: "/share/:id",
        element: <ShareCard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <AllQuestions />,
      },
      {
        path: "/dashboard/add-question",
        element: <AddQuestion />,
      },
      {
        path: "/dashboard/edit-question/:id",
        element: <EditQuestion />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <div className="w-[200px] h-[200px] absolute top-[30%] left-[20%] translate-x-[-50%] translate-y-[-50%] bg-[#D41F30] rounded-full opacity-40 blur-[120px] pointer-events-none"></div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
