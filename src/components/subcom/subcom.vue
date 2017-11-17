<template>
  <div>
    <h3>提交评论</h3>
    <p></p>
    <textarea cols="30" rows="10" placeholder="请输入评论内容" v-model="content"></textarea>
    <mt-button class="btn" type="danger" size="large" @click="getcommont">发表评论</mt-button>
    <h3> 评论列表</h3>
    <p></p>
     <div v-for="(item,index) in commlist" :key="index">
        <div class="comm-t">
            <span>第{{index+1}}楼</span>
            <span>{{item.user_name}}</span>
            <span>{{item.add_time | datamft("YYYY-MM-DD HH:mm:ss")}}</span>
         </div>
         <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <span>
                       {{item.content.length==0?'此用户无评论信息':item.content}} 
                    </span>
                </li>
            </ul>
     </div>
    <mt-button class="more" type="danger" size="large" @click="getmore">加载更多...</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import common from "./../common";
export default {
  props: ["id"],
  data() {
    return {
      content: "",
      commlist: [],
      pagevalue:1
    };
  },
  methods: {
    //   点击加载更多按钮
    getmore:function(){
        this.pagevalue++;
        this.getcomminfo(this.pagevalue);
      },
    //   提交评论信息
    getcommont: function() {
      var url = common.testifo + "/api/postcomment/" + this.id;
      this.$http
        .post(url, { content: this.content }, { emulateJSON: true })
        .then(function(res) {
          if (res.body.status !== 0) {
            return;
          }
          Toast(res.body.message);
          this.content = "";
        });
    },
    // 获取评论信息
    getcomminfo: function(pageId) {
      var page = pageId || 1;
      var url =common.testifo + "/api/getcomments/" + this.id + "?pageindex=" + page;
      this.$http.get(url)
      .then(function(res){
          if(page==1) {
             this.commlist = res.body.message;
          } else {
              this.commlist=this.commlist.concat(res.body.message);
          }
        
      })
    }
  },
  created() {
    this.getcomminfo();
  }
};
</script> 

<style scoped>
h3 {
  margin-top: 50px;
}
p {
  height: 1px;
  width: 100%;
  background-color: #ccc;
  margin-top: 10px;
}
textarea {
  height: 120px;
  font-size: 14px;
}
.btn,.more {
  background-color: #26a2ff;
}
.mui-table-view-cell {
  padding: 10px 0;
  color: #333;
}
.comm-t {
  background-color: #ccc;
}
</style>
