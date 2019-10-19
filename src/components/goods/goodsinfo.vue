<template>
    <div class="goodsinfo-container">
        <transition
            v-on:before-enter="beforeEnter"
  			v-on:enter="enter"
  			v-on:after-enter="afterEnter"
        >
            <div class="ball" v-show="flag" ref="ball"></div>
        </transition>
            
            <!--商品轮播图区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<lunbotu :lunbotuList="goodsinfo.img_url" :isFull="isFull"></lunbotu>
					</div>
				</div>
			</div>
            <!-- 商品购买区域 -->
			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>￥{{goodsinfo.oldPrice}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.newPrice}}</span>
                        </p>
                        <!-- 1、由于gooslist-numberbox组件的最大值，取决于商品的库存，
                            而商品的库存数量在父组件中，因此父组件需要将这个值
                            传给子组件，但是 在实际开发当中，商品的库存数量，是通过
                            向服务器发送数据请求来获得的，所以这个数量是未知的，所以需要
                            考虑到没有获取到服务器传来的数据，这种情况，因此这时候就会传的值就是一个
                            undefined，就会出现错误

                            解决方式：
                            在子组件当中建立watch监听，监听，从父组件中传递过去 的值，当值
                            发生改变时，通过js的方式来改变子组件的最大值
                            2、当点击加入购物车时，父组件必须要获得子组件中的数量值

                            解决方式：父组件向子组件，传递一个方法，给子组件的数量文本框添加
                            @change事件，当子组件的数量发生改变时，这时候调用绑定的方法，方法中执行
                            从父组件中传递过来的方法，将数量传给父组件
                         -->
                        <p>购买数量:<numbox @getCount="getSelectorCount" :max="goodsinfo.kucun"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
				
			</div>	
			
            <!-- 参数区域 -->
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:SD2932214404</p>
                        <p>库存情况:{{goodsinfo.kucun}}件</p>
                        <p>上架时间:2019-9-24 18:27:40</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                     <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </div>
			</div>
			
    </div>
</template>

<script>
import lunbotu from "../subcomponents/lunbotu.vue";
import {Toast} from "mint-ui";
import numbox from "./goodsinfo_numbox.vue";
export default {
    data(){
        return {
            id:parseInt(this.$route.params.id),
            goodsinfo:{},//保存商品的信息
            isFull:false,
            flag:false,
            selectorCount:1//默认的的选择商品数量
        }
    },
    created(){
        this.getGoodsInfo();
    },
    methods:{
        getGoodsInfo(){  
            this.$http.get("../../../ajax-json/goodslist.json").then(result => {
                if(result.status === 200){
                    this.goodsinfo = result.body.message[this.id-1]
                    
                }else{
                    Toast({
                        message:"轮播图加载失败"
                    })
                }
            })
        },
        beforeEnter(el){
			el.style.transform = "translate(0 , 0)";
		},
		enter(el , done){
			el.offsetWidth;
           //el.style.transform = "translate(239-138px , 619-391px)";
           //获取小球在页面中的位置
           const ballPosition = this.$refs.ball.getBoundingClientRect();
           const badgePosition = document.getElementById("badge").getBoundingClientRect();
           const xDist = badgePosition.left - ballPosition.left;
           const yDist = badgePosition.top - ballPosition.top;
            el.style.transform = `translate(${xDist}px , ${yDist}px)`;
			el.style.transition = "all 1s cubic-bezier(.4 , -0.3 , 1 , .68)";
			done();
		},
		afterEnter(el){
			this.flag = false;
        },
        getSelectorCount(count){
            this.selectorCount = count;
        },
        addToShopCar(){
            this.flag = !this.flag;
            var goodsinfo = {
                id:this.id,
                count:this.selectorCount,
                selected:true,
                price:this.goodsinfo.newPrice
            }

            this.$store.commit('addToCar' , goodsinfo);
        }
    },
    components:{
        lunbotu,
        numbox
    }
}
</script>
<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow:hidden;
        
        .now_price{
            font-size: 16px;
            color: red;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            background-color: red;
            position: absolute;
            z-index: 99;
            border-radius: 50%;
            top: 391px;
            left: 138px;
        }
    }

</style>