<template>
  <div class="container">
    <h3>muti-views</h3>
    <router-view name="title"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
