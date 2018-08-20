<template>
    <div class="search">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="search_back"></span>
            <div class="colorfff _cus_flex1 _cus_posRelative _cus_overHidden search_box">
                <span class="_cus_posAbsolute search_icon"></span>
                <input type="text" class="_cus_posAbsolute search_mode" placeholder="输入搜索词">
            </div>
            <div class="colorfff search_city _cus_overHidden">
                <span>搜索</span>
            </div>
        </div>
        <!-- 搜索内容 -->
        <div class="search_content">

        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            search_back(){
                this.$router.push({
                    'path':'/'
                })
            }
        }
    }
</script>
<style lang="less" src="./searchVal.less">

</style>

