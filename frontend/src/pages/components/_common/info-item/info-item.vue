<template>
	<div class="c-info-block" :style="{width:width}">
		<div class="_info-block__label g-c-black-12" :style="{width:labelWidth}" >
			{{label}}
		</div>
		<div class="_info-block__content g-c-black-6">
			<slot>
				{{content || '--'}}
			</slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'comp-info-item',
    
	components: {
	},
	props: {
		label: String,
		content: [String, Number],
		tooltip: Boolean,
		width: {
			type: String,
			default: '',
		},

		labelWidth: {
			type: String,
			default: "100px"
		}

	},
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>
<style lang="scss">
.c-info-block{
    display: flex;
    ._info-block__label {
        flex-shrink: 0;
    }
     ._info-block__content {
        flex:1
    }
    border-bottom: 1px solid #eee;
    margin-bottom: 12px;
    margin-top: 8px;
    line-height: 16px;
    padding-bottom: 8px;

}
</style>