<template>
    <div class="goods-list">
        <div class="goods-item" @click="goDetail(item.id)" v-for="(item, index) in goodsinfo" :key="index">
            <img :src="item.img_url[0]" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.newPrice }}</span>
                    <span class="old">￥{{ item.oldPrice }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.kucun }}件</span>
                </p>
            </div>
        </div>
</div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return {
            goodsinfo:[]
        }
    },
    created(){
        this.getGoodsInfo();
    },
    methods:{
        goDetail(id){
            //1、最简单的方式
            //this.$router.push("/home/goodslist/goodsinfo/" + id);
            //2、传递对象
            
            //this.$router.push({path:"/home/goodslist/goodsinfo/" + id})
            //3、传递命名的路由
            this.$router.push({
                name:"goodsinfo",
                params:{id}
            })
        },
        getGoodsInfo(){
            this.$http.get("../../../ajax-json/goodslist.json").then(result => {
                if(result.status === 200){
                    this.goodsinfo = result.body.message;
                }else{
                    //请求失败
                    Toast({
                        message:"商品列表请求失败"
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content:space-between;
            min-height: 293px;
            img{
                width: 100%;
                height: 170px
            }
            .title{
                font-size: 14px;
            }
            p{
                margin: 0;
                padding: 0;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>