<template>
    <el-time-picker v-model="data" is-range v-bind="$attrs" value-format="HH:mm:ss" @change="handleChange"></el-time-picker>
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
        },
    },
    data() {
        return {
            data: [this.defaultStartValue, this.defaultEndValue]
        };
    },
    methods: {
        handleChange(val) {
            if(val) {
                this.$emit('input', [this.getUtc(val[0]), this.getUtc(val[1])]);
            } else {
                this.$emit('input', val);
            }
        },
        getUtc(val) {
            const hms = val.split(':');
            const date = new Date();
            date.setHours(hms[0]);
            date.setMinutes(hms[1]);
            date.setSeconds(hms[2]);
            date.setTime(date.getTime() - 8 * 60 * 60 * 1000);
            return fecha.format(date, 'HH:mm:ss');
        },
    },
    watch: {
        value(val) {
            this.data = val;
        }
    }
}
</script>
