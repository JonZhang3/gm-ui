<template>
    <el-time-picker v-model="data" v-bind="$attrs" value-format="HH:mm:ss" @change="handleChange"></el-time-picker>
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
        handleChange(val) {
            console.log(val);
            if(val) {
                const hms = val.split(':');
                const date = new Date();
                date.setHours(hms[0]);
                date.setMinutes(hms[1]);
                date.setSeconds(hms[2]);
                date.setTime(date.getTime() - 8 * 60 * 60 * 1000);
                console.log(date);
                this.$emit('input', fecha.format(date, 'HH:mm:ss'));
            } else {
                this.$emit('input', val);
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
