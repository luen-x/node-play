import Vue from "vue";

import { emitter } from '@util/util';
import httpPlugin from '@util/http';
import { message, Input, InputNumber, Button, Form, FormItem, Select, Option,
	 Radio, RadioGroup, Checkbox, CheckboxGroup, Dialog, Drawer, DatePicker, Loading, Tabs, TabPane } from 'element-ui';
import { confirm } from '@common/confirm/confirm';
import global from './pages/global/global'; 

import router from "./pages/router/router";
import store from "./pages/store/index";
import BaseView from '@common/base-view';

import '@lawrence666/le-sass';
import './css/index.scss';

Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Drawer);
Vue.use(DatePicker);
Vue.use(Loading.directive);

Vue.use(httpPlugin);

Vue.prototype.$vc = emitter;
Vue.prototype.$global = global;
Vue.config.productionTip = true;
Vue.prototype.$message = message;
Vue.prototype.$loading = Loading;
Vue.prototype.$ELEMENT = { size: 'medium' }; // { size: 'medium' };
Vue.prototype.$confirm = confirm;

Vue.config.devtools = true;

Vue.component('base-view', BaseView);

// Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	render(h) {
		return (
			<div id="app">
				<router-view></router-view>
			</div>
		);
	}
	// render: h => h(Layout)
}).$mount("#app");
window.app = app;

