<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import homeHeader from '@/components/home-header/home-header'
import homeFooter from '@/components/home-footer/home-footer'

export default {
  name: 'app',
  components: {
    homeHeader,
    homeFooter
  }
}
</script>
