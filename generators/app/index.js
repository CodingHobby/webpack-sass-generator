var _ = require('underscore.string')
var Generator = require('yeoman-generator')
var name

module.exports = class extends Generator {

	prompting() {
		return this.prompt([{
			type: 'input',
			name: 'name',
			message: 'What\'s your project\'s name?',
			default: this.appname
		}, {
			type: 'input',
			name: 'auth',
			message: 'What\'s your name?'
		}, {
			type: 'input',
			name: 'entry',
			message: 'What\'s your project\'s entry point?',
			default: 'app.js'
		}]).then(answers => {
			this.log('Creating Package...')
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					name: answers.name,
					auth: answers.auth,
					entry: answers.entry,
					_
				}
			)
			this.log('Creating webpack config file...')
			this.fs.copyTpl(
				this.templatePath('webpack.config.js'),
				this.destinationPath('webpack.config.js'),
				{
					entry: answers.entry
				}
			)
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('index.html'),
				{
					title: answers.name
				}
			)
			this.fs.copyTpl(
				this.templatePath('main.js'),
				this.destinationPath('src/'+answers.entry)
			)
		})
	}

	installDependencies() {
		this.log('Installing dependencies...')
		this.yarnInstall()
	}
}