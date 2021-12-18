import { lazy } from "react-router-guard";


export default [
    {
        path: "/dashboard",
        component: lazy(()=> import("../components/Layouts/dashboard")),
        routes: [
            {
                path: '/dashboard',
                redirect: '/dashboard/product',
            },
            {
                path: '/dashboard/product',
                component: lazy(() => import("../components/Dashboard/Dashboard"))
            },
            {
                path: '/dashboard/trainer',
                component: lazy(() => import("../components/Dashboard/Trainer"))
            },
            {
                path: '/dashboard/certificate',
                component: lazy(() => import("../components/Dashboard/Certificate"))
            },
            {
                path: '/dashboard/message/:id',
                component: lazy(() => import("../components/Dashboard/Message"))
            }
        ]
    },
    {
        path: "/",
        component: lazy(()=> import("../components/Layouts/Landing")),
        routes: [
            {
                path: '/',
                redirect: '/landing',
                // component: lazy(() => import("../components/Home/Home"))
            },
            {
                path: '/landing',
                component: lazy(() => import("../components/Home/Home"))
            },
            {
                path: '/contact',
                component: lazy(() => import("../components/ContantUs/ContantUs"))
            },
            {
                path: '/product',
                component: lazy(() => import("../components/ProductShow/AllProduct"))
            },
            {
                path: '/order/:id',
                component: lazy(() => import("../components/Order/Order"))
            },
            {
                path: '/trainer',
                component: lazy(() => import("../components/Certificate/TrainerForm"))
            },
            {
                path: '/admin',
                component: lazy(() => import("../components/Login/Login"))
            },
            {
                path: '/gallery',
                component: lazy(() => import("../components/Gallery/Gallery"))
            },
            {
                path: '/about',
                component: lazy(() => import("../components/About/About"))
            }
        ]
    }
]