<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item, index) in newslist" :key="index">
					<router-link :to="'/home/newslist/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
								<span>{{item.add_time | dataFormate}}</span>
								<span>点击:{{item.click}}次</span>
							</p>
						</div>
					</router-link>
				</li>
				

			</ul>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
		return {
			newslist:[]
		}
	},
	created(){
		this.getNewsList();
	},
	methods:{
		getNewsList(){
			this.$http.get("../../../ajax-json/newslist.json").then(function(result){
				if(result.status === 200){//请求成功
					this.newslist = result.body.message;
				}else{
					//请求失败
					Toast({
						message:"新闻列表获取失败 "
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.mui-media-body{
		h1{
			font-size: 16px;
		}
		.mui-ellipsis{
			font-size:12px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
		}
	}
</style>