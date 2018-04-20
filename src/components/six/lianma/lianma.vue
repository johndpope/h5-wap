<template>
  <six-x-scroll :tabItems="tabItems" @changeConIndex="changeConIndex">
    <scroll class="scroll-wrap" ref="scroll" :data="lianmaDefinedNumBalls">
      <div class="tm-a-wrap clearfix">
        <div class="tm-a-top clearfix" v-for="(item, index) in lianmaNumBalls" :key="index">
          <h2 class="lianma-title">{{tabItems[conIndex]}}赔率：{{item[conIndex].odds}}</h2>
          <div class="numball-wrap findInp" v-for="(ball, index) in lianmaDefinedNumBalls" :key="index" :class="{'ballChoosing':ball.bool}" @click="selectBallnums(ball, index, $event, tabItems[conIndex], submitType, lianmagID, lianmaDefinedNumBalls)" ref="lianma">
            <span class="lianma-num" ref="calaStyle" :class="index+1 | filterSixBsBgColor">{{index+1}}</span>
            <input  type='text' pattern="[0-9]\*" class="bet-input" maxlength="5"  ref="inpMoney" @input="moneyWriting(lianmaDefinedNumBalls, index,$event)">
          </div>
        </div>
      </div>
    </scroll>
  </six-x-scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import sixXScroll from '@/base/six-x-scroll/six-x-scroll'
import Loading from '@/base/loading/loading' // 引入等待加载的组件
import { myfilter } from '@/base/js/mixin' // 引入mixin的组件
import $ from 'jquery' // 引入JQ
export default {
  mixins: [myfilter],
  data () {
    return {
      tabItems: ['四全中', '三全中', '三中二', '二全中', '二中特', '特串'],
      conIndex: 0,
      submitType: 3,
      lianmagID: null, // 六合彩提交下注必须参数
      lianmaNumBalls: [],
      lianmaDefinedNumBalls: []
    }
  },
  components: {
    Loading,
    sixXScroll,
    Scroll
  },
  computed: {
  },
  created () {
    this._getlianmaDatas()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  // 当有keepalive的时候，会触发这个钩子函数，进行数据的初始化
  deactivated () {
    this.lianmaDefinedNumBalls.forEach((item) => {
      item.bool = false
    })
  },
  methods: {
    // 内容tab切换，由子组件触发
    changeConIndex (val) {
      this.lianmaDefinedNumBalls.forEach((item, index) => {
        item.bool = false
        item.orderMoney = 0
      })
      this.conIndex = val
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    // 获取连码的数据
    _getlianmaDatas () {
      this.$http.get('/api/json/member/ajax_action.php?rtype=CHN').then((res) => {
        this.lianmaNumBalls = res.data.data
        this.lianmagID = res.data.gid.trim()
        for (let i = 0; i < 49; i++) {
          this.lianmaDefinedNumBalls.push({num: (i < 9 ? '0' + (i + 1) : (i + 1)), bool: false, orderMoney: 0})
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 点击选中号码，高亮效果
    selectBallnums (item, index, event, name, submitType, gid, data) {
      this.$emit('selectBallnums', item, index, event, name, submitType, gid, data)
    },
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
.tm-a-top {
  box-shadow: inset 0 0 0 1px #ccc;
}
.numball-wrap {
  float: left;
  display: flex;
  width: 2rem;
  height: 0.6rem;
  padding: 0.2rem;
  font-size: 0.28rem;
  line-height: 0.6rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  box-shadow: inset 0 0 0 1px #ccc;
}
.lianma-title {
  padding: 0.1rem 0;
  font-weight: 700;
  text-align: center;
  font-size: 0.32rem;
}
.lianma-num {
  width: 0.5rem;
  height: 0.5rem;
  background-size: 0.5rem 0.5rem;
  background-position: center center;
  text-align: center;
  line-height: 0.5rem;
  margin-right: 0.2rem;
}
/* 号码波色的背景图 */
.rbgColor {
  background: url("../../../assets/redBall.png") 0.02rem 0.02rem no-repeat;
  background-size: 0.5rem 0.5rem;
}
.gbgColor {
  background: url("../../../assets/greenBall.png") 0.02rem 0.02rem no-repeat;
  background-size: 0.5rem 0.5rem;
}
.bbgColor {
  background: url("../../../assets/blueBall.png") 0.02rem 0.02rem no-repeat;
  background-size: 0.5rem 0.5rem;
}
.bet-input{
  flex: 1;
  width: 100%;
  height: 0.44rem;
  font-size: 0.24rem;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 0.1rem;
}
</style>
