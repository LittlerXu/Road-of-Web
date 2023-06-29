<template>
    <div class="swiper-container" id="floor1Swiper" ref="floorCarousel">
        <div class="swiper-wrapper">
            <!-- 轮播图图片,需要遍历 -->
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            //由于监听的属性是props中属性, 所以需要开启immediate
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.floorCarousel, {
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    },
}
</script>

<style lang="less" scoped></style>