<script>
    import _ from "lodash";

    const HIDE_DELAY = 800;
    const FILL_CHAR = "*";
    const EMPTY_STRING = "";
    const ENTER_KEY_CODE = 13;

    export default {
        name: "VueDelayedInputMask",
        props: {
            id: {
                type: String,
            },
            value: {
                type: String,
                default: () => {
                    return EMPTY_STRING;
                },
            },
            name: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                default: () => {
                    return EMPTY_STRING;
                },
            },
            wrapperClassName: {
                type: String,
            },
            classNames: {
                type: Array,
                default: () => {
                    return [];
                },
            },
            delayTime: {
                default: () => {
                    return HIDE_DELAY;
                },
            },
            fillChar: {
                type: String,
                default: () => {
                    return FILL_CHAR;
                },
            },
            needClearOnFocus: {
                type: Boolean,
                default: false,
            },
            needFillOnBlur: {
                type: Boolean,
                default: true,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            keyEnter: {
                type: Function,
                default: () => {},
            },
            hideFieldType: {
                type: String,
                default: "hidden",
            },
        },
        data() {
            return {
                input: EMPTY_STRING,
                clear: this.value,
            };
        },
        created() {
            this.$on("fillInput", payload => {
                let filling = _.throttle(this.__fillPattern, this.delayTime, { leading: false });
                filling(payload.$event, payload.i);
            });
        },
        methods: {
            /**
             * Handle input into password input
             * @param $event
             * @private
             */
            __inputHandler($event) {
                if ($event.keyCode === ENTER_KEY_CODE) {
                    this.keyEnter();
                }
                if (!this.__isSpecialKey($event.keyCode)) {
                    this.__computeInputData($event);
                }
            },
            /**
             * Check insert position and add new chart (inputed or copy-pasted into input)
             * @param $event
             * @param value
             * @private
             */
            __computeInputData($event, value = false) {
                let selectIndex = $event.target.selectionStart;
                let inputValues = value ? value : $event.target.value;
                let realValue = $event.target.value;
                let shift = inputValues.length - this.clear.length;

                if (shift > 0) {
                    let addedChars = realValue.slice(selectIndex - shift, selectIndex);
                    this.clear =
                        this.clear.slice(0, selectIndex - shift) + addedChars + this.clear.slice(selectIndex - shift);
                } else if (shift < 0) {
                    this.clear = this.clear.slice(0, selectIndex) + this.clear.slice(selectIndex - shift);
                }
                this.$emit("fillInput", { $event, selectIndex });
            },
            /**
             * Handle paste event and call compute method
             * @param $event
             * @private
             */
            __copyPasteHandler($event) {
                this.__computeInputData($event, $event.clipboardData.getData("text"));
            },
            /**
             * Clear inputs
             * @private
             */
            __clearOnFocus() {
                this.$set(this, "input", EMPTY_STRING);
                this.$set(this, "clear", EMPTY_STRING);
            },
            /**
             * Fill field chars by symbol from props
             */
            __fillPattern($event = false, i = false) {
                this.$set(this, "input", this.fillChar.repeat(this.input.length));
                setTimeout(() => {
                    $event.target.setSelectionRange(i ? i : this.input.length, i ? i : this.input.length);
                }, 0);
            },
            /**
             * Check Ctrl, Enter, Shift and other keys
             * @param keyCode
             * @returns {boolean}
             * @private
             */
            __isSpecialKey(keyCode) {
                return (keyCode >= 9 && keyCode <= 20) || (keyCode >= 33 && keyCode <= 40) || keyCode === 224;
            },
            /**
             * Wrap
             * @param $event
             * @param fieldPath
             * @private
             */
            __inputProxy($event, fieldPath) {
                this.$set(this, fieldPath, $event.target.value);
            },
        },
        watch: {
            clear(data) {
                this.$emit("input", data);
            },
        },
        render(h) {
            let visibleInput = h("input", {
                class: this.classNames,
                attrs: {
                    id: this.id ? this.id : null,
                    name: this.name,
                    placeholder: this.placeholder,
                },
                domProps: {
                    value: this.input,
                    disabled: this.disabled,
                },
                on: {
                    input: $event => {
                        this.__inputHandler($event);
                        this.__inputProxy($event, "input");
                        $event.preventDefault();
                    },
                    focus: $event => {
                        this.needClearOnFocus ? this.__clearOnFocus() : null;
                    },
                    blur: $event => {
                        this.needFillOnBlur ? this.__fillPattern($event) : null;
                    },
                    paste: $event => {
                        this.__copyPasteHandler($event);
                    },
                },
            });
            let hiddenInput = h("input", {
                attrs: { type: this.hideFieldType, hidden: true },
            });
            return h("div", { class: { [this.wrapClassName]: true } }, [
                visibleInput,
                hiddenInput,
                this.$slots.additional ? this.$slots.additional : null,
                this.$slots.error ? this.$slots.error : null,
            ]);
        },
    };
</script>
