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

//users
Route.get('/users', 'UsersController.index')
Route.post('/user', 'UsersController.store')
Route.put('/user/:username', 'UsersController.update')
Route.delete('/user/:id', 'UsersController.delete')

//auth
Route.get('/auth/getuser', 'AuthController.GetUser')
Route.post('/auth', 'AuthController.login')

//post
Route.get('posts', 'PostsController.index')
Route.post('post', 'PostsController.store')
Route.delete('/post/:id', 'PostsController.delete')

//image 
Route.get('images', 'ImagesController.index')
Route.get('image/:filename', 'ImagesController.show')
Route.post('image', 'ImagesController.store')

//file system
Route.get('file', 'FileSystemsController.index').as('fileshow')

