import 'babel-polyfill'
import $ from 'jquery'
import Router from './modules/router'
import materialize from 'materialize-js'
import home from './pages/home'

let routerInstance = Router(window)
var routes = routerInstance
    .add(home)

window.onload = () => {
    routes.check()
}
