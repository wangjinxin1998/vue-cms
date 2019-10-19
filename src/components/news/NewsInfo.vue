<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newInfo.add_time | dataFormate}}</span>
            <span>点击: {{newInfo.click}}次</span>
        </p>
         <hr>
        <div class="content">{{newInfo.zhaiyao}}</div>
       <hr>
        <comment :params="this.id"></comment>
    </div>

</template>
<script>
import {Toast} from "mint-ui";
import comment from "../subcomponents/comment.vue";

export default {
    data(){
        return {
            id:this.$route.params.id,
            newInfo:{}
        }
    },
    created(){
        this.id = parseInt(this.id);
        this.getNewsList();
    },
    methods:{
        getNewsList(){
          this.$http.get('../../../ajax-json/newslist.json').then(function(result) {
              
              if(result.status === 200){
                this.newInfo =  result.body.message[this.id - 1];
               
              }else{
                  Toast({
                      message:"新闻内容请求失败"
                  })
              }
          })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss" scoped>
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size:16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{
          
               font-size: 16px;
           
        }
    }
</style>