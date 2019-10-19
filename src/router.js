
import VueRouter from "vue-router";
//导入对应的路由组件
import HomeContainer from "./components/tabber/HomeContainer.vue";
import MemberContainer from "./components/tabber/MemberContainer.vue";
import ShopcarContainer from "./components/tabber/ShopcarContainer.vue";
import SearchContainer from "./components/tabber/SearchContainer.vue";
import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue";
import PhotoList from "./components/photos/PhotoList.vue";
import GoodsList from "./components/goods/goodslist.vue";
import GoodsInfo from "./components/goods/goodsinfo.vue";
//创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        {path:"/" , redirect:"/home"},
        {path:"/home" , component:HomeContainer},
       {path:"/member" , component:MemberContainer},
       {path:"/shopcar" , component:ShopcarContainer},
       {path:"/search" , component:SearchContainer},
       {path:"/home/newslist" , component:NewsList},
       {path:"/home/newslist/newsinfo/:id" , component:NewsInfo},
       {path:"/home/photolist" , component:PhotoList},
       {path:"/home/goodslist" , component:GoodsList},
       {path:"/home/goodslist/goodsinfo/:id" , component:GoodsInfo , name:"goodsinfo"}
    ],
    linkActiveClass:"mui-active"//覆盖默认的路由高亮的类，默认的类叫做link-active-class
})

//将路由对象暴露出去
export default router