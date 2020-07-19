<template>
	<div class="v-layout">
		<c-top-bar class="_layout-top-bar" />
		<div class="_layout-content"  >
			<c-left-nav class="_left-nav"/>
			<div class="_main-content">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import LeftNav from './nav/left-nav';
import TopBar from './nav/top-bar';

export default {
	name: "tpl",

	components: {
		'c-left-nav': LeftNav,
		'c-top-bar': TopBar
	},
};
</script>

<style lang="scss">
.v-layout {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	._layout-top-bar {
		flex: none;
	}
	._layout-content {
		flex: 1;
		height: 600px; // flex基数
		display: flex;
		background: #f9f9f9;
		._left-nav {
			flex: 0;

		}
		._main-content {
			flex: 1;
			width: 600px; // flex基数
			padding: 0 32px 0px 32px;
			overflow: auto;
			// &::-webkit-scrollbar {display:none}

		}
	}
}

</style>