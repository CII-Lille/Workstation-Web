module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],

    plugins: ['stylelint-scss', 'stylelint-order'],

    rules: {
        indentation: 4
    },

    ignoreFiles: ['node_modules/**/*', 'public/**/*', 'dist/**/*', '**/*.js', '**/*.ts']
}
