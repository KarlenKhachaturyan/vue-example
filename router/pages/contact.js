import ContactUsComponent from "@/pages/ContactUs/ContactUsComponent.vue";
import ContactUsQuestions from "@/pages/ContactUs/ContactUsQuestions.vue";

export default [
    {
        path: "contact-us",
        name: "ContactUs",
        component: ContactUsComponent,
    },
    {
        path: "contact-us-questions",
        name: "Questions",
        component: ContactUsQuestions,
    }
]
