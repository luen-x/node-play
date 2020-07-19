const initialState = {
	windowWidth: 0,
	windowHeight: 0,
};
const mutations = {
	WINDOW_RESIZE(state, payload) {
		state.count++;
	}
};

const module = {
	state: initialState,
	mutations
	// actions: { ... },
	// getters: { ... }
};
export default module;
