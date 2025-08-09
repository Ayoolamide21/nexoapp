import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Plans from './pages/Plans';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Title from "./components/Title";
import Support from "./pages/Contact";
import Personal from "./pages/Personal";

const router = createBrowserRouter([

  { path: "/", element: (
  <> <Title page="home" /> <Home /> </>
 ),
},
  { path: "/about", element: (
  <>
  <Title page="about" /> <About />
  </>
  ),
  },
  { path: "/personal", element: (
    <>
    <Title page="personal" /> <Personal />
    </>
  ),
  },
  {path: "/plans", element: (
  <>
  <Title page="plans" /> <Plans />
  </>
  ),
},
  {path:"/support", element: (
  <>
  <Title page="contact" /> <Support />
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
