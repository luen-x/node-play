<template>
	<div class="c-base-view">
		<el-breadcrumb
			v-if="routes && routes.length"
			separator="/" 
			class="g-m-tb-16"
		>
			<el-breadcrumb-item v-for="(item,index) in routes" :to="item" :key="index">{{item.title}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div v-else style="height:32px" />
		<div v-if="showTitle" class="g-m-b-16 g-fs-16 g-c-black-12">
			<i v-if="showBackArrow" class="iconfont icon-back"/><span>{{title}}</span>
		</div>
		<div class="_view-content">
			<slot/>
		</div>
	</div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui';
export default {
	name: "base-view",
	props: {
		title: String,
		showBackArrow: Boolean,
		showTitle: {
			type: Boolean,
			default: true
		},
		routes: {
			type: Array,
			// default: () => [{ path: '/', title: '首页' }]
		}
	},
	components: {
		'el-breadcrumb': Breadcrumb,
		'el-breadcrumb-item': BreadcrumbItem

	},
	watch: {
		title: {
			immediate: true,
			handler(val){
				document.title = val || window.location.host;
			}
		},
	}

};
</script>

<style lang="scss">
.c-base-view {
	._view-content {
		background: white;
		padding: 20px;
		border-radius: 10px;
	}

}

</style>