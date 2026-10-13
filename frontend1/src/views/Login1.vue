<script setup>
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'

// 使用普通对象代替 TypeScript 接口
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: ''
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  region: [
    { required: true, message: 'Please select Activity zone', trigger: 'change' }
  ],
  count: [
    { required: true, message: 'Please select Activity count', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
  ],
  location: [
    { required: true, message: 'Please select a location', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
  ],
  resource: [
    { required: true, message: 'Please select activity resource', trigger: 'change' }
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' }
  ]
})

const ruleFormRef = ref()

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 100 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}))
</script>

<template>
  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
  >
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Activity zone" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity count" prop="count">
      <el-select v-model="ruleForm.count" placeholder="Activity count">
        <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
              v-model="ruleForm.date2"
              placeholder="Pick a time"
              style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="Activity location" prop="location">
      <el-radio-group v-model="ruleForm.location">
        <el-radio v-for="option in locationOptions" :key="option" :label="option">
          {{ option }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity type" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="Online activities" name="type">
          Online activities
        </el-checkbox>
        <el-checkbox label="Promotion activities" name="type">
          Promotion activities
        </el-checkbox>
        <el-checkbox label="Offline activities" name="type">
          Offline activities
        </el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type">
          Simple brand exposure
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="Sponsorship">Sponsorship</el-radio>
        <el-radio label="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
</style>
