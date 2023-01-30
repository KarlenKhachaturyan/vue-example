import HomeSlideComponent from "../../pages/HomeSlide/HomeSlideComponent.vue";
import HomeSlideTableComponent from "../../pages/HomeSlide/HomeSlideTableComponent.vue";
import EditHomeSlideComponent from "../../pages/HomeSlide/EditHomeSlideComponent.vue";
import AboutBlockComponent from "../../pages/AboutBlock/AboutBlockComponent.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "home",
        component: EmptyRouter,
        children: [
            {
                path: "slide",
                component: EmptyRouter,
                children: [
                    {
                        path: "",
                        name: "HomeSlideTable",
                        component: HomeSlideTableComponent
                    },
                    {
                        path: "create",
                        name: "HomeSlide",
                        component: HomeSlideComponent
                    },
                    {
                        path: ":id/edit",
                        name: "EditHomeSlideComponent",
                        component: EditHomeSlideComponent,
                        props:true
                    },
                ]
            },
            {
                path: "about",
                name: "AboutBlock",
                component: AboutBlockComponent
            }
        ]
    },
]
