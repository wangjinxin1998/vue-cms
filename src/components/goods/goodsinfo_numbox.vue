<template>
    
        <div class="mui-numbox" data-numbox-min='1'>
           
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" 
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
        if(this.max !== undefined){
            mui(".mui-numbox").numbox().setOption("max" , this.max);
        }
    },
    methods:{
        getCount(){
            this.$emit("getCount" , parseInt(this.$refs.count.value));
        }
    },
    props:["max"],
    watch:{
        max:function(newValue , oldValue){
            //使用js API色湖之numberbox的最大值
            mui(".mui-numbox").numbox().setOption("max" , newValue);
        }
    }
}
</script>

<style lang="scss" scoped>
   
</style>