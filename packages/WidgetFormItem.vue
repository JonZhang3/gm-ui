<template>
    <div>
        <span v-if="item.type == 'title'"
                :style="item.styles"
                style="margin-left: 5px;">
            {{ item.value }}
        </span>
        <component v-else
                   :is="getComponent(item.type, item.component)"
                   v-bind="Object.assign(deepClone(item), params, { size:item.size || 'small' })"
                   :multiple="false"
                   :placeholder="item.placeholder || getPlaceholder(item)"
                   :dic="item.dicData"
                   :value="['time', 'timerange', 'checkbox'].includes(item.type) ? item.dicData: undefined">
            <span v-if="params.html" v-html="params.html"></span>
        </component>
    </div>
</template>
<script>

import deepClone from "deep-clone";

export default {
    name: 'widget-form-item',
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        params: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        deepClone(obj) {
            return deepClone(obj);
        },
        getComponent(type, component) {
            let KEY_COMPONENT_NAME = 'avue-';
            let result = 'input';
            if (component) return component
            else if (['array', 'img', 'url'].includes(type)) result = 'array';
            else if (type === 'select') result = 'select';
            else if (type === 'radio') result = 'radio';
            else if (type === 'checkbox') result = 'checkbox';
            else if (['time', 'timerange'].includes(type)) result = 'time';
            else if (['dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year'].includes(type))
                result = 'date';
            else if (type === 'cascader') result = 'cascader';
            else if (type === 'number') result = 'input-number';
            else if (type === 'password') result = 'input';
            else if (type === 'switch') result = 'switch';
            else if (type === 'rate') result = 'rate';
            else if (type === 'upload') result = 'upload';
            else if (type === 'slider') result = 'slider';
            else if (type === 'dynamic') result = 'dynamic';
            else if (type === 'icon') result = 'input-icon';
            else if (type === 'color') result = 'input-color';
            else if (type === 'map') result = 'input-map';
            return KEY_COMPONENT_NAME + result;
        },
        getPlaceholder(item) {
            const label = item.label;
            if (['select', 'checkbox', 'radio', 'tree', 'color', 'dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year', 'map', 'icon'].includes(item.type))
                return `请选择 ${label}`;
            else return `请输入 ${label}`;
        },
    }
}
</script>
