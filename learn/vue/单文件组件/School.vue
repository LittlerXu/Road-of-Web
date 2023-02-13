<template>
  <div class="demo">
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址:{{ address }}</h2>
    <button @click="alertSchoolName">点我提示学校名称</button>
  </div>
</template>

<script>
export default {
    name: "School",
    data() {
        return {
            name: '贵州大学',
            address: '花溪区'
        }
    },
    methods: {
        alertSchoolName() {
            alert(this.name)
        }
    }
}
</script>

<style>
    .demo {
        background-color: orange;
    }
</style>