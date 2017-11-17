<template>
   <div>
       <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6"
				v-for="(item,index) in shopbuy" :key="index">
		           <router-link :to="'/shop/shopinfo/'+item.id">
					    <a href="#">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body">
							{{item.title}}
						</div>
					</a>
							<div class="price">
								<p>
									<span class="new">￥{{item.sell_price}}</span>
									<s>￥{{item.market_price}}</s>
								</p>
                                <p>
									<span>热卖中</span>
									<span>剩余{{item.stock_quantity}}件</span>
								</p>
							</div>		
				   </router-link>
				</li>
		    </ul> 
				<mt-button class="more" type="danger" size="large" @click="getmore">加载更多...</mt-button>   
   </div>
</template>

<script>
import common from "./../common.js";
export default {
  data() {
    return {
			shopbuy: [],
			 pageValue:1
    };
  },
  methods: {
		getmore:function(){
			this.pageValue++;
			this.getShop(this.pageValue);
		},
    getShop: function(pageId) {
      var page = pageId || 1;
      var url = common.testifo + "/api/getgoods?pageindex=" + page;
      this.$http.get(url).then(function(res) {
        if(page==1) {
					 this.shopbuy = res.body.message;
				}
				else {
						this.shopbuy=this.shopbuy.concat(res.body.message);
				}
				
      });
    }
  },
  created() {
	  this.getShop()
  }
};
</script>

<style scoped>
.mui-table-view:before {
	background-color: #fff;
}
.mui-table-view-cell  {
	border:1px solid #ccc;
	margin-left: 0;
	
}
.mui-table-view.mui-grid-view {
	padding: 0;
}

.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn){
    padding: 0;
    margin-left: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    margin-top: 0;
    margin-bottom: 3px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell {
	margin: 0;
	padding:5px;
}
.price {
	width: 100%;
	height: 50px;
	background-color: #eee;
}
.price p {

    text-align: left;
    padding: 2px 3px;
}
.price .new {
	color:#f00;
	font-weight: 700;
	margin-right:15px;
}

.left {
	text-align: left;
}
.right {
	text-align: right;
}
.more {
	 background-color: #26a2ff;
}

</style>
