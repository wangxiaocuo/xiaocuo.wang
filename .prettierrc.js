module.exports = {
  // 字符串使用单引号
  singleQuote: true,
  // 句尾不添加分号
  semi: false,
  // 缩进字节数，默认为2
  tabWidth: 2,
  // 缩进不使用 tab
  useTabs: false,
  // 对象中打印空格 默认 true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  // 箭头函数参数括号 默认 avoid，可选 avoid| always
  // avoid 能省略括号的时候就省略 例如 x => x
  // always 总是有括号
  arrowParens: 'avoid',
  // 换行长度，默认80
  printWidth: 80,

  // 多行 JSX 元素时，将 `>` 放在最后一行的末尾，而不是单独放在下一行
  // <button
  //   className="prettier-class"
  //   id="prettier-id"
  //   onClick={this.handleClick}>
  //   Click Here
  // </button>
  // 设置为 false 时
  // <button
  //   className="prettier-class"
  //   id="prettier-id"
  //   onClick={this.handleClick}
  // >
  //   Click Here
  // </button>
  jsxBracketSameLine: true,
	// jsx 中使用单引号代替双引号
	jsxSingleQuote: true,
	// 在对象或数组最后一个元素后面不加逗号
	trailingComma: 'none',
	// 每行结尾换行符号设置为 lf
	endOfLine: 'lf'
}
