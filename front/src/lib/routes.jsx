import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { InboxPage } from "../pages/InboxPage";
import { ErrorPage } from "../pages/ErrorPage";
import { LandingPage } from "../pages/LandingPage";

const router = createBrowserRouter([{
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            index: true,
            path: '/',
            element: <LandingPage/>
        },
        {
            path: '/inbox',
            element: <InboxPage/>
        },
        {
            path: '*',
            element: <ErrorPage/>
        }
    ]   
}])

export default router