<template>
    <div style="padding: 10px 0 10px 10px">
        <div v-html="pageRemark" style="font-size: 14px;padding-bottom: 10px;"></div>
        <div>
            <avue-form ref="form" v-model="obj" :option="formOptions" @reset-change="handleReset"
                       @submit="handleSubmit">
            </avue-form>
        </div>
        <div style="margin-top: 10px">
            <el-table v-if="resultViewType === 'table'" :data="resultTableData" size="small">
                <el-table-column v-for="p in resultTableHeaders" :label="p" :prop="p" :key="p"></el-table-column>
            </el-table>
            <div v-else-if="resultViewType === 'text'">{{ resultViewText }}</div>
        </div>
    </div>
</template>

<script>

import request from "../../common/request";
import {handleDateChange} from '../../common/utils';

export default {
    name: 'app',
    data() {
        return {
            pageRemark: window.Metadata.model.m.pageRemark,
            obj: {},
            formOptions: JSON.parse(window.Metadata.model.m.queryFormContent, (key, value) => {
                if(key === 'change' && value === 'handleDateChange') {
                    return handleDateChange;
                }
                return value;
            }),
            resultViewType: 'table',// table or text
            resultViewText: '',
            resultTableHeaders: [],
            resultTableData: [],
        }
    },
    methods: {
        handleReset() {

        },
        handleSubmit(form, done) {
            const title = window.$title || '';
            if(window.confirm(title +  (title ? '\n\n是否确定执行操作？' : '是否确定执行操作？'))) {
                request.post('/customerService/doSubmitJson', {
                    jsonData: JSON.stringify({
                        requestData: form,
                        serverUrl: window.Metadata.model.serverUrl,
                        menuId: window.Metadata.model.m.menuId
                    }),
                    menuName: window.Metadata.menuName,
                    parentMenuName: window.Metadata.parentMenuName
                }).then(resp => {
                    const data = resp.data;
                    if(data.code === 200) {
                        // data.data array or map
                        if(data.data && data.data.data) {
                            if(Array.isArray(data.data.data)) {
                                this.resultViewType = 'table';
                                if(data.data.data.length > 0) {
                                    this.resultTableHeaders = Object.keys(data.data.data[0]);
                                }
                                this.resultTableData = data.data.data;
                            } else {
                                this.resultViewType = 'text';
                                this.resultViewText = JSON.stringify(data.data.data);
                            }
                        } else {
                            this.$message.success(data.message);
                        }
                        // this.$refs.form.resetForm();
                    } else {
                        this.$message.error(data.message);
                    }
                    done();
                }).catch(err => {
                    console.log(err);
                    done();
                });
            }
        }
    }
}

</script>
