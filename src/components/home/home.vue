<template>
  <div>
    <home-header></home-header>
    <div class="home">
      <scroll class="scroll-wrap" ref="scroll">
        <div class="container-wrapper">
          <div class="banner">
            <wc-swiper>
              <wc-slide>
                <img src="../../assets/banner1.png" alt="">
              </wc-slide>
              <wc-slide>
                <img src="../../assets/banner2.png" alt="">
              </wc-slide>
            </wc-swiper>
          </div>
          <div class="main-wrapper">
            <div class="notice-area" @click="openMsg">
              <router-link to="/">
                <img class="notice-icon" src="../../assets/icon1.png" alt="noticeIcon">
              </router-link>
              <div class="notice">
                <marquee scrollAmount="5" scrolldelay="10" direction="left" nowarp v-html="msg">
                </marquee>
              </div>
            </div>
            <div class="funs">
              <router-link class="fun" tag="div" to="/">
                <img src="../../assets/c1.png" alt="noticeMore">
                <p>彩票游戏</p>
              </router-link>
              <router-link class="fun" tag="div" to="/livehome">
                <img src="../../assets/c2.png" alt="noticeMore">
                <p>真人视讯</p>
              </router-link>
              <router-link class="fun" tag="div" to="/sport/jrzqds">
                <img src="../../assets/c3.png" alt="noticeMore">
                <p>体育赛事</p>
              </router-link>
              <router-link class="fun" tag="div" to="/">
                <img src="../../assets/c4.png" alt="noticeMore">
                <p>电子游艺</p>
              </router-link>
            </div>
            <keep-alive>
              <router-view :pcUrl="pcUrl" :agentUrl="agentUrl"></router-view>
            </keep-alive>
          </div>
        </div>
      </scroll>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import homeHeader from '@/components/home-header/home-header'
import homeFooter from '@/components/home-footer/home-footer'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      msg: '',
      pcUrl:'',
      agentUrl:''
    }
  },
  created () {
    this._getMsg()
  },
  methods: {
    // 获取公告
    _getMsg () {
      this.$http.get('/api/json/api.php?r=data').then((res) => {
        this.msg = res.data.data.msg
        this.serviceUrl = res.data.data.serverurl
        this.pcUrl =  res.data.data.pc
        this.agentUrl=  res.data.data.agenturl
        document.title = res.data.data.web_name
      }).catch((error) => {
        console.log(error)
      })
    },
    // 点击公告
    openMsg () {
      MessageBox({
        title: '公告消息',
        message: this.msg
      })
    }
  },
  components: {
    homeHeader,
    homeFooter,
    Scroll
  }
}
</script>

<style scoped>
.home {
  position: fixed;
  top:0.7rem;
  left: 0;
  right: 0;
  bottom: 0.8rem;
  overflow: hidden;
}
.banner {
  position: relative;
  width: 100%;
  height: 2rem;
  overflow: hidden;
}
.banner img {
  width: 100%;
  height: 2rem;
}
.main-wrapper {
  padding: 0 5%;
  width: 90%;
}
.notice-area {
  position: relative;
  height: 0.55rem;
  margin-top: 0.2rem;
  border: 0.02rem solid #ff6000;
  border-radius: 1rem;
}
.notice-icon {
  position: absolute;
  width: 8%;
  height: 0.3rem;
  top: 50%;
  left: 2%;
  margin-top: -0.15rem;
}
.notice {
  float: right;
  width: 85%;
  height: 100%;
  padding-right: 3%;
  font-size: 0.32rem;
}
.notice marquee {
  height: 100%;
  line-height: 0.55rem;
}
.funs {
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  justify-content: space-between;
}
.funs .fun {
  flex: 0 0 20%;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.funs .fun img {
  width: 1.1rem;
  height: 1.1rem;
}
.funs .fun p {
  font-size: 0.24rem;
}
</style>
