<template>
    <div>
        <!-- 实现图片轮播 -->
        <swipe :pic="swipeList"></swipe>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/new/newList">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/picture/img">
                    <span class="mui-icon mui-icon-email"></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="shop/shopbuy">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/message">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/view">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/contact">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
 import { Toast } from 'mint-ui';
  import common from "./common";
  import swipe from "./subcom/swipe.vue"
export default {
    components:{
        swipe
    },
  data() {
    return {
      swipeList: []
    }
  },
  methods:{
      getList:function(){
          var url = common.testifo+'/api/getlunbo';
          this.$http.get(url)
          .then(function(res){
              if(res.body.status!==0){
                 Toast(res.body.message);
                 return;
              }
              this.swipeList=res.body.message;
          })
      }
  },
  created:function(){
    this.getList();
  }
};
</script>
<style scoped>
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
     border-top: 0;
    border-left: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0;
    border-bottom: 0;
}
.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before{
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background-repeat: round;

}
.mui-icon-home:before {
    background-image: url("../../statics/imgs/1.png"); 
}
.mui-icon-email:before {
    background-image: url("../../statics/imgs/2.png"); 
}
.mui-icon-chatbubble:before {
    background-image: url("../../statics/imgs/3.png"); 
}
.mui-icon-location:before {
    background-image: url("../../statics/imgs/4.png"); 
}
.mui-icon-search:before {
    background-image: url("../../statics/imgs/5.png"); 
}
.mui-icon-phone:before {
    background-image: url("../../statics/imgs/6.png");  
}
</style>


