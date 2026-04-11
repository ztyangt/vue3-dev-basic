import http from '@/utils/request'
import type { ConfigType } from '@/types/config'
/**
 * 配置API
 */
class ConfigApi {
  /**
   * 获取配置
   * @param params 配置参数 { config_key }
   * @returns
   */
  take(params: any) {
    return http.$get<ConfigType.Datum>('/api/config', params)
  }
}

export const configApi = new ConfigApi()
