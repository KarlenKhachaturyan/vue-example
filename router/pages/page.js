import PageComponent from "@/pages/Page/PageComponent.vue";
import EditPageComponent from "@/pages/Page/EditPageComponent.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "page",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "Page",
                component: PageComponent,
            },
            {
                path: ":id/edit",
                name: "PageEdit",
                component: EditPageComponent,
            }
        ]
    }
]
