<template>
  <six-x-scroll :tabItems="tabItems" @changeConIndex="changeConIndex">
    <scroll class="scroll-wrap" ref="scroll"  :data="liangmianNumBalls">
      <div class="tm-a-wrap clearfix">
        <div class="tm-a-top clearfix " v-for="(item, index) in liangmianNumBalls" :key="index" v-show="conIndex === index">
          <div class="otherball-wrap findInp" v-for="(ball, indexA) in item" :key="indexA" :class="{'ballChoosing':ball.bool}" @click="selectBallnums(ball, index, $event, tabItems[conIndex], submitType, liangmiangID, liangmianNumBalls)">
            <span class="tm-other" ref="calaStyle" :name="'gold' + '[' + ball.name + ']'">{{ball.ballNames}}</span>
            <span :name="'odds' + '[' + ball.name + ']'" class="tm_odds">{{ball.odds}}</span>
            <input  type='number' pattern="[0-9]\*" class="bet-input" maxlength="5"  ref="inpMoney" @input="moneyWriting(item, index,$event)">
            <!--<input type="hidden" :name="'gold' + '[' + ball.name + ']'">-->
          </div>
        </div>
      </div>
    </scroll>
  </six-x-scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import sixXScroll from '@/base/six-x-scroll/six-x-scroll'
import $ from 'jquery' // 引入JQ
export default {
  data () {
    return {
      tabItems: ['特码', '正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
      conIndex: 0,
      submitType: 1,
      liangmiangID: null, // 六合彩提交下注必须参数
      liangmianNumBalls: [],
      liangmianOneNumBalls: [],
      liangmianTwoNumBalls: [],
      liangmianTreNumBalls: [],
      liangmianFourNumBalls: [],
      liangmianFiveNumBalls: [],
      liangmianSixNumBalls: [],
      liangmianOtherBalls: [],
      liangmianOtherNames: ['特单', '特双', '特大', '特小', '和单', '和双', '和大', '和小', '总单', '总双', '总大', '总小'],
      liangmianNumBallNames: ['单', '双', '大', '小', '和单', '和双', '和大', '和小']
    }
  },
  components: {
    sixXScroll,
    Scroll
  },
  computed: {
  },
  created () {
    this._getLiangMianDatas()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  // 当有keepalive的时候，会触发这个钩子函数，进行数据的初始化
  deactivated () {
    this.liangmianNumBalls[this.conIndex].forEach((item) => {
      item.bool = false
    })
  },
  methods: {
    // 内容tab切换，由子组件触发
    changeConIndex (val) {
      this.conIndex = val
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    // 获取两面的数据
    _getLiangMianDatas () {
      this.$http.get('/api/json/member/ajax_action.php?rtype=OEOU').then((res) => {
        if (res.status === 200) {
          for (let key in res.data) {
            if (key.indexOf('NA') === 0) {
              this.liangmianOneNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '正码一'})
            }
            if (key.indexOf('NO2_') === 0) {
              this.liangmianTwoNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '正码二'})
            }
            if (key.indexOf('NO3_') === 0) {
              this.liangmianTreNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '正码三'})
            }
            if (key.indexOf('NO4_') === 0) {
              this.liangmianFourNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '正码四'})
            }
            if (key.indexOf('NO5_') === 0) {
              this.liangmianFiveNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '正码五'})
            }
            if (key.indexOf('NO6_') === 0) {
              this.liangmianSixNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '正码六'})
            }
            if (key.indexOf('SP_') === 0 || key.indexOf('NA_') === 0) {
              this.liangmianOtherBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0, typeNames: '特码'})
            }
          }
          this.liangmianNumBalls.push(this.liangmianOtherBalls, this.liangmianOneNumBalls, this.liangmianTwoNumBalls, this.liangmianTreNumBalls, this.liangmianFourNumBalls, this.liangmianFiveNumBalls, this.liangmianSixNumBalls)
          this.liangmianNumBalls.forEach((item, index) => {
            if (index === 0) {
              this.liangmianNumBalls[index].forEach((itemA, indexA) => {
                this.liangmianNumBalls[index][indexA]['ballNames'] = this.liangmianOtherNames[indexA]
              })
            }
            if (index > 0) {
              this.liangmianNumBalls[index].forEach((itemB, indexB) => {
                this.liangmianNumBalls[index][indexB]['ballNames'] = this.liangmianNumBallNames[indexB]
              })
            }
          })
          if (res.data.gID) {
            this.liangmiangID = res.data.gID.trim()
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 点击选中号码，高亮效果
    selectBallnums (item, index, event, name, submitType, gid, data) {
      this.$emit('selectBallnums', item, index, event, name, submitType, gid, data)
    },
    // 隐藏开奖历史记录
    hiddenRecord () {
      this.$children[0].isRotate = false;
      this.$children[0].popboolean = false
    },
    // 号码金额输入框输入
    moneyWriting (item, index,e) {
      this.hiddenRecord();
      if (this.username === '') {
        MessageBox.confirm('请先登录', '温馨提示').then(() => {
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.path }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
          })
        }, () => {
          return false
        })
      }
      else {

        let inMoney=$(e.target).val();
//        let currentSelect = $('.scroll-wrap').find('.numball-wrap').eq(index);
//        if (currentSelect.find('.bet-input').val() >= 1)
        if(inMoney){
          item[index].bool = true;
          item[index].orderMoney=inMoney;
        }
        else {
          item[index].bool = false;
        }
      }
    },
  }
}
</script>

<style scoped>
.scroll-wrap {
  height:100%;
  overflow:hidden;
}
.tm-header-wrapper {
  width: 100%;
  overflow: hidden;
}
.tm-header-wrapper .title-no {
  float: left;
  width: 50px;
}
.tm-a-wrap {
  position: relative;
  width: 100%;
  min-height: 100%;
}
.otherball-wrap {
  float: left;
  display: flex;
  width: 2.2rem;
  height: 0.6rem;
  padding: 0.1rem;
  font-size: 0.26rem;
  line-height: 0.6rem;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  box-shadow: inset 0 0 0 1px #ccc;
}
.otherball-wrap .tm-other {
  font-weight: 700;
  margin-right: 0.1rem;
}
.tm_odds{
  margin-right: 0.1rem;
}
.bet-input{
  width: 40%;
  height: 0.44rem;
  font-size: 0.24rem;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 0.1rem;
}
</style>
