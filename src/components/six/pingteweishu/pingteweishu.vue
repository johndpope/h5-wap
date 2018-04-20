<template>
  <six-x-scroll :tabItems="tabItems">
    <scroll class="scroll-wrap" v-show="conIndex === 0" ref="scroll" :data="pingteweishuNumBalls">
      <div class="tm-a-wrap clearfix">
        <div class="tm-a-top clearfix">
          <div class="numball-wrap findInp" v-for="(ball, index) in pingteweishuNumBalls" :class="{'ballChoosing':ball.bool}" :key="index" @click="selectBallnums(ball, index, $event, tabItems[conIndex], submitType, pingteweishugID, pingteweishuNumBalls)" ref="pingteweishu">
            <span class="other-num" ref="calaStyle">{{ball.ballNames}}</span>
            <span class="odds" :name="'odds' + '[' + ball.name + ']'">{{ball.odds}}</span>
            <input type="hidden" :name="'gold' + '[' + ball.name + ']'">
            <input  type='text' pattern="[0-9]\*" class="bet-input" maxlength="5"   ref="inpMoney" @input="moneyWriting(pingteweishuNumBalls, index,$event)">
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
      tabItems: ['头尾数'],
      conIndex: 0,
      submitType: 0,
      pingteweishuNumBalls: [],
      pingteweishugID: null, // 六合彩提交下注必须参数
      pingteweishuBallNames: ['尾0', '尾1', '尾2', '尾3', '尾4', '尾5', '尾6', '尾7', '尾8', '尾9']
    }
  },
  components: {
    sixXScroll,
    Scroll
  },
  computed: {
  },
  created () {
    this._getpingteweishuDatas()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  // 当有keepalive的时候，会触发这个钩子函数，进行数据的初始化
  deactivated () {
    this.pingteweishuNumBalls.forEach((item) => {
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
    // 获取特码生肖的数据
    _getpingteweishuDatas () {
      this.$http.get('/api/json/member/ajax_action.php?rtype=SPB').then((res) => {
        if (res.status === 200) {
          for (let key in res.data) {
            if (key.indexOf('NF') === 0) {
              this.pingteweishuNumBalls.push({name: key, odds: res.data[key], bool: false, orderMoney: 0})
            }
          }
          this.pingteweishuNumBalls.forEach((item, index) => {
            this.pingteweishuNumBalls[index]['ballNames'] = this.pingteweishuBallNames[index]
          })
          if (res.data.gID) {
            this.pingteweishugID = res.data.gID.trim()
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
.numball-wrap {
  float: left;
  display: flex;
  width: 2.2rem;
  height: 0.6rem;
  padding: 0.1rem;
  font-size: 0.28rem;
  line-height: 0.6rem;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  box-shadow: inset 0 0 0 1px #ccc;
}
.numball-wrap .tm-num {
  width: 0.5rem;
  height: 0.5rem;
  background-size: 0.5rem 0.5rem;
}
.tm-other {
  font-weight: 700;
}
.other-num {
  font-weight: 700;
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
