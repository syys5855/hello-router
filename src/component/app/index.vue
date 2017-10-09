<template>
  <div class="container">
    <h3>我是app的标题啊</h3>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    mounted(){
      console.log('mounted--->');
    },
    beforeRouteEnter: (to, from, next) => {
      console.log('enter',to);
      // {path:'pathname',...}
      next(vm=>{
        console.log(vm);
      })
    },
    beforeRouteUpdate:(to,from,next)=>{
      console.log('update');
      next();
    },
    beforeRouteLeave: (to, from, next) => {
      console.log('leave');
      // next(false) 阻止页面离开
      next();
    }
  } 
</script>