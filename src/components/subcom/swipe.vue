<template>
  <div>
      <mt-swipe :auto="2000">
		<mt-swipe-item v-for="(item,index) in pic" :key="index">
            <img v-if="item.img!=null" :src="item.img">
            <img v-if="item.src!=null" :src="item.src">
        </mt-swipe-item>
		</mt-swipe>
  </div>
  
</template>


<script>
export default {
    props:['pic']
  
}
</script>


<style scoped>
.mint-swipe {
  height: 300px;
}
.mint-swipe-item {
  background-color: #ff0;
  height: 300px;
}
.mint-swipe-item img {
    width: 100%;
    height: 300px;
}

</style>
