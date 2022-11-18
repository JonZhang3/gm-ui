<template>
    <div style="padding: 10px 0 10px 10px">
        <div v-html="pageRemark" style="font-size: 14px;padding-bottom: 10px;"></div>
        <div>
            <avue-form ref="form" v-model="obj" :option="formOptions" @reset-change="handleReset"
                       @submit="handleSubmit">
            </avue-form>
        </div>
    </div>
</template>

<script>

import request from "../../common/request";

export default {
    name: 'app',
    data() {
        return {
            pageRemark: window.Metadata.model.m.pageRemark,
            obj: {},
            formOptions: JSON.parse(window.Metadata.model.m.queryFormContent)
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
                        if(data.data && Object.keys(data.data).length > 0) {
                            this.$message.success(data.data.data);
                        } else {
                            this.$message.success(data.message);
                        }
                        this.$refs.form.resetForm();
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
