<template>
<div>
  <div class="sport-main-wrap">
    <scroll class="scroll-wrap" :data="sportDatas" :pulldown="true" @pulldown="loadTop" ref="scroll">
      <div class="item-wrap" v-show="sportDatas.length > 0">
        <div class="top-tip">
          <span class="refresh-hook" v-show="sportDatas.length">下拉刷新</span>
        </div>
        <div class="sport-main-item" v-for="(item, index) in sportDatas" :key="index">
          <div class="item-list" @click="sportClick(item, $event)" :class="{'itemBg': index % 2 !== 0}">
            <span class="item-league">{{item.matchname}}</span>
            <span class="match-count">
              <span class="count-style">{{item.sports.length}}</span>
            </span>
          </div>
          <div class="item-content-wrap" v-show="item.bool">
            <div class="item-content" v-for="(sport, sindex) in item.sports" :key="sindex" :class="{'itemBg': index % 2 === 0}">
              <div class="sport-time">
                <p class="no-hook"></p>
                <p class="stime">
                  <span>{{timeFilter(sport.Match_Date)[0]}}</span>
                  <span>{{timeFilter(sport.Match_Date)[1]}}</span>
                </p>
                <p class="stype">
                  <span>{{timeFilter(sport.Match_Date)[2]}}</span>
                  <img src="../../../assets/ballroll.png" alt="" class="ballroll" v-if="timeFilter(sport.Match_Date)[2]">
                </p>
              </div>
              <div class="sport-info">
                <p class="team-h-area">{{sport.Match_Master}}</p>
                <p class="info-area">
                  <span class="team-h-txt">主</span>
                  <span class="vs-txt">VS</span>
                  <span class="team-c-txt">客</span>
                </p>
                <p class="team-c-area">{{sport.Match_Guest}}</p>
              </div>
              <div class="sport-odds-info-wrap">
                <div class="one-common-wrap">
                  <div class="title">
                    <span>1:0</span>
                    <span>2:0</span>
                    <span>2:1</span>
                    <span>3:0</span>
                    <span>3:1</span>
                    <span>3:2</span>
                    <span>4:0</span>
                    <span>4:1</span>
                    <span>4:2</span>
                    <span>4:3</span>
                  </div>
                  <div class="team-odd-wrap">
                    <div class="team-odd-row">
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd10,sport.Match_Master,'比分1：0', 'Match_Bd10')">{{sport.Match_Bd10}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd20,sport.Match_Master,'比分2：0', 'Match_Bd20')">{{sport.Match_Bd20}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd21,sport.Match_Master,'比分2：1', 'Match_Bd21')">{{sport.Match_Bd21}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd30,sport.Match_Master,'比分3：0', 'Match_Bd30')">{{sport.Match_Bd30}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd31,sport.Match_Master,'比分3：1', 'Match_Bd31')">{{sport.Match_Bd31}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd32,sport.Match_Master,'比分3：2', 'Match_Bd32')">{{sport.Match_Bd32}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd40,sport.Match_Master,'比分4：0', 'Match_Bd40')">{{sport.Match_Bd40}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd41,sport.Match_Master,'比分4：1', 'Match_Bd41')">{{sport.Match_Bd41}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd42,sport.Match_Master,'比分4：2', 'Match_Bd42')">{{sport.Match_Bd42}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd43,sport.Match_Master,'比分4：3', 'Match_Bd43')">{{sport.Match_Bd43}}</span>
                    </div>
                    <div class="team-odd-row">
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg10,sport.Match_Guest,'比分0：1', 'Match_Bdg10')">{{sport.Match_Bdg10}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg20,sport.Match_Guest,'比分0：2', 'Match_Bdg20')">{{sport.Match_Bdg20}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg21,sport.Match_Guest,'比分1：2', 'Match_Bdg21')">{{sport.Match_Bdg21}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg30,sport.Match_Guest,'比分0：3', 'Match_Bdg30')">{{sport.Match_Bdg30}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg31,sport.Match_Guest,'比分1：3', 'Match_Bdg31')">{{sport.Match_Bdg31}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg32,sport.Match_Guest,'比分2：3', 'Match_Bdg32')">{{sport.Match_Bdg32}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg40,sport.Match_Guest,'比分0：4', 'Match_Bdg40')">{{sport.Match_Bdg40}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg41,sport.Match_Guest,'比分1：4', 'Match_Bdg41')">{{sport.Match_Bdg41}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg42,sport.Match_Guest,'比分2：4', 'Match_Bdg42')">{{sport.Match_Bdg42}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdg43,sport.Match_Guest,'比分3：4', 'Match_Bdg43')">{{sport.Match_Bdg43}}</span>
                    </div>
                  </div>
                </div>
                <div class="one-common-wrap">
                  <div class="title">
                    <span>0:0</span>
                    <span>1:1</span>
                    <span>2:2</span>
                    <span>3:3</span>
                    <span>4:4</span>
                    <span>UP5</span>
                  </div>
                  <div class="team-odd-wrap">
                    <div class="team-odd-row">
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd00,'','比分0：0', 'Match_Bd00')">{{sport.Match_Bd00}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd11,'','比分1：1', 'Match_Bd11')">{{sport.Match_Bd11}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd22,'','比分2：2', 'Match_Bd22')">{{sport.Match_Bd22}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd33,'','比分3：3', 'Match_Bd33')">{{sport.Match_Bd33}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bd44,'','比分4：4', 'Match_Bd44')">{{sport.Match_Bd44}}</span>
                      <span class="click-hook" @click="submitOrder(sport,sport.Match_Bdup5,'','其他', 'Match_Bdup5')">{{sport.Match_Bdup5}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="nosport" class="no-sport">
        暂无任何赛事
      </div>
    </scroll>
  </div>
  <sport-submit :ifsubmitShow="ifsubmitShow" :sports="sports"
                :sportOdd="sportOdd" :typename="typename"
                :currentTeam="currentTeam" :ballsort="ballsort"
                :oddName="oddName" :typetitle="typetitle"
                :matchtype="matchtype" @toggleIfSubmit="toggleIfSubmit"></sport-submit>
  <!-- 当加载数据比较缓慢的时候，为了优化用户的感官体验效果，需要实现等到load的一个过程-->
  <div class="loading-container" v-show="!sportDatas.length && !nosport">
    <loading></loading>
  </div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading' // 引入等待加载的组件
import SportSubmit from '@/components/sport/sport-submit-frame/sport-submit-frame'
export default {
  data () {
    return {
      sportDatas: [],
      ifsubmitShow: false, // 投注框是否显示
      sports: null, // 用户传值给投注框，下注的数据对象
      sportOdd: null, // 用户传值给投注框，赔率
      typename: '', // 用户传值给投注框，独赢让球等
      currentTeam: '', // 用户传值给投注框，主客队伍名字
      oddName: '', // 赔率名字
      touzhuxiang: '',
      nosport: false
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  props: {
    getSportUrl: {
      type: String,
      default: '/api/app/member/show/json/ft_1_1.php'
    },
    ballsort: {
      type: String
    },
    typetitle: {
      type: String
    },
    matchtype: {
      type: Number
    }
  },
  components: {
    Scroll,
    SportSubmit,
    Loading
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  created () {
    this._getsportDatas()
  },
  methods: {
    // 点击内容展开跟收缩
    sportClick (item, event) {
      if (!event._constructed) {
        return false
      }
      if (!item.bool) {
        item.bool = !item.bool
      } else {
        this.sportDatas.forEach((itemA, indexA) => {
          itemA.bool = false
        })
      }
    },
    // 封装调取数据函数
    _getsportDatas () {
      this.$http(this.getSportUrl).then((res) => {
        if (res.status === 200 && res.data.dh !== 0) {
          let sportData = []
          let newSportDatasOne = []
          let newSportDatasTwo = []
          newSportDatasOne = res.data.db
          newSportDatasOne.forEach((item, index) => {
            ['Match_Name'].forEach(type => {
              if (item[type] in newSportDatasTwo) {
                newSportDatasTwo[item[type]].push(item)
              } else {
                newSportDatasTwo[item[type]] = [item]
              }
            })
          })
          for (let key in newSportDatasTwo) {
            sportData.push({'matchname': key, 'sports': newSportDatasTwo[key], 'bool': false})
          }
          this.sportDatas = sportData
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
          this.nosport = false
        } else {
          this.nosport = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 组件提供的下拉触发方法
    loadTop () {
      // 下拉刷新
      this._getsportDatas()
    },
    // 封装赛事时间过滤器
    timeFilter (value) {
      if (value) {
        let timeArrs = []
        let md = ''
        let ms = ''
        let type = ''
        if (value.indexOf('<br/>') !== -1) {
          md = value.split('<br/>')[0]
          ms = value.split('<br/>')[1].split('<br>')[0]
          if (value.split('<br/>')[1].split('<br>')[1]) {
            type = value.split('<br/>')[1].split('<br>')[1].replace('<font color=\'#FF0000\'>', '').replace('</font>', '')
          }
        } else {
          md = value.split('<br>')[0]
          ms = value.split('<br>')[1]
          if (value.split('<br>')[2]) {
            type = value.split('<br>')[2].replace('<font color=\'#FF0000\'>', '').replace('</font>', '')
          }
        }
        if (!type) {
          timeArrs = [md, ms]
          return timeArrs
        } else {
          timeArrs = [md, ms, type]
          return timeArrs
        }
      }
    },
    // 封装盘口赔率去空格化过滤器
    pankouFilter (value) {
      if (value !== 0) {
        return value.replace(/\s/g, '')
      } else {
        return value
      }
    },
    // 点击赔率进行下注
    submitOrder (item, odd, team, name, oddn) {
      if (odd !== 0 && odd !== undefined) {
        if (this.username === '') {
          MessageBox.confirm('请先登录', '温馨提示').then(() => {
            this.$router.push({
              path: '/login',
              query: { redirect: this.$route.path }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
            })
          }, () => {
            return false
          })
        } else {
          this.sports = item // 当前点击的对象
          this.sportOdd = odd // 当前点击赔率
          this.currentTeam = team // 主客队伍名字
          this.typename = name // 独赢、让球等
          this.oddName = oddn // 所点赔率的键
          this.ifsubmitShow = !this.ifsubmitShow
        }
      } else {
        return false
      }
    },
    // 由下注框取消功能触发的
    toggleIfSubmit (val) {
      this.ifsubmitShow = val
    }
  }
}
</script>

<style scoped>
  .sport-home-wrapper {
    height: 100%;
  }
  .sport-main-wrap {
    position: fixed;
    top: 1.64rem;
    left: 0;
    right: 0;
    bottom: 0.8rem;
  }
  .no-sport {
    display: flex;
    height: 100%;
    font-size: 0.36rem;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  .football-wrapper {
    position: fixed;
    top: 1.64rem;
    left: 0;
    right: 0;
    bottom: 1.1rem;
  }
  .item-wrap {
    min-height: 110vh;
  }
  .sport-main-item {
    position: relative;
  }
  .item-list.itemBg, .item-content.itemBg {
    background-color: rgb(242,244,246);
  }
  .item-list {
    position: relative;
    display: flex;
    height: 0.9rem;
    align-items: center;
    align-content: center;
    font-size: 0.32rem;
    border-top: 0.02rem solid #ddd;
    border-bottom: 0.02rem solid #ddd;
  }
  .item-list .item-league, .item-list .match-count {
    display: flex;
    height: 100%;
    align-content: center;
    align-items: center;
  }
  .item-league {
    flex: 0 0 80%;
    text-align: left;
    padding-left: 5%;
  }
  .match-count {
    flex: 0 0 15%;
  }
  .count-style {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 auto;
    background-color: #ef4f4f;
    border-radius: 50%;
    color: white;
    text-align: center;
    line-height: 0.5rem;
  }
  /* 下拉提示信息 */
  .top-tip{
    position: absolute;  
    top: -0.7rem;
    left: 0;
    z-index: 1;
    width: 100%;
    line-height: 0.7rem;  
    text-align: center;
    font-size: 0.32rem;
  }
  /* 赛事详细信息 */
  .sport-time {
    display: flex;
    height: 0.8rem;
    font-size: 0.32rem;
    text-align: center;
    color: #555;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  .sport-time .no-hook {
    flex: 0 0 20%;
    height: 100%;
    line-height: 0.8rem;
  }
  .sport-time .stime {
    flex: 0 0 60%;
    height: 100%;
    line-height: 0.8rem;
  }
  .sport-time .stime span {
    margin-right: 0.2rem;
  }
  .sport-time .stype {
    display: flex;
    flex: 0 0 20%;
    height: 100%;
    line-height: 0.8rem;
    font-size: 0.26rem;
    color: #d43f3a;
    align-items: center;
    align-content: center;
    flex-direction: row;
  }
  .ballroll {
    animation: fa-spin 2s infinite linear;
  }
  /* 滚球动画 */
  @-webkit-keyframes fa-spin{
    0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
    100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}
  }
  @keyframes fa-spin{
    0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
    100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}
  }
  /* 赛事信息 */
  .sport-info {
    display: flex;
    min-height: 0.6rem;
    padding: 0.2rem;
    background-color: rgb(78,106,140);
    font-size: 0.28rem;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
  .team-h-area, .team-c-area {
    display: flex;
    flex: 1;
    min-height: 0.64rem;
    padding: 0 0.06rem;
    background-color: #fff;
    color: #233C5A;
    border-radius: 0.08rem;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  .info-area {
    display: flex;
    flex: 0 0 15%;
    padding: 0 2.5%;
    align-content: center;
    align-items: center;
    justify-content: space-between;
  }
  .team-h-txt, .team-c-txt {
    padding: 0.04rem 0.12rem;
    background-color: rgb(129,149,173);
    color: #fff;
    border-radius: 0.08rem;
  }
  .vs-txt {
    color: #FDE41A;
    font-size: 0.32rem;
    font-weight: bold;
  }
  .sport-odds-info-wrap .title {
    display: flex;
    width: 100%;
    height: 0.64rem;
    background-color: #f5f5f5;
  }
  .sport-odds-info-wrap .title span {
    flex: 1;
    height: 0.64rem;
    box-shadow:  0.02rem 0 0 #ccc;
    border-bottom: 0.02rem solid #ccc;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.64rem;
  }
  .team-odd-row {
    display: flex;
    min-height: 0.6rem;
    align-content: center;
    align-items: center;
    justify-content: center;
    border-bottom: 0.02rem solid #ccc;
  }
  .team-odd-row span {
    display: flex;
    flex: 1;
    min-height: 0.6rem;
    font-size: 0.32rem;
    align-content: center;
    align-items: center;
    justify-content: center;
    box-shadow: 0.02rem 0 0 #ccc;
  }
 /* 判断是否可以点击下注的样式 */
 .click-hook {
   color: #d58512;
 }
</style>