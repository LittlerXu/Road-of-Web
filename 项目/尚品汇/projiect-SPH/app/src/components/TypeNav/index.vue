<template>
    <!-- 三级联动全局组件 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseenter="enterShow" @mouseleave="leaveShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委托+编程式导航实现路由的跳转和传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级分类 -->
                            <div class="item" @mouseenter="changeIndex(index)"
                                v-for='(c1, index) in categoryList.slice(0, 15)' :key='c1.categoryId'
                                :class="{ cur: index === currentIndex }">
                                <h3>
                                    <a :data-category-name="c1.categoryName" :data-category1-id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 二级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex === index ? 'block' : 'none' }">
                                    <div class="subitem" v-for='(c2, index) in c1.categoryChild.slice(0, 9)'
                                        :key='c2.categoryId'>
                                        <dl class="fore">
                                            <dt>
                                                <a :data-category-name="c2.categoryName"
                                                    :data-category2-id="c2.categoryId">{{
                                                        c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for='(c3, index) in c2.categoryChild' :key="c3.categoryId">
                                                    <a :data-category-name="c3.categoryName"
                                                        :data-category3-id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//按需引入throttle节流函数
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            //控制一级分类菜单的现实与隐藏
            show: true
        }
    },
    methods: {
        //使用节流函数throttle
        //注意: throttle中的回调函数别使用箭头函数,可能出现this指向问题
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        goSearch(event) {
            let { dataset } = event.target
            let { categoryName, category1Id, category2Id, category3Id } = dataset
            let location = { name: 'search' }
            let query = { categoryName }

            if (categoryName) {
                if (category1Id) {
                    query.category1Id = category1Id
                } else if (category2Id) {
                    query.category2Id = category2Id
                } else {
                    query.category3Id = category3Id
                }
                //如果跳转时带有params参数,则需要携带params参数,没有则为空 
                location.params = this.$route.params
                //合并location和query
                location.query = query
                //路由跳转
                this.$router.push(location)
            }

        },
        enterShow() {
            this.show = true
        },
        leaveShow() {
            this.currentIndex = -1
            //如果是在home组件中,则鼠标移出不会使一级分类菜单隐藏
            if (this.$route.path != '/home') {
                this.show = false
            }
        }
    },
    computed: {
        ...mapState('home', ['categoryList'])
    },
    mounted() {
        //如果不是home组件,则将一级分类菜单进行隐藏
        if (this.$route.path != '/home') {
            this.show = false
        }
    }

}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    //用js控制二级菜单的现实与隐藏
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .item.cur {
                    background-color: skyblue;
                }
            }
        }

        //过渡动画样式
        .sort-enter,
        .sort-leave-to {
            height: 0;
        }

        .sort-enter-active,
        .sort-leave-active {
            transition: all 0.25s linear;
            overflow: hidden;
        }
    }
}
</style>