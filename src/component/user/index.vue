<template>
    <div class="panel-body">
        <h3 class="text-danger">User,{{userId}}</h3>
    </div>
</template>

<script>
export default {
    mounted(){
        this.userId = this.$route.params.id;
    },
    data(){
        return {userId:''}
    },
    watch:{
        '$route'(to,from){
            this.userId= to.params.id;
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>



