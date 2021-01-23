import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Config from 'App/Models/Config'

export default class ConfigSeeder extends BaseSeeder {
  public async run() {
    await Config.create({
      key: 'site_configs',
      value: JSON.stringify({
        title: 'Simple Blog',
        description: 'My simple blog',
        menuItems: [
          {
            title: 'About',
            path: '/about',
          },
        ],
      }),
    })
  }
}
