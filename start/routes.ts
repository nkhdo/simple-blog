/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.get('~setup', 'AuthController.renderSetup')
Route.post('~setup', 'AuthController.setup')
Route.get('~login', 'AuthController.renderLogin')
Route.post('~login', 'AuthController.login')
Route.get('~logout', 'AuthController.logout')
Route.group(() => {
  Route.get('/', 'AdminController.renderAdmin')
})
  .prefix('~admin')
  .middleware(['auth'])
