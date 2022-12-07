<template>
    <el-date-picker v-model="data" v-bind="$attrs" type="datetimerange" @change="handleChange"></el-date-picker>
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
        defaultStartValue: {
            type: String
        },
        defaultEndValue: {
            type: String
        }
    },
    data() {
        return {
            data: [this.defaultStartValue, this.defaultEndValue]
        };
    },
    methods: {
        getClientTimezone(){  
            var oDate = new Date();
            var nTimezone = -oDate.getTimezoneOffset() / 60;
            return parseInt(nTimezone);
        },
        handleChange(val) {
            const format = this.$attrs.params.valueFormat;
            this.$emit('input', [this.getUtc(val[0], format), this.getUtc(val[1], format)]);
        },
        getUtc(val, format) {
            try {
                let date;
                if(val instanceof Date) {
                    date = val;
                } else {
                    date = fecha.parse(val, format);
                }
                console.log(date);
                if(this.getClientTimezone() === 0) {
                    return val;
                }
                date.setTime(date.getTime() - 8 * 60 * 60 * 1000);
                console.log(date);
                return fecha.format(date, format);
            } catch(e) {
                console.error(e);
            }
        }
    },
    watch: {
        value(val) {
            this.data = val;
        }
    }
}
</script>
