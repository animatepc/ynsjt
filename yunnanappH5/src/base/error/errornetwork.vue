<template>
    <div class="errornetwork perW100 perH100">
        <div class="network_box" @click="errorBox">
            <img src="../../../static/imgs/error.png" alt="">
            <p class="error_text">加载失败，点击页面重新加载</p>
        </div>
       
    </div>
</template>
<script>
    export default {
        methods:{
            errorBox(){
                this.$emit('handlerError','error')
            }
        }
    }
</script>
<style lang="less">
    .errornetwork{
        height: 100%;
        background-color: #eee;
        text-align: center;
        z-index: 3000;
        position: fixed;
        top: 0;
        left: 0;
        .network_box{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .error_text{
            margin-top: .5rem;
            font-size: .32rem;
        }
    }
</style>


