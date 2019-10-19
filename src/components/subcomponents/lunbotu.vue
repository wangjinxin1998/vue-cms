<template>
    <div>
         <mt-swipe :auto="4000">
            <!-- 轮播图的渲染 -->
            <mt-swipe-item v-for="(item, index) in lunbotuList" :key="index">
                <img :src="item" alt="" :class="{'isFull' : isFull}">
                </mt-swipe-item>
           
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    props:["lunbotuList" , "isFull"]
}
</script>

<style lang="scss" scoped>
     .mint-swipe{
        height:200px;
        .mint-swipe-item{
            text-align: center;
          img{
           height: 100%;
        }  
        }
    }
    .isFull{
        width: 100%;
        
    }
</style>