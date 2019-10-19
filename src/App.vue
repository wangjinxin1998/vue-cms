<template>
    <div class="app-container">
      <!-- 顶部header区域 -->
	 <mt-header fixed title="购物商城">
		 <span @click="goBack" slot="left" v-show="flag">
    <mt-button icon="back">返回</mt-button>
  </span>

	 </mt-header>
	 <!-- <span class="back" @click="goBack"><span>&lt;</span>&nbsp;返回</span> -->
      <!-- 中间的路由 router-view区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		
      <!-- 底部Tabbar区域 -->
      <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-wjx" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-wjx" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-wjx" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-wjx" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
		
    </div>
</template>

<script>
export default{
	data(){
		return {
			flag:false
		}
	},
	created(){
		this.flag = this.$route.path === "/home" ? false : true ;
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	},
	watch:{
		"$route.path":function(newPath){
			if(newPath !== "/home"){
				this.flag = true;
			}else{
				this.flag = false;
			}
		}
	}
}

</script>

<style lang="scss" scoped>
	.back{
		position:fixed;
		top: 10px;
		z-index: 999;
		color: white;
		margin-left: 15px;
		span{
			font-weight: bold;
		}
	}
    .app-container{
        padding-top: 40px;
		padding-bottom: 55px;
		overflow-x: hidden;
    }

	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,
	.v-leave-active{
		transition: all 1s ease;
	}
	
/*
	当 滑动条调试ok后发现tabber无法正常工作了，这时候，我们需要把每个tabber按钮的样式中'mui-tab-item'
	重新改下名称
	并将原来的样式赋予现在的类
*/
.mui-bar-tab .mui-tab-item-wjx.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-wjx {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-wjx {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-wjx .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mui-bar-tab .mui-tab-item-wjx .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mint-header{
	z-index: 99;
}
</style>