import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Result from '../views/Result.vue'
import Detail from '../views/Detail.vue'
import Favorite from '../views/Favorite.vue'
import LegalMentions from '../views/LegalMentions.vue'
import MoreResults from '../views/MoreResults.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup
	},
	{
		path: '/result',
		name: 'Result',
		component: Result
	},
	{
		path: '/detail/:type/:id',
		name: 'Detail',
		component: Detail
	},
	{
		path: '/favorites',
		name: 'Favorite',
		component: Favorite,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/legal-mentions',
		name: 'LegalMentions',
		component: LegalMentions
	},
	{
		path: '/more-results',
		name: 'MoreResults',
		component: MoreResults
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// to : where the user wishes to go
// from : where the user is coming from
// next : callback function that continues the processing of the user request
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
