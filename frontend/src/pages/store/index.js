import Vue from "vue";
import Vuex from "vuex";
import actions from "./action";
import mutations from "./mutations";
import modules from "./modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations,
	actions,
	modules
});
