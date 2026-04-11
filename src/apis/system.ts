import http from '@/utils/request'

/**
 * 系统API
 */
class SystemApi {
  /**
   * 获取系统信息
   */
  systemInfo() {
    return http.$get(`/api/system`)
  }
}

export const systemApi = new SystemApi()
