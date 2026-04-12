<template>
  <div class="login-page wh-100 flex-center">
    <el-button plain size="default" @click="toggleTheme" class="theme-btn pointer" circle>
      <template #icon>
        <Moon v-if="!isDark" />
        <Sun v-else />
      </template>
    </el-button>

    <div class="login-container">
      <div class="login-card glass-card animate-up">
        <div class="card-highlight"></div>

        <div class="flex-center">
          <div class="logo-box flex-center">
            <img :src="config.logo" />
          </div>
        </div>

        <div class="login-title title-color mb-40 fs-20 fw-700">{{ config.title }}</div>
        <!-- <div class="login-subtitle px-10 muted-color text-center fs-14 h-2x">
          {{ config.description }}
        </div> -->

        <div class="login-form mt-30">
          <el-form :model="formModel" ref="formRef" class="w-100" label-position="top">
            <el-form-item
              label="账号"
              prop="account"
              :rules="{
                required: true,
                message: '账号不能为空！',
              }"
            >
              <el-input v-model="formModel.account" placeholder="请输入账号">
                <template #prefix>
                  <User :size="16" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              class="mt-20"
              label="密码"
              prop="password"
              :rules="{
                required: true,
                message: '密码不能为空！',
              }"
            >
              <el-input v-model="formModel.password" placeholder="请输入密码" type="password">
                <template #prefix>
                  <LockKeyhole :size="16" />
                </template>
              </el-input>
            </el-form-item>
          </el-form>

          <el-button
            type="primary"
            class="w-100 mt-50 mb-15"
            @click="handleLogin"
            :loading="loading"
          >
            <template #icon>
              <LogIn />
            </template>
            登录</el-button
          >
        </div>
      </div>
      <div class="copyright text-center mt-20 muted-color fs-14 fw-300">
        © 2026 {{ config.title }}. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Moon, Sun, LogIn, User, LockKeyhole } from '@lucide/vue'
import { useTheme } from '@/hooks/use-theme'
import { useConfigStore } from '@/stores/config'
import { ElMessage } from 'element-plus'

const configStore = useConfigStore()
const { config } = storeToRefs(configStore)

const { isDark, toggleTheme } = useTheme()

const formModel = reactive({
  account: '',
  password: '',
})

const formRef = ref()
const loading = ref(false)
const handleLogin = async () => {
  formRef.value.validate().then((valid: boolean) => {
    if (valid) {
      loading.value = true

      setTimeout(() => {
        ElMessage({
          message: '登录成功!',
          type: 'success',
          plain: true,
        })
        loading.value = false
      }, 500)
    }
  })
}
</script>

<style lang="scss" scoped>
.theme-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}

.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  padding: 0 24px;
}

/* 高级玻璃卡片 */
.glass-card {
  // background: color-mix(in srgb, var(--bg-surface) 30%, transparent);
  background: var(--bg-surface);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--border-base) 30%, transparent);
  border-radius: 5px;
  padding: 50px 38px;
  box-shadow:
    0 8px 32px -4px rgba(0, 0, 0, 0.1),
    0 0 0 1px color-mix(in srgb, var(--bg-surface) 20%, transparent) inset;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  .card-highlight {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 120px;
    height: 120px;
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    border-radius: 50%;
    filter: blur(24px);
  }

  .login-title {
    color: var(--text-heading);
    text-align: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
  }
}

.logo-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--info));
  box-shadow: 0 8px 20px -4px color-mix(in srgb, var(--primary) 40%, transparent);
  margin-bottom: 16px;

  img {
    width: 30px;
    height: 30px;
  }
}
</style>
