import PrivateRoute from "../PrivateRoute";
import Title from "../components/Title";
import Dashboard from "../user/pages/Dashboard";
import UserProfile from "../user/pages/UserProfile";
import RewardHub from "../user/pages/RewardHub";
import AccountManagement from "../user/pages/AccountManagement";
import Activity from "../user/pages/Activity";
import PlansPage from "../user/pages/UserPlans";
import Explore from "../user/pages/Explore";
import MyGoalsPage from "../user/pages/Goals";

const UserRoutes = [
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <>
          <Title page="Dashboard" />
          <Dashboard />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <>
          <Title page="Profile" />
          <UserProfile />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/rewards",
    element: (
      <PrivateRoute>
        <>
          <Title page="Rewards" />
          <RewardHub />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/account-management",
    element: (
      <PrivateRoute>
        <>
          <Title page="Account Management" />
          <AccountManagement />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/activity",
    element: (
      <PrivateRoute>
        <>
          <Title page="Activity" />
          <Activity />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/my-portfolio",
    element: (
      <PrivateRoute>
        <>
          <Title page="Portfolio" />
          <PlansPage />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/explore",
    element: (
      <PrivateRoute>
        <>
          <Title page="Explore" />
          <Explore />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/my-goals",
    element: (
      <PrivateRoute>
        <>
          <Title page="Goals" />
          <MyGoalsPage />
        </>
      </PrivateRoute>
    ),
  },
];

export default UserRoutes;
