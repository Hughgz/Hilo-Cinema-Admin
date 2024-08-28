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
  MdCategory,
  MdRoom,
  MdRoomService,
  MdRoomPreferences
} from "react-icons/md";
// Admin Imports
import MainDashboard from "views/admin/default";

// Auth Imports
import SignInCentered from "views/auth/signIn";


import Movies from "views/admin/stock/components/movie";
import Theaters from "views/admin/stock/components/theater";
import Stock from "views/admin/stock/components";
import Employees from "views/admin/users/components/employees";
import Users from "views/admin/users";
import Actors from "views/admin/stock/components/actor";
import Customers from "views/admin/users/components/customers";
import Rooms from "views/admin/sales/roomSeat";
import Ticket from "views/admin/sales/ticket";
import Sales from "views/admin/sales";


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
        name: "Rooms",
        layout: "/admin",
        icon: <Icon as={MdRoomPreferences} width='20px' height='20px' color='inherit' />,
        path: "/stock/room",
        component: Rooms,
      },
      {
        name: "Movies",
        layout: "/admin",
        icon: <Icon as={MdMovie} width='20px' height='20px' color='inherit' />,
        path: "/stock/movie",
        component: Movies,
      },
      {
        name: "Theaters",
        layout: "/admin",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        path: "/stock/theater",
        component: Theaters,
      },
      {
        name: "Actors",
        layout: "/admin",
        icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
        path: "/stock/actor",
        component: Actors,
      },
      // {
      //   name: "Producers",
      //   layout: "/admin",
      //   icon: <Icon as={MdPeople} width='20px' height='20px' color='inherit' />,
      //   path: "/stock/producer",
      //   component: Producers,
      // },
      // {
      //   name: "Categories",
      //   layout: "/admin",
      //   icon: <Icon as={MdCategory} width='20px' height='20px' color='inherit' />,
      //   path: "/stock/category",
      //   component: Categories,
      // }
    ]
  },
  {
    name: "Sales Management",
    layout: "/admin",
    icon: <Icon as={MdAccountBalance} width='20px' height='20px' color='inherit' />,
    path: "/sales",
    component: Sales,
    routes: [
      {
        name: "Rooms",
        layout: "/admin",
        icon: <Icon as={MdRoomPreferences} width='20px' height='20px' color='inherit' />,
        path: "/sales/room",
        component: Rooms,
      },
      {
        name: "Schedule",
        layout: "/admin",
        icon: <Icon as={MdMovie} width='20px' height='20px' color='inherit' />,
        path: "/sales/movie",
        component: Movies,
      },
      {
        name: "Ticket",
        layout: "/admin",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        path: "/sales/ticket",
        component: Ticket,
      }
    ]
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
