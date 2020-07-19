<template>
	<div  class="c-footer" >
		<slot/>
		
	</div>
</template>
<script>
export default {
	name: 'comp-footer',
	components: {
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
.c-footer {
    display: flex;
    align-items: center;
    padding-left: 32px;
    height:60px;
    border-top: 1px solid #eee;
    flex-shrink: 0;
}
</style>