<template>
    <div>
        <!-- 图片列表 -->
        <!-- 删掉 mui-fullscreen类 防止全屏显示 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a @click="getPhotos(item.id)" :class="['mui-control-item' , item.id==1 ? 'mui-active' : '' ]" 
                        href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="(item, index) in photolist" :key="index">
							{{item.title}}
						</a>
					</div>
				</div>

			</div>

            <!-- 图片列表区域 -->
            <ul>
                 <li v-for="item in photos" :key="item.id">
                     <img v-lazy="item.url">
                     <div class="info">
                         <div class="info-title">
                             <h3>{{item.title}}</h3>
                         </div>
                         <div class="info-body">
                             {{item.zhaiyao}}
                         </div>
                     </div>
                 </li>
            </ul>
    </div>
</template>

<script>
//导入mui的js文件
/*
    注意：我们在初始化滑动条的时候 ，导入mui.js ，控制台会报错：
    ‘Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not
     be accessed on strict ’

     是因为mui.js中用到了'caller', 'callee', and 'arguments'，而webpack打包好的bundle.js
     中默认启用了严格模式，所以这两者会发生冲突

     解决方案： 移除bundle.js的严格模式
     使用 npm i babel-plugin-transform-remove-strict-mode -D这个插件
     然后再.babelrc文件中配置
     {
        "plugins": ["transform-remove-strict-mode"]
        }
*/
import mui from "../../lib/mui-master/dist/js/mui.min.js";
import {Toast} from "mint-ui";
export default {
    data(){
        return {
            photolist:[], //所有分类的列表数组
            photos:[]//图片列表数组
        }
    },
    created(){
        this.getPhotoList();
    },
    mounted(){//当组件中的dom结构呗渲染好并放到页面中后，会执行这个钩子函数
    //如果要操作元素，最好再mounted中，因为，这时候 dom元素是最新的
        //初始化滑动控件
         mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getPhotoList(){
            this.$http.get("../../../ajax-json/photolist.json").then(result => {
               if(result.status === 200){
                   this.photolist = result.body.message;
                   this.photos = this.photolist[0].photos;
               }else{
                   Toast({
                       message:"图片列表请求失败 "
                   })
               }
            })
        },
        getPhotos(id){
            this.photos = this.photolist[id-1].photos;
        }
    }
}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }

    img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    ul{

        list-style: none;
        padding: 0 10px;
        li{
            position: relative;
           margin-bottom: 5px;
        }
         img{
            width: 100%;
            height: 300px;
            vertical-align:bottom
        }

        .info{
            color:white;
            max-height: 80px;
            position: absolute;
            bottom: 0px;
            background: rgba(0, 0, 0 , 0.4);
            width: 100%;
           
            .info-title{
                h3{
                    font-size: 18px;
                    text-align: center;
                }
            }
            .info-body{
                font-size: 12px;
            }
        }
    }
   
</style>