import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdPunchClock,
  MdPerson,
  MdHome,
  MdLock,
  MdArchive,
  MdAttachMoney,
  MdAccountBalance,
  MdMovie,
  MdPeople,
  MdCategory
} from "react-icons/md";
// Admin Imports
import MainDashboard from "views/admin/default";
import Timekeeping from "views/admin/timekeeping";
import Salary from "views/admin/salary";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Marketplace from "views/admin/marketplace";
import UserManagement from "views/admin/users";

import Movies from "views/admin/stock/components/movie";
import Theaters from "views/admin/stock/components/theater";
import Stock from "views/admin/stock/components";
import Customers from "views/admin/users/components/customers";
import Employees from "views/admin/users/components/employees";
import Users from "views/admin/users";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Users Management",
    layout: "/admin",
    path: "/users",
    icon: (
      <Icon
        as={MdPerson}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Users,
    secondary: true,
    routes: [
      {
        name: "Customer",
        layout: "/admin",
        path: "/users/customer",
        component: Customers,
        icon: <Icon as={MdPeople} width='20px' height='20px' color='inherit' />,
      },
      {
        name: "Employee",
        layout: "/admin",
        path: "/users/employee",
        component: Employees,
        icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
      }
    ]
  },
  {
    name: "Stock Management",
    layout: "/admin",
    icon: <Icon as={MdArchive} width='20px' height='20px' color='inherit' />,
    path: "/stock",
    component: Stock,
    routes: [
      {
        name: "Movie",
        layout: "/admin",
        icon: <Icon as={MdMovie} width='20px' height='20px' color='inherit' />,
        path: "/stock/movie",
        component: Movies,
      },
      {
        name: "Theater",
        layout: "/admin",
        icon: <Icon as={MdMovie} width='20px' height='20px' color='inherit' />,
        path: "/stock/theater",
        component: Theaters,
      }
    ]
  },
  {
    name: "Sales Management",
    layout: "/admin",
    path: "/sale-management",
    icon: <Icon as={MdAccountBalance} width='20px' height='20px' color='inherit' />,
    component: Marketplace,
  },
  {
    name: "Time Management",
    layout: "/admin",
    path: "/timekeeping",
    icon: <Icon as={MdPunchClock} width='20px' height='20px' color='inherit' />,
    component: Timekeeping,
  },
  {
    name: "Salary Management",
    layout: "/admin",
    path: "/salary",
    icon: <Icon as={MdAttachMoney} width='20px' height='20px' color='inherit' />,
    component: Salary,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }
];

export default routes;
