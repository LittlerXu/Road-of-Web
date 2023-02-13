<template>
    <!-- 编写组件标签 -->
   <div>
    <School></School>
    <Student></Student>
   </div>
</template>

<script>
//导包
import School from './School.vue'
import Student from './Student.vue'

export default {
    name: 'App',
    //注册组件
    components: {
        School,
        Student
    }
}
</script>

<style>

</style>