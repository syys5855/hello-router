import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from './component/foo';
import User from './component/user/index.vue';
import App from './component/app';
import MutiViews from './component/muti-views';

Vue.use(VueRouter);


let Bar = Vue.component('bar', {
    template: `<h3 class='text-danger'>bar</h3>`
});

let Load = Vue.component('load', {
    template: `<h3 class='text-danger'>{{msg}}</h3>`,
    data() {
        return { msg: '' };
    },
    created() {
        setTimeout(() => this.msg = '123', 1000);
    }
});

// 懒加载
// require.ensure 支持分组  require.ensure 中的模块不会被执行，需要调用require 来执行
const lazy1 = (res, rej) => require.ensure([], (require) => res(require('./component/lazyload/com.vue')), 'lazy');
const lazy2 = (res, rej) => require.ensure([], (require) => res(require('./component/lazyload/com.lazy1.vue')), 'lazy');

// require  等待所有的模板执行完毕才会执行回调，params->[esModule,esModule,...]
// const lazy2 = (res, rej) => require(['./component/lazyload/com2.vue', './component/lazyload/com1.vue'], (...params) => {
//     console.log(params);
//     res.apply(null, params);
// });

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/lazy1', component: lazy1 },
    { path: '/lazy2', component: lazy2 },
    {
        path: '/muti',
        component: MutiViews,
        children: [{
                path: "",
                components: {
                    "default": Foo,
                    "title": Bar,
                    "footer": User
                }
            },
            {
                path: "a",
                components: {
                    "default": Foo,
                    "title": lazy1,
                    "footer": lazy2
                }
            }
        ]
    },
    { path: '/user/:id', name: 'user', component: User },
    {
        path: '/app',
        component: App,
        children: [
            // foo表示的是先对路径，即/app/foo  ; /foo绝对路径 ，即/foo
            {
                path: 'foo',
                component: Foo,
                beforeEnter: (to, from, next) => {
                    console.log('路由钩子 beforeEnter');
                    setTimeout(() => next(), 1000);
                    // next();
                }
            },
            { path: 'bar', component: Bar },
            { path: 'load', component: Load }
        ]
    }
];

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
    },
    linkActiveClass: 'disabled'
});

const app = new Vue({
    router,
    el: "#app",
    methods: {
        clickToUser() {
            this.$router.push({ name: 'user', params: { id: 123 } });
        },
        addRoutes() {
            // 动态添加routes
            this.$router.addRoutes([{ path: '/add1', component: Foo }]);
        }
    }
});