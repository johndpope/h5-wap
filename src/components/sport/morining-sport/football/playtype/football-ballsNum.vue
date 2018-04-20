<template>
  <div>
    <sport-home-head :typetitle="typetitle" :linkArr="linkArr"></sport-home-head>
    <sport-balls-num :getSportUrl="getSportUrl" :ballsort="ballsort" :typetitle="typetitle"></sport-balls-num>
    <home-footer></home-footer>
  </div>
</template>

<script>
import sportHomeHead from '@/components/sport/sport-home-head/sport-home-head'
import homeFooter from '@/components/home-footer/home-footer'
import sportBallsNum from '@/components/sport/sport-common-modules/football-ballsNum'
export default {
  data () {
    return {
      getSportUrl: '/api/app/member/show/json/ft_2_2.php',
      typetitle: '早盘-足球-入球数',
      ballsort: '足球早餐',
      linkArr: ['/sport/zqgq·', '/sport/jrzqrqs', '/sport/zpzqrqs']
    }
  },
  components: {
    sportHomeHead,
    sportBallsNum,
    homeFooter
  }
}
</script>
