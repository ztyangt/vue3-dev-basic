export namespace ConfigType {
  export interface Datum<T = any> {
    config_key: string
    name: string
    value: T
  }
}
