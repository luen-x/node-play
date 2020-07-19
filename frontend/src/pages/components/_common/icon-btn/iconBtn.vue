<template>
	<el-tooltip
		v-if="tooltip"
		effect="dark"
		:content="tooltip"
		placement="bottom"
	>
		<i class="c-icon-btn iconfont" :class="{_disabled:disabled,[icon]:true}" @click="handleClick" />
	</el-tooltip>
	<i v-else class="c-icon-btn iconfont" :class="{_disabled:disabled,[icon]:true}" @click="handleClick" />
</template>
<script>
import { Tooltip } from 'element-ui';

export default {
	name: 'c-icon-btn',

	props: {
		icon: String,
		disabled: Boolean,
		tooltip: String

	},
	components: {
		'el-tooltip': Tooltip
	},
	data() {
        
		return {

		};
	},
	methods: {
		handleClick(){
			if (!this.disabled){
				this.$emit('click', window.event);
			}
		}
	}
};
</script>
<style lang="scss">
.c-icon-btn {
	display: inline-block;
    padding: 5px 8px;
    margin: 4px;
    font-size: 12px;
    color: #8c8c8c;
    cursor: pointer;
    border-radius: 4px;
	outline: none;
	&:active {
		background: #121212;
	}
	&._disabled {
		cursor: not-allowed;
		&:active {
			background: transparent;
		}
	}
	
}
</style>