import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/user'
import { jwtDecode } from 'jwt-decode'
import Router from '@/router'
import Cookies from 'js-cookie'
import { userApi } from '@/apis/user'

export const useUserStore = defineStore(
  'user-store',
  () => {
    const loading = ref(false)
    const token = ref<string>()
    const user = ref<UserType.UserInfo>()

    const hasLogin = computed(() => {
      return !!token.value && !!user.value
    })

    //  初始化用户信息，检查token是否过期
    const init = () => {
      if (token.value) {
        const payload = jwtDecode<UserType.JwtData>(token.value)
        if (payload.exp < Date.now()) {
          logout()
        }
      }
    }

    const logout = () => {
      token.value = undefined
      user.value = undefined
      Cookies.remove('Authorization', { path: '/' })
      Router.replace({
        name: 'login',
        query: { redirect: encodeURIComponent(Router.currentRoute.value.fullPath) },
      })
    }

    return {
      loading,
      token,
      user,
      hasLogin,
      init,
      logout,
    }
  },
  {
    persist: [
      {
        key: 'USER-STORE',
        pick: ['user', 'token'],
        storage: localStorage,
      },
    ],
  },
)
