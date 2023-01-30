import {store} from "@/store";

export default function auth({ next }) {
    if (!store.getters["auth/token"]) {
        store.commit('auth/clear');
        return next('/login');
    }
    return next();
}
