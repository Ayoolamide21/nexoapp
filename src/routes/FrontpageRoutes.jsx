import Title from "../components/Title";
import Home from "../pages/Home";
import About from "../pages/About";
import Plans from "../pages/Plans";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Personal from "../pages/Personal";
import NotFound from "../pages/NotFound";
import HelpCenter from "../pages/Contact";
import { Careers } from "../pages/Career";
import { PrivacyPolicy } from "../pages/Legal/PrivacyPolicy";
import { TermsOfService } from "../pages/Legal/TermsOfService";
import { CookiesPolicy } from "../pages/Legal/CookiesPolicy";
import { AMLKYC } from "../pages/Legal/AmlKyc";
import HelpArticle from "../pages/HelpArticle";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

const FrontpageRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: (
      <>
        <Title page="Home" />
        <Home />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Title page="About" />
        <About />
      </>
    ),
  },
  {
    path: "/personal",
    element: (
      <>
        <Title page="Personal" />
        <Personal />
      </>
    ),
  },
  {
    path: "/plans",
    element: (
      <>
        <Title page="Plans" />
        <Plans />
      </>
    ),
  },
  {
    path: "/help-center",
    element: (
      <>
        <Title page="Help Center" />
        <HelpCenter />
      </>
    ),
  },
  {
    path: "/help/:slug",
    element: (
      <>
        <Title page="Help Center" />
        <HelpArticle />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Title page="Register" />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Title page="Login" />
        <Login />
      </>
    ),
  },
   {
    path: "/forgot-password",
    element: (
      <>
        <Title page="Forgot Password" />
        <ForgotPassword/>
      </>
    ),
  },
  {
  path: "/reset-password",
  element: (
    <>
      <Title page="Reset Password" />
      <ResetPassword />
    </>
  ),
},
  {
    path: "/careers",
    element: (
      <>
        <Title page="Career " />
       <Careers/>
      </>
    ),
  },
  {
    path: "/privacy",
    element: (
      <>
        <Title page="Privacy Policy " />
       <PrivacyPolicy/>
      </>
    ),
  },
  {
    path: "/terms-of-use",
    element: (
      <>
        <Title page="Terms of Use " />
       <TermsOfService/>
      </>
    ),
  },
  {
    path: "/cookies",
    element: (
      <>
        <Title page="Cookies " />
       <CookiesPolicy/>
      </>
    ),
  },
  {
    path: "/kyc",
    element: (
      <>
        <Title page="AML & KYC" />
       <AMLKYC/>
      </>
    ),
  },
  
];

export default FrontpageRoutes;
