<template>
	<div class="c-top-bar">
		<div class="g-ai-c">
			<img src="@assets/logo.png" alt="R" style="width:26px"/>
			<span class="g-fs-20 g-m-l-10">Lawrence<span class="g-fs-14 g-m-l-4">中后台</span></span>
		</div>
		<div class="g-ai-c">
			<!-- <span class="g-m-r-8">通知</span>
			<span class="g-m-r-8">设置</span>
			<span class="g-m-r-8">头像</span> -->
		</div>
	</div>
</template>
<script>
import getChunk from '../menu/getChunk';
export default {
	name: 'c-top-bar',
	components: {
	},
	data() {
		return {
		};
	},
	computed: {

	},
	methods: {

	}
};
</script>
<style lang="scss">
.c-top-bar {
	display: flex;
	justify-content:space-between;
	background: linear-gradient(to right,#0048FF , #6691FF);
	height: 48px;
	padding: 8px 20px;
	color: white;

}
</style>