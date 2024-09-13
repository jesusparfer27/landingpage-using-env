// router.js o routes.js
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { InboxPage } from "../pages/InboxPage";
import { ErrorPage } from "../pages/ErrorPage";
import { LandingPage } from "../pages/LandingPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'inbox/*', // Cambia '/inbox' a 'inbox/*' para permitir subrutas
                element: <InboxPage />
            },
            {
                path: '*',
                element: <ErrorPage />
            }
        ]
    }
]);

export default router;
