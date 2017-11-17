<template>
 <div>
    <div class="all">
     <ul :style="{width:fixWidth+'px'}">
         <li @click="getClick(0)">全部</li>
         <li v-for="(item,index) in menulist" :key="index" @click="getClick(item.id)">
             {{item.title}}
         </li>
      </ul>
    </div>
    <div class="imgbox">
      <ul>
        <li v-for="(item,index) in imglist" :key="index">
           <router-link :to="'/picture/pictureinfo/'+item.id">
              <img v-lazy="item.img_url">
            <div class="desc">
                <h4>{{item.title}}</h4>
                <p v-text="item.zhaiyao"></p>
            </div>
           </router-link>
        </li>
    </ul>
    </div>
 </div>
  
</template>

<script>
import common from "./../common";
export default {
  data() {
    return {
      menulist: [],
      imglist: [],
      fixWidth: 320
    };
  },
  methods: {
    getmenu: function() {
      var url = common.testifo + "/api/getimgcategory";
      this.$http.get(url).then(function(res) {
        if (res.body.status !== 0) {
          return;
        }
        this.menulist = res.body.message;
        this.fixWidth = (res.body.message.length + 1) * 80;
      });
    },
    getClick: function(id) {
      var url = common.testifo + "/api/getimages/" +id;
      this.$http.get(url).then(function(res) {
        this.imglist = res.body.message;
      });
    }
  },
  created() {
    this.getmenu();
    this.getClick(0);
  }
};
</script>

<style scoped>
image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
    }
.all {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 320px;
  max-width: 320px;
  overflow-x: auto;
}
.all ul {
  padding-left: 10px;
}
.all li {
  float: left;
  cursor: pointer;
  margin-right: 20px;
  display: inline-block;
  font-size: 14px;
}
.imgbox ul{
   list-style: none;
   padding: 0;
   margin: 5px 0;
}
.imgbox ul li {
    margin-top: 10px;
     position: relative;
   
}
.imgbox ul li img {
    width: 100%;
    height: 300px;
    
}
.imgbox .desc {
    width: 100%;
    height: 70px;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    bottom: 6px;
    color: #fff;
}
.imgbox .desc p {
    color: #fff;
    line-height: 1em;
    font-size: 14px;
    margin-top:10px;
}
</style>


