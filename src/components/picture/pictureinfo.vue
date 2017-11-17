<template>
    <div>
        <div class="picture-t">
            <h4>{{imageinfo.title}}</h4>
            <p class="smallInfo">
                <span>{{imageinfo.add_time |datamft("YYYY-MM-DD HH:mm:ss")}}</span>
                <span> 浏览量：{{imageinfo.click}}次</span>
            </p>
            <p class="line"></p>
        </div>
        <div class="picture-b">
             <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" 
            v-for="(item,index) in imgsum" :key="index"> 
                 <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index,imgsum)">
            </li>
        </ul>
        <p v-html="imageinfo.content"></p>
        </div>
        <div class="componentBox">
            <subcom :id="id"></subcom>
        </div>
    </div>
</template>

<script>
import common from "./../common";
import subcom from "../subcom/subcom.vue";
export default {
  components: {
    subcom: subcom
  },
  data() {
    return {
      id: this.$route.params.id,
      imageinfo: [],
      imgsum: []
    };
  },
  methods: {
    getimageInfo: function() {
      var url = common.testifo + "/api/getimageInfo/" + this.id;
      this.$http.get(url).then(function(res) {
        this.imageinfo = res.body.message[0];
      });
    },
    getimgsum: function() {
      var url = common.testifo + "/api/getthumimages/" + this.id;
      this.$http.get(url)
      .then(function(res){
        console.log(res);
        res.body.message.forEach(function(info) {
          var img=new Image();
          img.src=info.src;
          img.onload=function(){
              info.w=img.width;
              info.h=img.height;
          }   
        });  
        this.imgsum = res.body.message;  
      });
        
    }
  },
  created() {
    this.getimageInfo();
    this.getimgsum();
  }
};
</script>

<style scoped>
h4 {
  color: #26a2ff;
  padding: 10px;
  line-height: 1.5em;
}
.line {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}
.smallInfo span {
  margin-right: 20px;
  color: #ccc;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border-top: 0;
  border-left: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right: 0;
  border-bottom: 0;
}
</style>
