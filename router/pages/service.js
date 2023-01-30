import ServicesComponent from '@/pages/Services/ServicesComponent.vue'
import ServiceTableComponent from "@/pages/Services/ServiceTableComponent.vue";
import EditServicesComponent from "@/pages/Services/EditServicesComponent.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "services",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "ServicesTable",
                component: ServiceTableComponent,
            },
            {
                path: "create",
                name: "Services",
                component: ServicesComponent,
            },
            {
                path: ":id/edit/",
                name: "EditService",
                component: EditServicesComponent,
                props:true
            },
        ]
    },
]
