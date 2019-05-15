const rp = require('request-promise');
module.exports = class extends think.Service {
  async queryExpress(shipperCode, logisticCode, orderCode = '') {
    const expressInfo = {
      success: false,
      shipperCode,
      shipperName: '',
      logisticCode,
      isFinish: 0,
      traces: []
    };
    const fromData = this.generateFromData()
  }
};
