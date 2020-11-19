class Config {
  constructor (vm) {
    this.vm = vm;
  }

  getCalendarConfig () {
    if (!this.vm || !this.vm.cConfig) return {};
    return this.vm.cConfig;
  }

  setCalendarConfig (config) {
    return new Promise((resolve, reject) => {
      if (!this.vm || !this.vm.cConfig) {
        reject('异常：未找到组件配置信息');
        return;
      }
      let conf = { ...this.vm.cConfig, ...config };
      this.vm.cConfig = conf;
      this.vm.$nextTick(() => {
        resolve(conf)
      })
    });
  }
}

export default vm => new Config(vm);
