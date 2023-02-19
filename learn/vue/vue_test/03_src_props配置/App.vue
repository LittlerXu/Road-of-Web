<template>
	<div>
		<!-- 给属性前面加":"可以使传入的"18"为数字类型而非字符串类型,因为此时""中的内容视为表达式 -->
		<Student name="李四" sex="女" :age="18"/>
	</div>
</template>

<script>
	import Student from './components/Student'

	export default {
		name:'App',
		components:{Student}
	}
</script>
