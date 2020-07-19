/* eslint-disable no-new */
// createPortal
import Vue from 'vue';
import { aliveRegExp } from '@constants/constants';

const removeNode = (instance, delay = 500) => {
	if (instance.visible) instance.visible = false;
	setTimeout(() => {
		if (document.body.contains(instance.$el)) {
			document.body.removeChild(instance.$el);
			instance.$destroy();
		}
		
	}, delay);

};
const eleInRegExp = (el, exceptions) => {
	for (let i in exceptions) {
		if (exceptions[i].test(el[i])) {
			return true;
		}
	}
	return false;
};

const instances = {

};
export class Portal {
	constructor(Component, option) {
		if (!Component) throw new Error('portal 的 Component 必传');
		if (!Component.name) throw new Error('portal 的 Component.name 必传');
		this.Component = Component;

	}
	popup(option = {}) {
		const { getPortal } = option;
		if (instances[this.Component.name]) {

			const { instance, promise, reject } = instances[this.Component.name];
			// reject();
			instances[this.Component.name].promise = new Promise((rs, rj) => {
				
				Object.keys(option).forEach(key => {
					instance[key] = option[key];
				});
				instance.$off('close');
				instance.$off('sure');
				const portal = this.addListener(instance, this.Component.name, rs, rj);
				if (getPortal) getPortal(portal);
				instances[this.Component.name].portal = portal;
				instances[this.Component.name].reject = rj;

			});

			return instances[this.Component.name].promise;
		} 
		console.log(11);
		const promise = new Promise((resolve, reject) => {
			const VueComponent = Vue.extend({
				...this.Component,
			});
			const instance = new VueComponent({ store: window.app.$store, router: window.app.$router, propsData: option });
			const portal = this.addListener(instance, this.Component.name, resolve, reject);
			console.log(22);

			// 处理document点击关闭弹窗
			const handleClickDocument = e => {
				console.log('88');
				try {
					let path = e.path || (e.composedPath && e.composedPath()) || [];
					if (
						!instance.$el.contains(e.target) 
							&& !path.some(item => eleInRegExp(item, aliveRegExp))
					) {
						// if (this.$children[0] && this.$children[0][aliveKey]) {
						// 	this.$children[0][aliveKey] = false;
						// 	setTimeout(() => this.$emit('close'), 500);
						// } else {
						portal.close();
						// instalce.$emit('close');
						// }
					}
				} catch (e) {
					console.error(e);
				}
			};
			instance.$on('hook:mounted', () => {
				window.addEventListener('click', handleClickDocument, true);
			});
			instance.$on('hook:beforeDestroy', () => {
				window.removeEventListener('click', handleClickDocument, true);
				removeNode(instance);
			});
			console.log(33, instance);
			const target = document.createElement("span");
			document.body.appendChild(target);
			instance.$mount(target);
			if (getPortal) getPortal(portal);
			console.log(44);
			instances[this.Component.name] = { instance, promise, reject };
		});

		return instances[this.Component.name].promise = promise;
		
	}
	addListener(instance, name, resolve, reject) {
		const portal = {
			instance,
			close: (res) => {
				reject(res);
				delete instances[name];
				removeNode(instance);
			},
			sure: (res) => {
				resolve(res);
				delete instances[name];
				removeNode(instance);
			}
		};
		instance.$on('close', portal.close);
		instance.$on('sure', portal.sure);
		return portal;

	}

}