import Vue from "vue";
import VueRouter from 'vue-router';

import routes from "./routes";

import {nextFactory} from "@/plugins/helpers";

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach((to, from, next) => {
    const meta = to.matched.reduce((meta, record) => ({... meta, ... record.meta}), {})

    if (meta.middleware) {
        const middleware = Array.isArray(meta.middleware) ? meta.middleware : [meta.middleware];
        const context = {from, next, to, router};
        const nextMiddleware = nextFactory(context, middleware, 1);
        return middleware[0]({...context, next: nextMiddleware});
    }
    return next();
});
