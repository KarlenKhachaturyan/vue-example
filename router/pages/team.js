import TeamComponent from "@/pages/Team/TeamComponent.vue";
import CreateForm from "@/pages/Team/Member/CreateForm.vue";
import EditForm from "@/pages/Team/Member/EditForm.vue";
import EmptyRouter from "@/components/EmptyRouter.vue";

export default [
    {
        path: "/team",
        component: EmptyRouter,
        children: [
            {
                path: "",
                name: "Team",
                component: TeamComponent,
            },
            {
                path: "create",
                name: "TeamCreate",
                component: CreateForm,
            },
            {
                path: ":id/edit",
                name: "TeamEdit",
                component: EditForm,
            }
        ]
    }
]
