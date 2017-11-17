<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 利用mint-ui的header实现头部  -->
		<mt-header fixed title="天猫购物商城"></mt-header>
		<div class="back" v-if="isshow"><a href="javascript:void(0)" @click="backto">返回</a></div>
		<!-- 利用route-view占位 -->
		<router-view  id="tmpl"></router-view>
		<!-- 利用mint-ui的tabbar实现底部 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email">
				
				</span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge" id="numvalue">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>	
	</div>
</template>

<script>
import { vum, contront } from "./components/subcom/vm.js";
export default {
  // es6的导出对象的写法
  data() {
    //等价于 es5的 data:function(){
    return {
      isshow: false
    };
  },
  watch: {
    $route: function(newroute, oldroute) {
      if (newroute.path.toLowerCase() == "/home") {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
    }
  },
  methods: {
    backto: function() {
      this.$router.go(-1);
    }
  },
  created() {
    vum.$on(contront, function(input) {
      var id = document.getElementById("numvalue");
      id.innerHTML = id.innerHTML - 0 + input;
    });
  }
};
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
.back {
  position: absolute;
  top: 10px;
  left: 16px;
  width: 60px;
  z-index: 999;
}
.back a {
  color: #fff;
  font-size: 16px;
  display: block;
}
</style>