<template>
  <div>
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" 
                v-for="(item,index) in newlist" :key="index">
				<router-link :to="'/new/newinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis' v-html="item.zhaiyao"></p>
                            <div class="news">
                            <span class="newTime">{{item.add_time | datamft('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span class="newClick">点击量:{{item.click}}</span>
                        </div>
						</div>
                        
				</router-link>
			</li>
			</ul>
  </div>
</template>

<script>
import common from "./../common"
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            newlist:[]
        }
    },
    methods:{
      getnewList:function(){
          var url=common.testifo+"/api/getnewslist";
          this.$http.get(url)
          .then(function(res){
              console.log(res)
              if(res.body.status!==0) {
                Toast(res.body.message);
                return;
              }
            this.newlist=res.body.message;
          })
      }
    },
    created:function(){
        this.getnewList()
    }

  
}
</script>

 <style scoped>
 .mui-table-view-cell img {
     width: 80px;
     height: 80px;
 }
 .mui-table-view .mui-media-object {
    max-width: 80px; 
 }
 .news {
     font-size: 14px;
     margin-top: 20px;
     color: #f00;
 }
 .news .newClick{
    float: right;
 }
 .news .newTime {
   margin-right: 20px;
 }

 </style>
 
