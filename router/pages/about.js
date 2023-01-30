import AboutComponent from "@/pages/About/AboutComponent.vue";
import AboutTableComponent from "@/pages/About/AboutTableComponent.vue";
import EditAboutComponent from "@/pages/About/EditAboutComponent.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "about",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "AboutTable",
                component: AboutTableComponent,
            },
            {
                path: "create",
                name: "About",
                component: AboutComponent,
            },
            {
                path: ":id/edit",
                name: "EditComponent",
                component: EditAboutComponent,
                props: true
            },
        ]
    },
]
