import SocialsComponent from "@/pages/Socials/SocialsComponent.vue";
import CreateSocialForm from "@/pages/Socials/Social/CreateSocialForm.vue";
import EditSocialForm from "@/pages/Socials/Social/EditSocialForm.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "social-links",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "Socials",
                component: SocialsComponent,
            },
            {
                path: "create",
                name: "SocialsCreate",
                component: CreateSocialForm,
            },
            {
                path: ":id/edit",
                name: "SocialsEdit",
                component: EditSocialForm,
            }
        ]
    },
]
