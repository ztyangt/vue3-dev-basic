type Options = {
  paralelCount: number
  immately: boolean
}

type TaskItem = {
  task: Function
  resolve: Function
  reject: Function
  id?: string | number
}

/**
 * 并发任务
 * @param paralelCount 并发数量，默认为10
 * @param immately 是否立即执行，默认为true
 */
export class concurrentTask {
  paralelCount: number // 并发数量，默认为10
  taskList: Array<TaskItem> // 任务列表
  runningCount: number // 正在执行的任务数量
  immately: boolean // 是否立即执行
  private nextId: number // 用于生成唯一ID
  private pauseTaskList: Array<TaskItem> // 暂停任务列表

  constructor(options?: Partial<Options>) {
    const { paralelCount = 10, immately = true } = options || {}
    this.paralelCount = paralelCount
    this.taskList = []
    this.runningCount = 0
    this.immately = immately
    this.nextId = 0
    this.pauseTaskList = []
  }

  add(task: Function, id?: string | number) {
    return new Promise((resolve, reject) => {
      const taskId = id !== undefined ? id : this.nextId++
      this.taskList.push({
        task,
        resolve,
        reject,
        id: taskId
      })
      this.immately && this._run()
      return taskId
    })
  }

  /**
   * 移除任务
   * @param id 任务ID
   * @returns 是否移除成功
   */
  remove(id: string | number): boolean {
    const initialLength = this.taskList.length
    this.taskList = this.taskList.filter((task) => task.id !== id)
    return this.taskList.length !== initialLength
  }

  /**
   * 开始执行任务
   */
  start() {
    if (this.immately) return
    for (let i = 0; i < this.paralelCount; i++) {
      this._run()
    }
  }

  /**
   * 是否存在任务
   */
  has(id: string | number): boolean {
    return (
      this.taskList.some((task) => task.id === id) ||
      this.pauseTaskList.some((task) => task.id === id)
    )
  }

  /**
   * 暂停任务
   */
  pause(id?: string | number) {
    if (id === undefined) {
      this.immately = false
      return
    }
    if (this.pauseTaskList.some((task) => task.id === id)) return
    const task = this.taskList.find((task) => task.id === id)
    if (!task) return
    this.taskList = this.taskList.filter((t) => t.id !== id)
    this.pauseTaskList.push(task)
  }

  /**
   * 恢复任务
   */
  resume(id?: string | number) {
    if (id) {
      const task = this.pauseTaskList.find((task) => task.id === id)
      if (task) {
        this.taskList.push(task)
        this.pauseTaskList = this.pauseTaskList.filter((t) => t.id !== id)
      }
    }
    this.immately = true
    this._run()
  }

  /**
   * 停止任务
   */
  stop() {
    this.taskList = []
    this.runningCount = 0
  }

  /**
   * 任务数量
   */
  get count(): number {
    return this.taskList.length
  }

  // 等待当前任务完成
  compelete() {
    return new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        if (this.runningCount === 0 && this.taskList.length === 0) {
          clearInterval(timer)
          resolve()
        }
      }, 1000)
    })
  }

  private _run() {
    if (this.runningCount < this.paralelCount && this.taskList.length > 0) {
      // 随机取出一个任务
      const randomIndex = Math.floor(Math.random() * this.taskList.length)
      const randomTask = this.taskList.splice(randomIndex, 1)[0]
      if (!randomTask) return
      const { task, resolve, reject } = randomTask

      // const { task, resolve, reject } = this.taskList.shift()!
      this.runningCount++
      Promise.resolve(task())
        .then(
          (value) => resolve(value),
          (error) => reject(error)
        )
        .finally(() => {
          this.runningCount--
          this._run()
        })
    }
  }
}

/**
 * 定时器任务
 * @param interval 时间间隔，单位毫秒
 * @param callback 回调函数
 * @param immediate 是否立即执行，默认为false
 */
export class TimerTask {
  private timerId: number | null = null
  private isRunning = false

  constructor(
    private readonly interval: number,
    private readonly callback: () => void,
    private readonly immediate: boolean = false
  ) {}

  start(): void {
    if (this.isRunning) return

    this.isRunning = true

    const execute = () => {
      this.callback()
      this.timerId = setTimeout(execute, this.interval) as unknown as number
    }

    if (this.immediate) {
      execute()
    } else {
      this.timerId = setTimeout(execute, this.interval) as unknown as number
    }
  }

  stop(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId)
      this.timerId = null
      this.isRunning = false
    }
  }

  get running(): boolean {
    return this.isRunning
  }
}
