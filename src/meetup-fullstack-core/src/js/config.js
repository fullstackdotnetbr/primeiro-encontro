import 'babel-polyfill'
import $ from 'jquery'
import Router from './modules/router'
import materialize from 'materialize-js'
import home from './pages/home'

let routerInstance = Router(window)
var routes = routerInstance
    .add(home)
    .add(/contato/i, home)

window.onload = () => {
    routes.check()
}
