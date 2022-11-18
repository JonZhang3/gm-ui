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
<!--                    <el-col :span="6">-->
<!--                        <el-form-item label="业务接口">-->
<!--                            <el-select v-model="formData.interfaceId" filterable @change="handleInterfaceChange">-->
<!--                                <el-option v-for="item in interfaces" :value="item.id"-->
<!--                                           :key="item.id"-->
<!--                                           :label="`[${item.type === 0 ? 'Read' : 'Write'}] ${item.interfaceName}`"></el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
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
<!--            <el-row>-->
<!--                <el-col>-->
<!--                    <el-form-item label="返回参数">-->
<!--                        <el-table :data="formData.paramsReturn">-->
<!--                            <el-table-column prop="colName" label="参数名">-->
<!--                                <template slot="header" slot-scope="scope">-->
<!--                                    <span>参数名</span>-->
<!--                                    <el-button @click="handleAddReturnParam" type="primary" icon="el-icon-plus" circle size="mini"></el-button>-->
<!--                                </template>-->
<!--                                <template v-slot="scope">-->
<!--                                    <el-input v-model="scope.row.colName"></el-input>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column prop="displayName" label="展示名">-->
<!--                                <template slot-scope="scope">-->
<!--                                    <el-input v-model="formData.paramsReturn[scope.$index].displayName"></el-input>-->
<!--&lt;!&ndash;                                    <span v-else>{{scope.row.displayName}}</span>&ndash;&gt;-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column prop="dataType" label="数据类型">-->
<!--                                <template>-->
<!--                                    <span>文本</span>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column prop="displayType" label="列表展示">-->
<!--                                <template slot-scope="scope">-->
<!--                                    <el-switch v-if="interfaceType === 0"-->
<!--                                               v-model="formData.paramsReturn[scope.$index].displayType"-->
<!--                                               active-value="1" active-text="是"-->
<!--                                               inactive-value="0" inactive-text="否"></el-switch>-->
<!--&lt;!&ndash;                                    <span v-else>{{scope.row.displayType === 1 ? '是' : '否'}}</span>&ndash;&gt;-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                        </el-table>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col>-->
<!--                    <el-form-item label="单一对象">-->
<!--                        <el-switch v-model="formData.singleObject"-->
<!--                                   active-value="1" inactive-value="0"-->
<!--                                   active-text="是" inactive-text="否"></el-switch>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
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

export default {
    name: 'app',
    data() {
        return {
            customFields: [],
            includeFields: ['group', 'dynamic', 'title', 'input', 'password', 'textarea', 'number', 'radio', 'checkbox',
                'select', 'year', 'month', 'week', 'date', 'time', 'datetime', 'daterange', 'timerange',
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
        this.formData.queryFormData = JSON.parse(window.Metadata.model.queryFormContent);
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
                queryFormContent: JSON.stringify(this.formData.queryFormData),
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

