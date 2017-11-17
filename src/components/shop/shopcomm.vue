<template>
    <div>
         <div class="sub">
              <subcom :id="id"></subcom>
         </div>
    </div>
</template>


<script>
import subcom from '../subcom/subcom.vue'
export default {
    components:{
        subcom
    },
    data(){
        return {
            id:this.$route.params.id

        }
    }
  

}
</script>


<style scoped>
.sub {
    padding: 5px;
}

</style>
