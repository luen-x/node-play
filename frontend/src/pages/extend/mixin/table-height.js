
import { debounce } from 'lodash';
// table高度自动调整
const PAGE_TITLE = 48; // 页面头部
const NAV1 = 47; // 一级导航
const TAB = 78; // tab 42 + margin-top 20 + margin-bottom 16
const FOOTER = 65; // footer 45 + margin-top 20
const EXTRA = 14; // 全局高度补正 

const MIN_HEIGHT = 230; // 最小高度

const getFilterHeight = (containerClass) => {
	let query = '.js-filter';
	if (containerClass) {
		query = '.' + containerClass + ' ' + query;
	}
	let node = document.querySelector(query);
	if (node) {
		return node.clientHeight; // expand 的margin-top
	} 
	return 0;
	
};
const getClientHeight = classArr => {
	let height = 0;
	classArr.forEach(cla => {
		let nodes = document.querySelectorAll('.' + cla);
		nodes.forEach(node => {
			height += node.clientHeight;
		});

	});
	return height;
};
export const tableHeight = (opts = { extra: 0 }) => {
	let pageTitle = opts.pageTitle === false ? 0 : PAGE_TITLE;
	let nav1 = opts.nav1 === false ? 0 : NAV1;
	let tab = opts.tab === false ? 0 : TAB;
	let footer = opts.footer === false ? 0 : FOOTER;
	let extra = EXTRA + (Number(opts.extra) || 0);
	let minHeight = opts.minHeight || MIN_HEIGHT;

	let containerClass = opts.containerClass; // 外层容器class
	let expand = (opts.expand !== false); // 是否有expand
	let extraClass = opts.extraClass || []; // 额外需要计算高度的元素的class

	return {
		data() {
			return {
				tableHeight: minHeight
			};
		},
		mounted() {
			setTimeout(() => {
				this.$nextTick(() => {
					this.updateTableHeight();
					window.addEventListener('resize', this.updateTableHeight);
					expand && this.$vc.on('filter-resize', this.updateTableHeightDelay);
				});
			}, 0);
		},
		updated() {
			setTimeout(() => {
				this.updateTableHeight();
			}, 0);
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.updateTableHeight);
			expand && this.$vc.off('filter-resize', this.updateTableHeightDelay);
		},
		methods: {
			updateTableHeight: debounce(function () {
				const windowHeight = document.body.clientHeight;
				const expandHeight = expand ? getFilterHeight(containerClass) : 0;
				const extraElementHeight = getClientHeight(extraClass);
				const height = windowHeight - pageTitle - nav1 - tab - footer - expandHeight - extraElementHeight - extra;
				this.tableHeight = height < minHeight ? minHeight : height;

			}, 100),
			updateTableHeightDelay: debounce(function () {
				this.updateTableHeight();
			}, 100),
		}
	};
};