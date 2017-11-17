<template>
<div>
    <div class="numbox">
        <div class="num" @click="sub">-</div>
        <div class="num" v-html="count"></div>
        <div class="num" @click="add">+</div>
    </div>
</div>
  
</template>

<script>
export default {
  props: ["countinit", "goodsid"],
  data() {
    return {
      count:1,
      resObj: { goodsid: 0, type: "add" }
    };
  },
    created(){
        this.count=this.countinit;
    },
  methods: {
    setCount: function(type) {
      this.resObj.type = type;
      this.resObj.goodsid = this.goodsid;
      this.$emit("data", this.resObj);
    },
    add: function() {
      this.count++;
      this.setCount('add');
    },
    sub: function() {
      this.count--;
      if (this.count < 1) {
        this.count = 1;
        return;
      }
      this.setCount('sub');
    }
  }
};
</script>

<style scoped>
.num {
  border: 1px solid #ccc;
  width: 40px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  display: inline-block;
}
</style>
