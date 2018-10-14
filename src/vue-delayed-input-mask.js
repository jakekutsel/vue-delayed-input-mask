import VueDelayedInputMask from './VueDelayedInputMask.vue'

export default {
    ...VueDelayedInputMask,
    install: (Vue) => {
        Vue.component(VueDelayedInputMask.name, VueDelayedInputMask);
        return Vue;
    },
};