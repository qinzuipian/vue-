<template>
    <div>
        <div class="product">
            <h4>{{proinfo.title}}</h4>
            <p class="line"></p>
            <p v-html="proinfo.content"></p>
        </div>
    </div>
  
</template>

<script>
import common from "./../common";
export default {
  data() {
    return {
      id:this.$route.params.id,
      proinfo: []
    };
  },
  methods: {
    getProinfo: function() {
      var url = common.testifo + "/api/goods/getdesc/" + this.id;
      this.$http.get(url).then(function(res) {
        this.proinfo = res.body.message[0];
      });
    }
  },
  created() {
    this.getProinfo();
  }
};
</script>


<style scoped>
.line {
  height: 1px;
  background-color: #ccc;
}
.product {
    padding: 2px;
    overflow: hidden;
}
.product h4 {
    color:#26a2ff;
}
</style>
