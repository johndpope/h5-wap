<template>
  <div>
    <sport-home-head :typetitle="typetitle" :linkArr="linkArr"></sport-home-head>
    <basket-ball :getSportUrl="getSportUrl" :ballsort="ballsort" :typetitle="typetitle"></basket-ball>
    <home-footer></home-footer>
  </div>
</template>

<script>
import sportHomeHead from '@/components/sport/sport-home-head/sport-home-head'
import homeFooter from '@/components/home-footer/home-footer'
import basketBall from '@/components/sport/sport-common-modules/basketball-danshi'
export default {
  data () {
    return {
      getSportUrl: '/api/app/member/show/json/bk_1_1.php',
      typetitle: '今日-篮球-单式',
      ballsort: '篮球单式',
      linkArr: ['/sport/lqgq', '/sport/jrlqds', '/sport/zplqds']
    }
  },
  components: {
    sportHomeHead,
    basketBall,
    homeFooter
  }
}
</script>
