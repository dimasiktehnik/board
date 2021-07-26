import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes: [
		{
			path: '/kanban',
			name: 'kanban',
			component: () => import('@views/Kanban')
		} 
	]
})

router.beforeEach((to, from, next) => {
	if (!to) {
		alert('WHAT THE FUCK')
	} else {
		next()
	}
})

export default router