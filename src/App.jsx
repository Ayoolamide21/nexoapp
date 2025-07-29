import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Title from "./components/Title";

const router = createBrowserRouter([

  { path: "/", element: (
  <>
  <Title page="home" /> <Home />
  </>
    ),
  },
  { path: "/about", element: (
  <>
  <Title page="about" /> <About />
  </>
  ),
  },
  { path: "/signup", element:(
  <>
  <Title page="register" /> <Register />
  </>
  ),
  },
  { path: "/login", element: (
  <>
  <Title page="login" /> <Login />
  </>
  ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
