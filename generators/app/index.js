'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const figlet = require('figlet')
const normalizeUrl = require('normalize-url')

module.exports = class extends Generator {
  prompting () {
    this.log(chalk.bold.greenBright(figlet.textSync('MULTI-GENERATOR')))
    const prompts = [
      {
        name: 'moduleName',
        message: 'Name : ',
        default: this.appname
      },
      {
        name: 'moduleDescription',
        message: 'Description :',
        default: 'My awesome module'
      }, {
        name: 'icon',
        message: 'Icon URL :'
      }, {
        name: 'ghUname',
        message: 'Github Username :',
        store: true,
        validate: x => x.length > 0 ? true : 'You have to provide a username',
        when: () => !this.options.org
      }, {
        name: 'website',
        message: 'Web Page URL : ',
        store: true,
        validate: x => validURL(normalizeUrl(x)) && x.length > 0 ? true : 'You have to provide a valid URL',
        filter: x => normalizeUrl(x)
      },
      {
        name: 'donate',
        message: 'Donation URL : ',
        store: true,
        validate: x => validURL(normalizeUrl(x)) && x.length > 0 ? true : 'You have to provide a valid URL',
        filter: x => normalizeUrl(x)
      }, {
        name: 'cli',
        message: 'CLI module',
        type: 'confirm',
        default: Boolean(this.options.cli),
        when: () => this.options.cli === undefined
      },
      {
        name: 'authorName',
        message: 'Author Name : ',
        store: true,
        default: this.user.git.name()
      },
      {
        name: 'twitter',
        message: 'Twitter Username : ',
        default: this.user.git.name()
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to))
    const dataTemplate = Object.assign({ year: new Date().getFullYear(), camelCase: this.props.moduleName.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase()), repoName: this.props.moduleName.toUpperCase(), email: this.user.git.email() }, this.props)
    this.fs.copyTpl([
        `${this.templatePath()}/**`,
        '!**/cli.js'
    ], this.destinationPath(), dataTemplate)
    mv('gitignore', '.gitignore')
    mv('npmignore', '.npmignore')
    mv('npmrc', '.npmrc')
    mv('_package.json', 'package.json')
    mv('github', '.github')
    if (this.props.cli) this.fs.copyTpl(this.templatePath('cli.js'), this.destinationPath('cli.js'), dataTemplate)
  }

  git () {
    this.spawnCommandSync('git', ['init'])
  }

  install () {
    this.installDependencies()
  }
}
function validURL (str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return !!pattern.test(str)
}
