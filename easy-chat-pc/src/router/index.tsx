import{  LoaderFunctionArgs, createBrowserRouter, redirect, } from "react-router-dom";
import   { lazy, useContext } from 'react';
const HomePage = lazy(() => import('../pages/home'));
const LoginPage = lazy(() => import('../pages/login'));
const routes = [
    {
        path: "/",
        Component:HomePage,
        needAuth:true
      },
    {
        path:'/login',
        Component:LoginPage,
        needAuth:false
        // async action() {
          //       // We signout in a "resource route" that we can hit from a fetcher.Form
          //       await fakeAuthProvider.signout();
          //       return redirect("/");
          //     },
    },
];

export default routes;

