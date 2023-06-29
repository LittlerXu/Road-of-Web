<template>
    <div class="pagination">
        <!-- 左 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <!-- 连续页码 -->
        <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">{{ page
        }}</button>

        <!-- 右 -->
        <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
        <button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <button :disabled="pageNo== totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        //总共多少页
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },

        //计算出连续页码的起始与结束页码
        startNumAndEndNum() {
            //将必要参数结构,简化书写
            const { continues, pageNo, totalPage } = this;
            let start = 0, end = 0;

            //特殊情况:当页码总数小于连续页码数
            if (totalPage < continues) {
                start = 1;
                end = totalPage;
            }
            //正常情况:页码总数大于等于连续页码数
            else {
                //起始页码
                start = pageNo - parseInt(continues / 2);
                //结束页码
                end = pageNo + parseInt(continues / 2);

                //处理特殊情况:pageNo为第一二页或者倒数一二页时,计算得到的start或end会发生错误

                //pageNo为第一二页时start<1
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                //pageNo为倒数一二页时start>totalPage
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return { start, end }
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>

