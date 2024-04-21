module.exports = {
  printWidth: 100, // * 每行最多多少个字符换行
  semi: false, // * 末尾是否使用分号
  singleQuote: true, // * 是否使用单引号
  tabWidth: 2, // * tab缩进
  jsxSingleQuote: false, // * jsx是否使用单引号
  // ? 行尾逗号,默认none,可选 none|es5|all
  // * es5 包括es5中的数组、对象
  // * all 包括函数对象等所有可选
  trailingComma: 'es5',
  bracketSpacing: true, // * 对象中的空格
  //? jsx标签闭合位置，默认为false
  // false: <div
  //          className=""
  //          style={{}}
  //        >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: false,
  // ? 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
  cursorOffset: 0, // * 光标移动位置
  filepath: '*',
  eslintIntegration: true, // * 让prettier使用eslint的代码风格进行检测
}
