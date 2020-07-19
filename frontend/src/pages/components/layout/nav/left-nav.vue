<template>
	<div class="c-nav-left">
		<div
			v-for="(menu,index) in menus" 
			:key="index"
			:class="{_active:curMenuIndex===index}"
			class="_nav-menu-item"
			@click="handleLinkTo(menu.route)"
		>
			{{menu.name}}
		</div>
	</div>
</template>
<script>
import getChunk from '../menu/getChunk';
export default {
	name: 'c-nav-left',
	components: {
	},
	data() {
		return {
			menus: getChunk(),
		};
	},
	computed: {
		curMenuIndex(){
			const curRoute = '/' + this.$route.path.split('/')[1];
			const index = this.menus.findIndex(menu => menu.route === curRoute);
			return index;			
		}

	},
	methods: {
		handleLinkTo(path){
			// this.$router.push(path);
			const chs = getChunk({}, path);

			if (chs[0] && this.$route.path !== chs[0].route){
				this.$router.push(chs[0].route);
			}
		}

	}
};
</script>
<style lang="scss">
.c-nav-left {
	background-color: white;
	padding:24px 0;
	box-shadow: 2px 0 12px 0 rgba(0,0,0,0.10);
	._nav-menu-item {
		width: 240px;
		padding-left: 32px;
		padding-right: 20px;
		height: 44px;
		line-height: 44px;
		font-size: 14px;
		color: #3a3a3a;
		cursor: pointer;
		&._active {
			background: linear-gradient(to right,rgba(0, 103, 255,.5) , rgba(87, 174, 255,.5));
			color: #0048ff;
			&:hover {
				background: linear-gradient(to right,rgba(0, 103, 255,.5) , rgba(87, 174, 255,.5));
			}
		}
		&:hover {
			background: #E0E0E0
		}
	}

}
</style>