import OurAdvantagesTableComponent from "@/pages/OurAdvantages/OurAdvantagesTableComponent.vue";
import OurAdvantagesComponent from "@/pages/OurAdvantages/OurAdvantagesComponent.vue";
import EditOurAdvantagesComponent from "@/pages/OurAdvantages/EditOurAdvantagesComponent.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "our-advantages",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "OurAdvantagesTable",
                component: OurAdvantagesTableComponent
            },
            {
                path: "create",
                name: "OurAdvantages",
                component: OurAdvantagesComponent,
            },
            {
                path: ":id/edit",
                name: "EditOurAdvantages",
                component: EditOurAdvantagesComponent,
                props:true
            },
        ]
    },
]
