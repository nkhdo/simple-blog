import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Content from 'App/Models/Content'

export default class HomepageSeeder extends BaseSeeder {
  public async run() {
    const content = `
# Welcome to simple-blog! :tada:

* If this is a new site, please go to [/~setup](/~setup) to setup the admin account.
* You can then [/~login](/~login) and go to [/~admin](/~admin) page. Please remember these links as they won't be displayed anywhere else.
* To change homepage content, edit the \`Homepage\` page inside [/~admin](/~admin) section.

Enjoy using \`simple-blog\`!
    `

    await Content.create({
      title: 'Homepage',
      slug: 'home',
      type: 'page',
      content,
    })
  }
}
