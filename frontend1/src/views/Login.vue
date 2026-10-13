<script setup >
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'

// 使用普通对象代替 TypeScript 接口
const ruleForm = reactive({
  name: '',
  password: '',
  verifyCode: '',
  token: ''
})


const rules = reactive({
  name: [
    { required: true, message: 'Please input User name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password:[{
    required: true, message: 'Please input password', trigger: 'blur'
  },
    {
      min: 6,max:10,message: 'Length should be 6 to 10',trigger: 'blur'
    }],
  verifyCode:[{
    required: true,message: 'Please input VerifyCode', trigger: 'blur'
  }],
  captchaImg:null
})

const ruleFormRef = ref()

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.lof('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })


  const resetForm = (formEl) => {
    if (!formEl) return
    ruleFormerRef.value.resetFields()
  }
  const getCaptcha = async () => {
    try {
      const response = await axios.get('/api/captcha');
      if (response.data.code == 200) {
        capthcha.value = response.data.data.cpatcha;
        captchaImage.value = response.data.data.image;
      }
    } catch (error) {
      console.error('获取验证码失败:', error);
    }
  }

  const created = () => {
    this.getCaptcha()
  }
  const options = Array.from({length: 100}).map((_, idx) => ({
        value: `${idx + 1}`,
        label: `${idx + 1}`
      })
  )


}
</script>

<template>
  <el-row style="height: 100vh">
    <el-col :span="12" class="login-col" style="height:100%">
      <h1>登录</h1>
      <el-image
          :src="require('@/assets/project.png')"
          style="width: 90%;height:60%"
      />
      <p>If you wang more information about our catalog,please interview our own website
      <span style="color: #409EFF;">www.tangxin.com</span>
      </p>

    </el-col>

    <el-col :span="12" style="height:100%;padding-left:20px; box-sizing: border-box;">
      <h1>注册</h1>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <el-input v-model="ruleForm.verifyCode" />
          <el-image :src="captchaImg" class="capthchaImg"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-col {
  border-right: 1px solid #e0e0e0;
  height: 80%;
  padding-right: 20px;
  box-sizing: border-box;
  text-align:center
}

el-row{
  background-color:#fff;
  display:flex;
  align-items: center
}

</style>