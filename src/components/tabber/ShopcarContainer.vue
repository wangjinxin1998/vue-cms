<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表区域 -->
        <div class="mui-card" v-for="(item, index) in shopcargoodsinfo" :key="index">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id , $store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.img_url[0]" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.newPrice}}</span>
                                <numberbox :count="item.count" :goodsid="item.id"></numberbox>
                                <a href="#" @click.prevent="removeGoods(item.id , index)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>    

        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件, 总价 
                            <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
                    
				</div>
			</div>
    </div>
</template>
<script>
import numberbox from '../subcomponents/shopcar_numberbox.vue';
import {Toast} from "mint-ui";
export default {
    data(){
        return {
            goodsinfo:[],//保存所有商品的信息
            shopcargoodsinfo:[]//保存购物车中商品的有关信息
        }
    },
    created(){
        this.getGoodsInfo();
       
    },
    methods:{
        getGoodsInfo(){
            this.$http.get("../../../ajax-json/goodslist.json").then(result => {
                if(result.status === 200){
                    this.goodsinfo = result.body.message;
                     this.getShopCarGoodsInfo();
                }else{
                    Toast({
                        message:"购物车加载失败"
                    })
                }
            })
        },
        getShopCarGoodsInfo(){
           var c  = this.$store.getters.getGoodsCount;
            c.forEach(item => {
                this.shopcargoodsinfo.push(this.goodsinfo[parseInt(item["id"])-1]);
                this.goodsinfo[parseInt(item["id"])-1].count = item["count"];
            })
        },
        selectedChanged(id , val){
            //每当点击开关，把最新的 开关状态，同步到 store中
            //console.log(id +"--"+ val);
            this.$store.commit('updateGoodsSelected' , {id , selected:val});
        },
        removeGoods(id , index){
            this.shopcargoodsinfo.splice(index , 1);
            this.$store.commit('removeGoods' , id);
        }
    },
    components:{
        numberbox
    }
}
</script>
<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
           
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan{
            display: flex;
            justify-content:space-between;
            align-content: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }

        .mui-card-content-inner{
            display: flex;
            align-content: center;
        }
    }
</style>