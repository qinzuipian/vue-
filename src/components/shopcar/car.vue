<template>
    <div>
       <div class="proinfo" v-for="(item,index) in carlist" :key="index">
          <div>
               <mt-switch v-model="value[index]"></mt-switch>
          </div>
           <div class="img">
               <img :src="item.thumb_path" alt="">
           </div>
           <div class="bot">
               <h4>{{item.title}}</h4>
               <div class="delete">
                 <ul>
                   <li>￥{{item.sell_price}}</li>
                   <li><number @data="getData"
                               :countinit="item.cou"
                               :goodsid="item.id"
                               ></number></li>
                   <li><a href="javascript:void(0)" @click="delerow(item.id,index)">删除</a></li>
                 </ul>           
                </div>           
           </div>
       </div> 
       <div class="shade">
          <b>总计（不含运费）</b>   
          <p>已经勾选商品{{totalcount}}件，总价￥{{total}}元</p>
          <mt-button class="btn" type="danger">去结算</mt-button>
       </div> 
       {{value}} 
    </div>
</template>
<script>
import number from "./../subcom/otherCar.vue";
import location from "../subcom/location.js";
import common from "./../common";
export default {
  components: {
    number
  },
  computed: {
    totalcount() {
      var total = this.value.filter(function(item) {
        return item;
      });
      var first = 0;
      this.value.forEach((item, index) => {
        if (item) {
          var amount = this.carlist[index].cou;
          var price = this.carlist[index].sell_price;
          var amountpri = amount * price;
          first += amountpri;
        }
      });
      this.total = first;
      return total.length;
    }
  },
  data() {
    return {
      value: [],
      input: 1,
      carlist: [],
      total: 0
    };
  },
  methods: {
    getData: function(resObj) {
      //console.log(resObj);
      location.updataObj(resObj);
      for (var i = 0; i < this.carlist.length; i++) {
        if (this.carlist[i].id == resObj.goodsid) {
          if (resObj.type == "add") {
            this.carlist[i].cou = this.carlist[i].cou + 1;
          } else {
            this.carlist[i].cou = this.carlist[i].cou - 1;
          }
          break;
        }
      }
    },
    getCar: function() {
      var obj = location.getShopObj();
      var str = "";
      for (var key in obj) {
        str += key + ",";
      }
      str = str.substring(0, str.length - 1);
      if (str) {
        var url = common.testifo + "/api/goods/getshopcarlist/" + str;
        this.$http.get(url).then(function(res) {
          res.body.message.forEach(item => {
            item.cou = obj[item.id];
            this.value.push(false);
          });
          this.carlist = res.body.message;
        });
      }
    },
    delerow: function(goodsid, index) {
      this.value.splice(index, 1);
      this.carlist.splice(index, 1);
      location.deletelocal(goodsid);
    }
  },
  created() {
    this.getCar();
  }
};
</script>
<style scoped>
.proinfo {
  padding: 10px;
  height: 150px;
  border-bottom: 1px solid #ccc;
}
.proinfo div {
  float: left;
}
.proinfo .img {
  padding: 10px;
}
.proinfo .img img {
  width: 70px;
  height: 68px;
}
.proinfo .bot {
  width: 250px;
  float: right;
}
.proinfo .delete {
  margin-top: 30px;
}
h4 {
  color: #26a2ff;
  font-size: 16px;
}
.delete ul {
  list-style: none;
  -webkit-padding-start: 0px;
}
.delete ul li {
  display: inline-block;
  margin-right: 5px;
}
.delete ul li:first-child {
  color: #f00;
}
.shade {
  padding: 10px;
  height: 100px;
  background-color: #ccc;
  position: relative;
}
.shade p {
  margin-top: 18px;
}
.btn {
  position: absolute;
  top: 30px;
  right: 28px;
}
</style>


