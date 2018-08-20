<template>
    <div class="notfound">
        <div class="_cus_ph20 _cus_textCenter" style="font-size: .28rem;">

            <inline-loading style="width:.6rem;height:.6rem;"></inline-loading><span style="vertical-align:middle;display:inline-block;">&nbsp;&nbsp;正在加载</span>
        </div>
    </div>
</template>
<script>
    import { InlineLoading } from 'vux'
    export default {
        components: {
            InlineLoading
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>
<style lang="less">
    .notfound{
        height: 100%;
        width: 100%;
        font-size: .28rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
