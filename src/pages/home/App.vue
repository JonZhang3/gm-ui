<template>
    <el-form>
        <el-row>
            <el-col :span="24">
                <el-form-item label="菜单名称">
                    <span>发送邮件</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="引用类型">
                    <el-select></el-select>
                </el-form-item>
            </el-col>
        </el-row>
<!--        <el-row>-->
<!--            <avue-form-design style="height: 100vh;"-->
<!--                              :options="options"-->
<!--                              @submit="handleSubmit"-->
<!--                              :custom-fields="customFields">-->
<!--            </avue-form-design>-->
<!--        </el-row>-->
    </el-form>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            customFields: [],
            options: {column: []},
        }
    },
    methods: {
        handleSubmit(val) {
            this.$message.success("查看控制台")
            console.log(val);
        },
    }
}

</script>

