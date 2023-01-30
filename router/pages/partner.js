import PartnersTableComponent from "@/pages/Partners/PartnersTableComponent.vue";
import PartnerComponent from "@/pages/Partners/PartnerComponent.vue";
import EditPartnerComponent from "@/pages/Partners/EditPartnerComponent.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "partners",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "PartnersTable",
                component: PartnersTableComponent,
            },
            {
                path: "create",
                name: "Partner",
                component: PartnerComponent
            },
            {
                path: ":id/edit",
                name: "EditPartner",
                component: EditPartnerComponent,
                props:true
            },
        ]
    },
];
