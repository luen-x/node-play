import { getBindProps } from '@util/util';
import { Drawer } from 'element-ui';

console.log(Drawer);

// 高阶组件包装一层Drawer
const hocDrawer = (comp) => {
	console.log('hoc');
	const defaultAttr = {
		modal: false
	};
	
	return {
		render(h) {
			const props = getBindProps(this);
			props.attr = { ...defaultAttr, ...props.attr };
			return h(comp, props);
		}

	};
    
};
export default hocDrawer(Drawer);