<template>
    <el-date-picker v-model="data" v-bind="$attrs" type="datetime" @change="handleChange"></el-date-picker>
</template>

<script>
import fecha from 'element-ui/lib/utils/date';

export default {
    props: {
        isUtc: {
            type: Boolean,
            default: false,
        },
        value: Object,
        defaultValue: {
            type: String
        }
    },
    data() {
        return {
            data: this.defaultValue
        };
    },
    methods: {
        getClientTimezone(){  
            var oDate = new Date();
            var nTimezone = -oDate.getTimezoneOffset() / 60;
            return parseInt(nTimezone);
        },
        handleChange(val) {
            console.log(this);
            const format = this.$attrs.params.valueFormat;
            let date;
            if(val instanceof Date) {
                date = val;
            } else {
                date = fecha.parse(val, format);
            }
            if(this.getClientTimezone() === 0) {
                this.$emit('input', val);
            } else {
                date.setTime(date.getTime() - 8 * 60 * 60 * 1000);
                this.$emit('input', fecha.format(date, format));
            }
        },
    },
    watch: {
        value(val) {
            this.data = val;
        }
    }
}
</script>
