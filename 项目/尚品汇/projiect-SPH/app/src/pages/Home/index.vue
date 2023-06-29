<template lang="">
    <div>
        <!-- 三级联动组件已经注册为全局组件,不需要再引入 -->
        <TypeNav />
        <ListContainer />
        <TodayRecommend />
        <Rank />
        <Like />
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
        <Brand />
    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex';

export default {
    name: 'Home',
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed: {
        ...mapState('home', ['floorList']),
    },
    methods: {

    },
    mounted() {
        //派发action,获取floor组件的数据,由于请求返回的是两个floor数据在一起的数组,所以要放在floor的父组件home中
        this.$store.dispatch('home/getFloorList')
    }
 }
</script>
<style lang="">

</style>