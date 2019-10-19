//入口文件
import Vue from "vue";

//导入路由的包
import VueRouter from "vue-router";
//安装路由
Vue.use(VueRouter);

//注册vuex
import vuex from "vuex";
Vue.use(vuex);

//每次刚进入 网站，肯定会 调用 main.js在刚调用的时候，先从本地存储中 ，把购物车的数据读取出来
var car = JSON.parse(localStorage.getItem('car')) || [];

var store = new vuex.Store({
    state:{// this.$store.state.***
        car:car//将购物车中的数据 ，用一个数组存储起来，在car数组中存储一些商品的对象   
    },
    mutations:{// this.$store.commit('方法的名称' ， '按需传入唯一的参数')
        addToCar(state , goodsinfo){//将商品添加到购物车
            var flag = false;
            state.car.some(item => {
                if(item.id === goodsinfo.id){
                    item.count += goodsinfo.count;
                    flag = true;
                    return true;
                }
            })

            if(!flag){
                state.car.push(goodsinfo);
            }

            //当更新完 car之后 ， 把car的数据，存储到 本地的localStorage中
            localStorage.setItem('car' , JSON.stringify(state.car));
        },
        updateShopCar(state , goodsinfo){//当在购物车中点击加减商品时更新购物车
            state.car.some(item => {
                if(item.id === goodsinfo.id){
                    item.count = goodsinfo.count;
                    return true;
                }
            })
            //更新完数据之后，将其重新添加到localStore中
            localStorage.setItem('car' , JSON.stringify(state.car));
        },
        updateGoodsSelected(state , info){//更新商品的勾选情况
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                    return true;
                }
            })
            localStorage.setItem('car' , JSON.stringify(state.car));
        },
        removeGoods(state , id){//删除购物车中的商品
            state.car.some((item , index) => {
                if(item.id === parseInt(id)){
                    state.car.splice(index , 1);
                }
            })
            localStorage.setItem('car' , JSON.stringify(state.car));
        }
    },
    getters:{//this.$store.getters.***
        //相当于计算属性 ，也相当于filter
        getAllCount(state){//获取所有商品的数量
            var c =0 ;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state){//获取加入购物车的商品的id以及数量
            var c = [];
            state.car.forEach(item => {
                var obj = {};
                obj["id"] = item.id;
                obj["count"] = item.count;
                c.push(obj);
            })
            return c;
        },
        getGoodsSelected(state){//获取商品的勾选情况
            var o = {};
            state.car.some(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选的数量
                amount:0//勾选的商品的总价
            };

            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.price*item.count;
                }
                
            })
            return o;
        }
    }
});

//导入格式化时间的插件
import moment from "moment";

//定义全局的过滤器
Vue.filter('dataFormate' , function(dataStr , pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern);
})

//导入vue-resource
import VueResource from "vue-resource";

//安装vue-resource
Vue.use(VueResource);

//导入mui的样式
import "./lib/mui-master/dist/css/mui.min.css";
import "./lib/mui-master/examples/hello-mui/css/icons-extra.css";//图标
import "./lib/mui-master/examples/hello-mui/css/app.css";

//按需导入mint-ui组件
import {Header ,Swipe , SwipeItem , Button ,Lazyload , Switch} from "mint-ui";
import "mint-ui/lib/style.css";
Vue.component(Swipe.name , Swipe );
Vue.component(SwipeItem.name , SwipeItem);
Vue.component(Button.name , Button);
Vue.component(Header.name , Header);
Vue.component(Switch.name , Switch);
Vue.use(Lazyload);
//由于使用按需导入mint-ui组件，懒加载图标不会显示，因此这里必须要全部导入mint-ui组件
// import MintUI from "mint-ui";
// Vue.use(MintUI);
// import "mint-ui/lib/style.css";

//导入自己的router.js 模块
import router from "./router.js";

//导入app根组件
import app from "./App.vue";



var vm = new Vue({
    el:".app",
    render(c){
        return c(app);
    },
    router,
    store//挂载store
})