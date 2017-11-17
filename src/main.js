// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
import mintui from 'mint-ui';
import vueResource from 'vue-resource';
import VuePreview from 'vue-preview';
import moment from 'moment';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);
Vue.use(mintui);
Vue.use(vueResource);
Vue.use(VuePreview);
 Vue.use(moment);

// 3.0.2 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newList from './components/new/newList.vue';
import newinfo from './components/new/newinfo.vue';
import picture from './components/picture/picture.vue';
import pictureinfo from './components/picture/pictureinfo.vue';
import shop from './components/shop/shopbuy.vue';
import shopinfo from './components/shop/shopinfo.vue';
import shopdesc from './components/shop/shopdesc.vue';
import shopcomm from './components/shop/shopcomm.vue';
// 3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{path:'/',redirect:'/home'}, 
		{path:'/home',component:home}, 
		{path:'/shopcar',component:shopcar},
		{path:'/new/newList',component:newList},
		{path:'/new/newinfo/:id',component:newinfo},
		{path:'/picture/img',component:picture},
		{path:'/picture/pictureinfo/:id',component:pictureinfo},
		{path:'/shop/shopbuy/',component:shop},
		{path:'/shop/shopinfo/:id',component:shopinfo},
		{path:'/shop/shopdesc/:id',component:shopdesc},
		{path:'/shop/shopcomm/:id',component:shopcomm}
	]
	});


// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
// 在Vue中全局使用mintui
import '../statics/mui/css/mui.css'
import '../statics/css/site.css';
Vue.filter('datamft',function(input,mftstring) {
	return moment(input).format(mftstring);
})
// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});
