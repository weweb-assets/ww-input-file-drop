<template>
    <div
        class="ww-input-file-drop"
        @click="openFileExplorer"
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)"
    >
        <wwLayout class="ww-input-file-drop__layout" path="layout" :states="isHover ? ['Drag'] : []" />
        <input
            ref="inputFile"
            :value="localValue"
            class="ww-input-file-drop__input"
            type="file"
            :name="wwElementState.name"
            :required="required"
            :multiple="content.multiple"
            :accept="accept"
            @input="handleManualInput($event)"
        />
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: null,
            componentType: 'element',
            type: 'file',
            readonly: true,
            resettable: true,
        });

        wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'progress',
            defaultValue: 0,
            componentType: 'element',
            type: 'number',
            readonly: true,
        });

        return { variableValue, setValue };
    },
    data() {
        return {
            isHover: false,
        };
    },
    computed: {
        required() {
            console.log(this.variableValue);
            return this.content.required && !this.variableValue;
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value() {
            return this.variableValue;
        },
        accept() {
            switch (this.content.accept) {
                case 'image':
                    return 'image/*';
                case 'video':
                    return 'video/*';
                case 'audio':
                    return 'audio/*';
                case 'pdf':
                    return '.pdf';
                case 'csv':
                    return '.csv';
                case 'excel':
                    return '.xls,.xlsb,.xlsm,.xlsx';
                case 'word':
                    return '.doc,.docm,.docx';
                case 'json':
                    return '.json';
                case 'custom':
                    return this.content.acceptCustom;
                case 'any':
                default:
                    return '';
            }
        },
    },
    watch: {
        isHover(value) {
            this.$emit(value ? 'add-state' : 'remove-state', 'Drag');
        },
    },
    methods: {
        dragOver() {
            this.isHover = true;
        },
        dragLeave() {
            this.isHover = false;
        },
        drop(event) {
            this.isHover = false;
            const input = event.dataTransfer;
            if (!input) return;
            const files = [...input.files].filter(
                file => !!this.accept.split(/[\.\W]/g).find(type => type && file.type.includes(type))
            );
            this.handleFiles(event, files);
        },
        handleManualInput(event) {
            this.handleFiles(event, [...this.$refs['inputFile'].files]);
        },
        handleFiles(event, files) {
            if (!files || !files.length) return;
            const isMultiple = this.content.multiple;
            this.setValue(isMultiple ? files : files[0]);
            this.$emit('trigger-event', {
                name: 'change',
                event: { domEvent: event, value: isMultiple ? files : files[0] },
            });
        },
        openFileExplorer() {
            if (this.isEditing) return;
            this.$refs['inputFile'].click();
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-file-drop {
    display: flex;
    align-items: center;
    width: 100%;
    &__layout {
        width: 100%;
    }
    &__input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
}
</style>
