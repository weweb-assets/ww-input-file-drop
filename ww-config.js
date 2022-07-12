export default {
    editor: {
        label: 'Input File Drop',
        icon: 'files',
        bubble: { icon: 'files' },
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' } },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        layout: {
            hidden: true,
            defaultValue: [],
        },
        multiple: {
            label: 'Multiple',
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        required: {
            label: 'Required',
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
        },
        accept: {
            label: 'Extensions',
            type: 'TextSelect',
            options: {
                options: [
                    { label: 'Any', value: 'any' },
                    { label: 'Image', value: 'image' },
                    { label: 'Video', value: 'video' },
                    { label: 'Audio', value: 'audio' },
                    { label: 'PDF', value: 'pdf' },
                    { label: 'CSV', value: 'csv' },
                    { label: 'Excel file', value: 'xls' },
                    { label: 'Word file', value: 'doc' },
                    { label: 'JSON', value: 'json' },
                    { label: 'Custom', value: 'custom' },
                ],
            },
            section: 'settings',
            defaultValue: 'any',
        },
        acceptCustom: {
            type: 'Text',
            options: { placeholder: '.html, .xml, .pt' },
            section: 'settings',
            hidden: content => content.accept !== 'custom',
            defaultValue: '',
        },
    },
};
