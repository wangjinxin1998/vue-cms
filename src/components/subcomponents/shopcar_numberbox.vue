<template>
    
        <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="count" 
                    @change="getCount" ref="count"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
   
</template>

<script>
import mui from  "../../lib/mui-master/dist/js/mui.min.js";
export default {
    data(){
        return {

        }
    },
    mounted(){
        mui('.mui-numbox').numbox();
        // if(this.max !== undefined){
        //     mui(".mui-numbox").numbox().setOption("max" , this.max);
        // }
    },
    methods:{
        getCount(){
           this.$store.commit('updateShopCar' , {
               count:parseInt( this.$refs.count.value),
               id:parseInt(this.goodsid)
           })
        }
    },
    props:["count" , "goodsid"]
}
</script>

<style lang="scss" scoped>
   
</style>