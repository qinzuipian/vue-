<template>
<div class="content">
    <h3>{{getNewinfo.title}}</h3>
    <div class="info">
        <span class="info-t">{{getNewinfo.add_time | datamft('YYYY-MM-DD HH:mm:ss')}}</span>
        <span class="info-d">点击量：{{getNewinfo.click}}</span>
    </div>
    <div v-html="getNewinfo.content" class="info-c"></div>
    <subcom :id="id"></subcom>
</div>
  
</template>

<script>
import common from "./../common"
import subcom from '../subcom/subcom.vue'
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            id:this.$route.params.id,
            getNewinfo: {}

        }
    },
    components:{
        subcom:subcom
    },
    methods:{  
        getinfo:function(){
            var url= common.testifo+"/api/getnew/"+this.id;
            this.$http.get(url)
            .then(function(res) {
                console.log(res);
                if(res.body.status!==0) {
                    Toast(res.body.message);
                    return;
                }
                this.getNewinfo=res.body.message[0];
            })
        }

    },
    created:function(){
      this.getinfo();
    }
  
}
</script>

<style scoped>
.content {
    padding: 5px;
    line-height: 1.5em;
}
.info {
    font-size: 16px;
    margin-top: 10px;
     color: #f00;
}
.info-t {
   margin-left: 20px;

}
.info-d {
    float: right;
    margin-right:20px;
}
.info-c {
    font-size: 18px;
}
</style>

