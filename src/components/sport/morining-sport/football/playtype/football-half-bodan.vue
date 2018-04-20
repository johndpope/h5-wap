<template>
  <div>
    <sport-home-head :typetitle="typetitle" :linkArr="linkArr"></sport-home-head>
    <sport-bodan :getSportUrl="getSportUrl" :ballsort="ballsort" :typetitle="typetitle"></sport-bodan>
    <home-footer></home-footer>
  </div>
</template>

<script>
import sportHomeHead from '@/components/sport/sport-home-head/sport-home-head'
import homeFooter from '@/components/home-footer/home-footer'
import sportBodan from '@/components/sport/sport-common-modules/football-half-bodan'
export default {
  data () {
    return {
      getSportUrl: '/api/app/member/show/json/ft_2_5.php',
      typetitle: '早盘-足球-上半场波胆',
      ballsort: '足球早餐',
      linkArr: ['/sport/zqgq', '/sport/jrzqhalfbd', '/sport/zpzqhalfbd']
    }
  },
  components: {
    sportHomeHead,
    sportBodan,
    homeFooter
  }
}
</script>
