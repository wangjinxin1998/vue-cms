<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <textarea  v-model="msg" name="" id="" maxlength="120" placeholder="请输入要BB的内容(最多吐槽120个字)"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comment" :key="index">
                <div class="cmt-title">
                    第{{item.id}}楼&nbsp;&nbsp;用户名:{{item.username}}&nbsp;&nbsp;
                   {{item.add_time | dataFormate}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button @click="getMore" type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>
<script>

import {Toast} from "mint-ui";
export default {
    data(){
        return{
            maxCountByPage:5,
            comment:[],
            msg:""//评论内容
        }
    },
    created(){
        this.getCmt();
    },
    methods:{
        getCmt(){
            this.$http.get('../../../ajax-json/newslist.json').then(function(result){
              
               if(result.status === 200){
                    this.comment = result.body.message[this.params-1].comment;
                    if(this.comment.length > this.maxCountByPage){
                        this.comment.length = this.maxCountByPage;
                    }
               }else{
                   Toast({
                       message:"评论列表加载失败"
                   })
               }
                
            })
        },
        getMore(){
            this.maxCountByPage += 5;
            this.getCmt();
        },
        postComment(){
            this.msg = this.msg.trim();
            if(this.msg === ""){
                Toast({
                    message:"评论内容不合法"
                })
                return ;
            }
            
                var newComment = {
                    id:this.comment.length+1,
                    username:"匿名用户",
                    add_time:new Date().getTime(),
                    content:this.msg
                }
            this.comment.unshift(newComment);
            this.msg = "";
        }
    },
    props:['params']
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size:14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 10px 0;
            .cmt-item{
                font-size: 13px;
                line-height: 30px;
                .cmt-title{
                    background: #ccc;
                }
                 .cmt-body{
                     text-indent: 2em;
                 }
                }
        }
    }
</style>