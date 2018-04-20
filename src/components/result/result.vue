<template>
    <div>
        <sport-home-head :typetitle="typetitle" :linkName="''"></sport-home-head>
        <!--开奖结果筛选/最新/今日/昨日/自定义-->
         <div class="select-box">
             <div  @click="getDate">
                 后一天
             </div>
           <div @click="getDate">
               前一天
           </div>
         </div>
         <!--开奖结果-->
        <div class="lottery-result-box">
            <div class="lottery-result-content">
                <div class="title">
                    <p>东加里曼丹省长杯(在印尼)</p>
                </div>
                <div class="info">
                    <p>02-24 04:30</p>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        比赛队伍
                    </div>
                    <div class="col-xs-4 item-info">
                        巴厘巴板
                    </div>
                    <div class="col-xs-4 item-info">
                        斯里维加亚
                    </div>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        半场
                    </div>
                    <div class="col-xs-4 item-info">
                        1
                    </div>
                    <div class="col-xs-4 item-info">
                        1
                    </div>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        全场
                    </div>
                    <div class="col-xs-4 item-info">
                        2
                    </div>
                    <div class="col-xs-4 item-info">
                        2
                    </div>
                </div>
            </div>
            <div class="lottery-result-content">
                <div class="title">
                    <p>东加里曼丹省长杯(在印尼)</p>
                </div>
                <div class="info">
                    <p>02-24 04:30</p>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        比赛队伍
                    </div>
                    <div class="col-xs-4 item-info">
                        巴厘巴板
                    </div>
                    <div class="col-xs-4 item-info">
                        斯里维加亚
                    </div>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        半场
                    </div>
                    <div class="col-xs-4 item-info">
                        1
                    </div>
                    <div class="col-xs-4 item-info">
                        1
                    </div>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        全场
                    </div>
                    <div class="col-xs-4 item-info">
                        2
                    </div>
                    <div class="col-xs-4 item-info">
                        2
                    </div>
                </div>
            </div>
            <div class="lottery-result-content">
                <div class="title">
                    <p>东加里曼丹省长杯(在印尼)</p>
                </div>
                <div class="info">
                    <p>02-24 04:30</p>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        比赛队伍
                    </div>
                    <div class="col-xs-4 item-info">
                        巴厘巴板
                    </div>
                    <div class="col-xs-4 item-info">
                        斯里维加亚
                    </div>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        半场
                    </div>
                    <div class="col-xs-4 item-info">
                        1
                    </div>
                    <div class="col-xs-4 item-info">
                        1
                    </div>
                </div>
                <div class="rate-row">
                    <div class="col-xs-4">
                        全场
                    </div>
                    <div class="col-xs-4 item-info">
                        2
                    </div>
                    <div class="col-xs-4 item-info">
                        2
                    </div>
                </div>
            </div>
        </div>
        <home-footer></home-footer>
    </div>
</template>

<script>
    import sportHomeHead from '@/components/sport/sport-home-head/sport-home-head'
    import homeFooter from '@/components/home-footer/home-footer'
    export default {
        data () {
            return {
                typetitle: '足球赛果',
                ballsort: '比赛结果',
            }
        },
        components: {
            sportHomeHead,
            homeFooter
        },
        methods:{
            getDate(){
               this.$http('/api/app/member/show/result/football.php?ymd=2018-02-27').then((res)=>{
                 console.log(res);
               }).catch((error) => {
                   console.log(error)
               })
            }
        }
    }
</script>
<style scoped>
    .head-bottom{
        display: none!important;
    }
    .select-box{
        text-align: right;
        background-color: #3071b8;
        height: .8rem;
    }
    .select-box>div{
        font-size: .3rem;
        float: right;
        background-color: #426084;
        border-radius: 4px;
        padding: .1rem .2rem;
        color: white;
        margin: .1rem .2rem 0 0;
    }
    .lottery-result-box{
        font-size: .3rem;
        text-align: center;
    }
    .lottery-result-content{
        margin-bottom: .1rem;
    }
    .lottery-result-content>.title{
        margin-bottom: .2rem;
    }
    .rate-row{
        overflow: hidden;
        background-color: #f5f5f5;
    }
    .rate-row:nth-child(even){
        background-color: #fff;
    }
    .rate-row>.col-xs-4{
        padding: .1rem 0;
        width: 33%;
        float: left;
        border-right: 1px solid #e1ecf4;
    }
    .rate-row>.col-xs-4:nth-last-of-type(-n+1){
        border-right: 0;
    }
    .lottery-result-content .info p{
        margin-bottom: .1rem;
    }
    .item-info{
        color: #d58512;
    }
</style>
