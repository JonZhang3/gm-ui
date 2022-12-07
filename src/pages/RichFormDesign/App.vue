<template>
    <div>
        <el-form size="small" label-suffix="：" :model="formData"
                 style="width: 80%;margin: 0 auto;padding: 20px 0;">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="菜单名称">
                        <span>{{ menuName }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="引用类型">
                        <el-select v-model="formData.citeType" @change="handleCiteTypeChange">
                            <el-option :value="0" label="接口"></el-option>
                            <el-option :value="1" label="数据源"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <template v-if="formData.citeType === 0">
                    <el-col :span="6">
                        <el-form-item label="接口服务器">
                            <el-select v-model="formData.serverSource">
                                <el-option v-for="item in interfaceServers" :value="item.id"
                                           :key="item.id"
                                           :label="item.serverName"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </template>
                <template v-else-if="formData.citeType === 1">
                    <el-col :span="6">
                        <el-form-item label="业务数据源">
                            <el-select v-model="formData.businessDsId" filterable @change="handleBusinessDsChange">
                                <el-option v-for="item in businessDSs" :value="item.id"
                                           :key="item.id"
                                           :label="item.bdsName"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
            <template v-if="formData.citeType === 0">
                <el-row>
                    <el-form-item label="接口URL">
                        <el-input v-model="formData.interface.requestUrl"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="接口类型">
                                <el-select v-model="formData.interface.type" disabled style="width: 100%;"><el-option :value="0" label="读接口"></el-option><el-option :value="1" label="写接口"></el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="请求方式">
                                <el-select v-model="formData.interface.method" style="width: 100%;"><el-option :value="0" label="GET"></el-option><el-option :value="1" label="POST"></el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="返回格式">
                                <el-select v-model="formData.interface.responseType" disabled style="width: 100%;"><el-option :value="0" label="Object"></el-option><el-option :value="1" label="Array"></el-option></el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="操作限额">
                                <el-checkbox :true-label="1" :false-label="0" v-model="formData.interface.quotaSingle"></el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="类别字段">
                                <el-input v-model="formData.interface.quotaType"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="额度字段">
                                <el-input v-model="formData.interface.quotaValue"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </template>
            <el-row>
                <el-form-item label="请求参数">
                    <el-button type="primary" size="small" @click="handleDesignQueryParamsForm">设计表单</el-button>
                </el-form-item>
            </el-row>
            <el-row style="padding-bottom: 10px;">
                <el-col :span="1" style="font-size: 14px;color:#606266;">页面简介：</el-col>
                <el-col :span="23">
                    <avue-ueditor v-model="formData.pageRemark" :options="ueditorOptions"></avue-ueditor>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="handleSubmit">保存</el-button>
                        <el-button @click="handleBack">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-dialog append-to-body :fullscreen="true" lock-scroll
                   :visible.sync="queryParamDrawerVisible">
            <avue-form-design :init-json-data="formData.queryFormData" style="height: 90vh"
                              :queryParams="queryParams"
                              :options="options" :include-fields="includeFields"
                              @submit="handleDesignComplete"
                              :custom-fields="customFields">
            </avue-form-design>
        </el-dialog>
    </div>
</template>

<script>

import request from "../../common/request";
import {handleDateChange} from '../../common/utils';

export default {
    name: 'app',
    data() {
        return {
            customFields: [
                {
                    title: 'UTC日期时间',
                    component: 'pro-date-time',
                    span: 24,
                    params: {
                        format: 'yyyy-MM-dd HH:mm:ss',
                        valueFormat: 'yyyy-MM-dd HH:mm:ss',
                        defaultValue: null,
                    }
                },
                {
                    title: 'UTC时间',
                    component: 'pro-time',
                    span: 24,
                    params: {
                        defaultValue: null,
                    }
                },
                {
                    title: 'UTC时间范围',
                    component: 'pro-time-range',
                    span: 24,
                    params: {
                        defaultStartValue: '',
                        defaultEndValue: ''
                    }
                },
                {
                    title: 'UTC日期时间范围',
                    component: 'pro-date-time-range',
                    span: 24,
                    params: {
                        format: 'yyyy-MM-dd HH:mm:ss',
                        valueFormat: 'yyyy-MM-dd HH:mm:ss',
                        rangeSeparator: '~',
                        defaultValue: null,
                        startPlaceholder: "开始日期",
                        endPlaceholder: "结束日期",
                        defaultStartValue: '',
                        defaultEndValue: '',
                    }
                }
            ],
            includeFields: ['group', 'dynamic', 'title', 'input', 'password', 'textarea', 'number', 'radio', 'checkbox',
                'select', 'date', 'time', 'datetime', 'daterange', 'timerange',
                'datetimerange', 'switch', 'slider'],
            options: {column: []},
            ueditorOptions: {},
            queryParamDrawerVisible: false,
            formData: {
                citeType: window.Metadata.model.citeType,
                interfaceId: window.Metadata.model.interfaceId,
                serverSource: (window.Metadata.model.serverSource || window.Metadata.model.serverSource === '0')
                    ? parseInt(window.Metadata.model.serverSource) : window.Metadata.model.serverSource,
                businessDsId: window.Metadata.model.businessDsId,
                singleObject: 1,
                queryFormData: '',
                pageRemark: window.Metadata.model.pageRemark,
                interface: {
                    requestUrl: '',
                    type: 1,
                    method: 0,
                    responseType: 0,
                    quotaSingle: null,
                    quotaType: '',
                    quotaValue: '',
                },

                id: window.Metadata.model.id,// model id
                menuId: window.Metadata.model.menuId,
                pageType: window.Metadata.model.pageType,
                parentId: window.Metadata.parentId,

                paramsReturn: [
                    {colName: 'code', displayName: 'code', dataType: '-1', displayType: 1},
                    {colName: 'msg', displayName: 'msg', dataType: '-1', displayType: 1},
                ],// from windows
            },
            dataTypes: [{id: -1, text: '文本'},{id: -2, text: '日期-天'},{id: -6, text:'日期-天(范围)'},{id: -3, text: '日期-小时'},{id: -4, text: '日期-秒'},{id: -10, text: 'yyyy_MM_dd'},{id: -5, text: '文本域'}],
            interfaceServers: window.Metadata.interfaceServers,// 接口服务器 // from windows
            interfaces: window.Metadata.interfaces,// from windows
            businessDSs: window.Metadata.businessDSs,// from windows
            queryParams: [],// from windows
            menuName: window.Metadata.menuName,// from windows

            interfaceType: 0,
        }
    },
    mounted() {
        this.formData.queryFormData = JSON.parse(window.Metadata.model.queryFormContent, (key, value) => {
            if(key === 'change' && value === 'handleDateChange') {
                return handleDateChange;
            }
            return value;
        });
        console.log(this.formData.queryFormData);
        if(this.formData.queryFormData && this.formData.queryFormData.interface) {
            this.formData.interface = this.formData.queryFormData.interface;
        }
        const paramsFrom = window.Metadata.paramsFrom;
        const queryParams = [];
        if(paramsFrom && paramsFrom.length > 0) {
            paramsFrom.forEach(item => {
                queryParams.push(item.colName);
            });
        }
        this.queryParams = queryParams;
    },
    methods: {
        handleDesignComplete(val) {
            this.queryParamDrawerVisible = false;
            this.formData.queryFormData = val;
        },
        handleDesignQueryParamsForm() {
            this.queryParamDrawerVisible = true;
        },
        handleSubmit() {
            if (!this.formData.queryFormData || this.formData.queryFormData.column.length === 0) {
                this.$message.error('请设计请求参数对应的表单');
                return;
            }
            if(this.formData.citeType === 0) {
                this.formData.queryFormData.interface = this.formData.interface;
            }
            this.formData.queryFormData.ireturns = this.formData.paramsReturn;
            request.post('/customerService/richForm/save', {
                id: this.formData.id,
                menuId: this.formData.menuId,
                pageType: this.formData.pageType,
                citeType: this.formData.citeType,
                interfaceId: this.formData.interfaceId,
                serverSource: this.formData.serverSource,
                businessDsId: this.formData.businessDsId,
                singleObject: this.formData.singleObject,
                pageRemark: this.formData.pageRemark,
                queryFormContent: JSON.stringify(this.formData.queryFormData, (key, value) => {
                    if(key === 'change') {
                        return 'handleDateChange';
                    }
                    return value;
                }),
                // paramsReturn: JSON.stringify(this.formData.paramsReturn)
            }).then((resp) => {
                const data = resp.data;
                if(data.code === 200) {
                    this.$message.success('保存成功');
                } else {
                    this.$message.error(data.message);
                }
            });
        },
        handleBack() {
            window.history.go(-1);
        },
        handleCiteTypeChange() {
            this.formData.interfaceId = '';
            this.formData.serverSource = '';
            this.formData.businessDsId = '';
            this.formData.queryFormData = null;
            this.formData.paramsReturn = [];
        },
        // 无用
        handleInterfaceChange(val) {
            this.formData.paramsReturn = [];
            this.getInterfaceData(val).then(data => {
                const queryParams = [];
                if(data.businessInterfaceParams) {
                    data.businessInterfaceParams.forEach(item => {
                        queryParams.push(item.colName);
                    });
                }
                this.queryParams = queryParams;
                this.interfaceType = data.type;
                const paramsReturn = []
                if(data.businessInterfaceFields && data.businessInterfaceFields.length > 0) {
                    data.businessInterfaceFields.forEach(item => {
                        paramsReturn.push({
                            "id": item.id,
                            "modelId": 290,
                            "colName": item.colName,
                            "displayName": item.colName,
                            "dataType": '-1',
                            "displayType": "1",
                        });
                    });
                }
                this.formData.paramsReturn = paramsReturn;
            });
        },
        handleBusinessDsChange(val) {
            this.formData.paramsReturn = [];
            this.getBusinessDSData(val).then(data => {
                // this.interfaceType = 0;
                const queryParams = [];
                if(data.businessDSParams) {
                    data.businessDSParams.forEach(item => {
                        queryParams.push(item.colName);
                    });
                }
                this.queryParams = queryParams;
                this.interfaceType = 1;
                const paramsReturn = [];
                if(data.businessDsCols && data.businessDsCols.length > 0) {
                    data.businessDsCols.forEach(item => {
                        paramsReturn.push({
                            "id": item.id,
                            "modelId": 290,
                            "colName": item.colName,
                            "displayName": item.colName,
                            "dataType": '-1',
                            "displayType": "1",
                        });
                    });
                }
                this.formData.paramsReturn = paramsReturn;
            });
        },
        // 无用
        getInterfaceData(id) {
            return new Promise((resolve) => {
                request.get('/businessInterface/view', {
                    params: {id: id}
                }).then(resp => {
                    resolve(resp.data);
                });
            })
        },
        getBusinessDSData(id) {
            return new Promise(resolve => {
                request.get('/businessDS/view', {
                    params: {id: id}
                }).then(resp => {
                    resolve(resp.data);
                })
            })
        }
    }
}

</script>

