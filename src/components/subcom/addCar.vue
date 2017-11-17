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
  data() {
    return {
      count: 1
    };
  },
  methods: {
    setCount: function() {
      this.$emit('data', this.count);
    },
    add: function() {
      this.count++;
      this.setCount();
    },
    sub: function() {
      this.count--;
      if (this.count < 1) {
        this.count = 1;
      }
      this.setCount();
    }
  },
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
