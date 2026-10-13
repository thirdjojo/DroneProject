<template>
  <div>
    <h2>用户列表</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    <button @click="fetchUsers">获取用户列表</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const users = ref([])

// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users')
    if (response.data.code === 200) {
      users.value = response.data.data
      ElMessage.success('获取用户列表成功')
    }
  } catch (error) {
    ElMessage.error('获取用户列表失败')
    console.error('错误:', error)
  }
}

// 登录示例
const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('/api/login', { username, password })
    if (response.data.code === 200) {
      ElMessage.success('登录成功')
      // 存储 token
      localStorage.setItem('token', response.data.data.token)
      // 跳转到首页
      router.push('/')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('登录失败')
    console.error('错误:', error)
  }
}
</script>