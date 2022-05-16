module.exports = {
  root: true,
  env: {
    node: true,
		jquery:true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
   'generator-star-spacing': 'off',
   // allow debugger during development
   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'space-before-function-paren': 0,
		'no-tabs': 'off',
	"no-unused-vars": "off"
  }
}
