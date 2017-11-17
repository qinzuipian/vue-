<template>
<div>
     <div class="swipe">
       <shopinfo :pic="shopInfo"></shopinfo>
     </div>
      <div class="price">
        <h4>{{shopPrice.title}}</h4>
        <p class="line"></p>
        <p>
          <span>市场价：<s>￥{{shopPrice.market_price}}</s></span>
          <span>销售价：<b>￥{{shopPrice.sell_price}}</b></span>
        </p>
        <div class="shopbuy">购买数量：
          <number @data="getData" class="car"></number>
          <transition name="show" @before-enter="beforeEnter"
                      @enter="Enter"
                      @after-enter="afterEnter">
               <div v-if="isshow" class="ball"></div>
          </transition>
         
        </div>
        <p>
          <mt-button type="primary"  size="small">立即购买</mt-button>
          <mt-button type="danger"  size="small" @click="getShop()">加入购物车</mt-button>
        </p>
      </div>
      <div class="product">
        <h4>商品参数</h4>
        <p class="line"></p>
        <p>商品货号：{{shopPrice.goods_no}}</p>
        <p>库存数量：{{shopPrice.stock_quantity}}</p>
        <p>上架时间：{{shopPrice.add_time | datamft("YYYY-MM-DD HH:mm:ss")}}</p>
      </div>
      <div class="btn">
      <router-link :to="'/shop/shopdesc/'+id">
        <mt-button plain type="primary" size="large">图文详情</mt-button>
      </router-link>
      <router-link :to="'/shop/shopcomm/'+id">
        <mt-button plain type="danger" size="large">商品评论</mt-button>
      </router-link>
      </div>
</div>
</template>

<script>
import common from "./../common";
import shopinfo from "./../subcom/swipe.vue";
import number from "./../subcom/addCar.vue";
import { vum, contront } from "./../subcom/vm";
import location from "./../subcom/location.js";
export default {
  components: {
    shopinfo,
    number
  },
  data() {
    return {
      shopInfo: [],
      shopPrice: [],
      id: this.$route.params.id,
      input: 1,
      isshow: false
    };
  },
  methods: {
    beforeEnter: function(el) {
      el.style.transform = "translate(0px,0px)";
    },
    Enter: function(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(112px,310px)";
      done();
    },
    afterEnter: function(el) {
      this.isshow = !this.isshow;
    },
    getData: function(count) {
      this.input = count;
    },
    getShop: function() {
      vum.$emit(contront, this.input);
      console.log("顾客购买了" + this.input + "件产品");
      location.setlocal({ goodsid: this.id, countval: this.input });
      this.isshow = !this.isshow;
    },
    getSwipe: function() {
      var url = common.testifo + "/api/getthumimages/" + this.id;
      this.$http.get(url).then(function(res) {
        this.shopInfo = res.body.message;
      });
    },
    getPrice: function() {
      var url = common.testifo + "/api/goods/getinfo/" + this.id;
      this.$http.get(url).then(function(res) {
        this.shopPrice = res.body.message[0];
      });
    }
  },
  created() {
    this.getSwipe();
    this.getPrice();
  }
};
</script>

<style scoped>
div {
  margin-top: 3px;
}
p {
  margin-top: 15px;
}
.swipe,
.price,
.product,
.btn {
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 3px;
}
.price h4 {
  color: #26a2ff;
}
.price span {
  margin-right: 20px;
}
.price span b {
  color: #f00;
}
.line {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}
.mint-button--danger.is-plain {
  margin-top: 5px;
}
.shopbuy {
  position: relative;
}
.car {
  position: absolute;
  left: 90px;
  top: -3px;
}
.ball {
  width: 20px;
  height: 20px;
  background-color: #f00;
  border-radius: 10px;
  position: absolute;
  top: 10px;
  left: 145px;
  transition: all 0.6s ease;
  z-index: 999;
}
</style>
