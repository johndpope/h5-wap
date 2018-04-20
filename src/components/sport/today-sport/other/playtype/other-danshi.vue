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
      getSportUrl: '/api/app/member/show/json/other.php',
      typetitle: '今日-其他-单式',
      ballsort: '其他单式',
      linkArr: ['/sport/zqgq', '/sport/jrqtds', '/sport/zpqtds']
    }
  },
  components: {
    sportHomeHead,
    basketBall,
    homeFooter
  }
}
</script>
