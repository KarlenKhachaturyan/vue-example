import EmptyRouter from "@/components/EmptyRouter.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import GuestLayout from "@/layouts/auth/GuestLayout.vue";

import about from "@/router/pages/about";
import account from "@/router/pages/auth";
import contact from "@/router/pages/contact";
import dashboard from "@/router/pages/dashboard";
import home from "@/router/pages/home";
import page from "@/router/pages/page";
import service from "@/router/pages/service";
import socials from "@/router/pages/socials";
import team from "@/router/pages/team";
import advantage from "@/router/pages/advantage";
import partner from "@/router/pages/partner";

import guest from "@/middlewares/guest";
import auth from "@/middlewares/auth";

export default [
    {
        path: "/",
        component: EmptyRouter,
        meta: {
            middleware: [auth],
            layout: SidebarLayout
        },
        children: [
            ... dashboard,
            ... home,
            ... about,
            ... contact,
            ... service,
            ... socials,
            ... team,
            ... partner,
            ... advantage,
            ... page,
        ]
    },
    {
        path: "/",
        component: EmptyRouter,
        meta: {
            middleware: [guest],
            layout: GuestLayout
        },
        children: account
    },
]
