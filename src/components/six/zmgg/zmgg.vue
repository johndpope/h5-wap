<template>
  <six-x-scroll :tabItems="tabItems" @changeConIndex="changeConIndex">
    <scroll class="scroll-wrap" ref="scroll" :data="zmggNumBalls">
      <div class="tm-a-wrap clearfix">
        <div class="tm-a-top clearfix" v-for="(item, index) in zmggNumBalls" :key="index">
          <h2 class="zmgg-title">{{item[index].typeNames}}</h2>
          <div class="otherball-wrap findInp" v-for="(ball, indexA) in item" :key="indexA" :class="{'ballChoosing':ball.bool}" @click="selectBallnums(ball, index, $event, tabItems[conIndex], submitType, zmgggID, zmggNumBalls)">
            <span class="tm-other" ref="calaStyle">{{ball.ballNames}}</span>
            <span class="tm_odds">{{ball.odds}}</span>
            <input  type='text' pattern="[0-9]\*" class="bet-input" maxlength="5" readonly  ref="inpMoney" @input="moneyWriting(item, indexA,$event)">
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
      tabItems: ['正码过关'],
      conIndex: 0,
      submitType: 2,
      zmgggID: null, // 六合彩提交下注必须参数
      zmggNumBalls: []
    }
  },
  components: {
    sixXScroll,
    Scroll
  },
  computed: {
  },
  created () {
    this._getzmggDatas()
  },
  // 当有keepalive的时候，会触发这个钩子函数，进行数据的初始化
  deactivated () {
    this.zmggNumBalls.forEach((item) => {
      item.forEach((itemA) => {
        itemA.bool = false
      })
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
    // 获取正码过关的数据
    _getzmggDatas () {
      this.$http.get('/api/json/member/ajax_action.php?rtype=NAPN').then((res) => {
        if (res.data.gid) {
          this.zmggNumBalls = res.data.data
          this.zmgggID = res.data.gid.trim()
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
.zmgg-title {
  padding: 0.1rem 0;
  font-weight: 700;
  text-align: center;
  font-size: 0.32rem;
}
.otherball-wrap {
  float: left;
  display: flex;
  width: 2rem;
  height: 0.6rem;
  padding: 0.2rem;
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
  width: 34%;
  height: 0.44rem;
  font-size: 0.24rem;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 0.1rem;
}
</style>
