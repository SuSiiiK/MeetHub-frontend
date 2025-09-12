import {createRouter, createWebHistory} from 'vue-router';
import App from "@/App.vue";
import HomeVue from "@/components/HomeVue.vue";
import Register from "@/components/Register.vue";
import Profile from "@/components/Profile.vue";
import Login from "@/components/Login.vue";
import Conferences from "@/components/Сonferences.vue";
import CreateConference from "@/components/СreatingСonference.vue";
import ConferenceJoin from "@/components/ConferenceJoin.vue";

const routes = [
    {
        path: '/',
        component: HomeVue
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/profile',
        component: Profile
    },
    {
        path: '/conferences',
        component: Conferences
    },
    {
        path: '/create-conference',
        component: CreateConference
    },
    {
        path:'/conference-join',
        component: ConferenceJoin
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;