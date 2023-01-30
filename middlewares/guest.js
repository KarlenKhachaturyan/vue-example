import {store} from '@/store';

export default function guest({ from, next, router }) {
    if (store.getters["auth/token"]) {
        return from.name
            ? router.push({name: from.name}).catch(_ => _)
            : router.push({name: 'Home'}).catch((err) => {console.error('Guest middleware error ' + err)});
    }
    return next();
}
