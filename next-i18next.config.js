const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],  // 添加你需要支持的语言代码
  },
  localePath: path.resolve('./public/locales')
};
