<template>
  <div class="ssc-wrapper" ref="sccwrapper">
    <lottery-wrapper  :lotterytype="lotterytype" :records="records"
                      :currentPeriods="currentPeriods" :recordHm="recordHm" 
                      :opentime="opentime" :endTime="endTime" :isopen="isopen" 
                      :getballs="_getballs" :propsIndex='propsIndex' 
                      :ballkinds="ballkinds" :ballTotals="ballTotals" 
                      :ballnums="ballnums" :posturl="posturl" :inputname="inputname" :lotteryBallJudge="lotteryBallJudge"
    ></lottery-wrapper>
  </div>
</template>

<script>
  import MHeader from '@/components/m-header/m-header'
  import lotteryWrapper from '@/components/lottery-wrapper/lottery-wrapper'
  import { downTimer } from '@/base/js/mixin'

  export default {
    mixins: [downTimer],
    data () {
      return {
        lotteryBallJudge: 1, // 用来判定开奖球的大小单双，从多少号为大
        lotterytype: '重庆时时彩',
        inputname: 100,
        ballTotals: [],
        ballkinds: ['第一球', '第二球', '第三球', '第四球', '第五球', '龍虎和', '前三球', '中三球', '后三球', '斗牛'],
        ballnums: [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '大', '小', '单', '双'],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '大', '小', '单', '双'],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '大', '小', '单', '双'],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '大', '小', '单', '双'],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '大', '小', '单', '双'],
          ['和大', '和小', '和单', '和双', '龙', '虎', '和'],
          ['豹子', '顺子', '对子', '半顺', '杂六'],
          ['豹子', '顺子', '对子', '半顺', '杂六'],
          ['豹子', '顺子', '对子', '半顺', '杂六'],
          ['没牛', '牛1', '牛2', '牛3', '牛4', '牛5', '牛6', '牛7', '牛8', '牛9', '牛牛', '牛大', '牛小', '牛单', '牛双']
        ],
        records: [],
        currentPeriods: 0, // 当前期数
        recordHm: [], // 上期开奖号码
        isopen: true, // 是否开盘，默认为是
        propsIndex: 0, // 0默认高亮显示第一球
        posturl: '/api/member/lottery/order_lottery.php?gType=0'
      }
    },
    components: {
      MHeader,
      lotteryWrapper
    },
    created () {
      this._getballs()
      this._getRecords()
      this._getHistoryRecords()
    },
    methods: {
      // 获取球名跟号码
      _getballs () {
        this.$http.get('/api/member/lottery/odds.php?gType=0').then((res) => {
          if (res.status === 200) {
            this.endTime = res.data.endtime
            this.opentime = res.data.opentime
            this.isopen = res.data.isopen
            this.countdowmOpen()
            this.countdownFP()
            this.currentPeriods = res.data.number
            this.getBalls = res.data.oddslist.ball
            let newArr = []
            for (let i in this.getBalls) {
              let newItemList = []
              for (let j in this.getBalls[i]) {
                let title = parseInt(j) - 1
                let obj = {}
                if (this.getBalls[i][j] != null) {
                  obj[title] = this.getBalls[i][j]
                  obj['select'] = false
                  newItemList.push(obj)
                }
              }
              newArr.push(newItemList)
            }
            this.ballTotals = newArr
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      _getRecords () {
        this.$http.get('/api/member/lottery/lottery_auto.php?gType=0').then((res) => {
          if (res.status === 200) {
            this.recordHm = res.data.hm
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 获取历史开奖结果
      _getHistoryRecords () {
        this.$http.get('/api/member/lottery/lotResult.php?type=0').then((res) => {
          if (res.status === 200) {
            this.records = res.data
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
.ssc-wrapper {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

