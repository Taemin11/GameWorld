import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Recommend from './components/Recommend.vue'
import MyPage from './components/MyPage.vue'
import Survey from './components/Survey.vue'


Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/user/login',
            component: Login
        },
        {
            path: '/survey',
            component: Survey
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/mypage',
            component: MyPage
        }
    ]
})  