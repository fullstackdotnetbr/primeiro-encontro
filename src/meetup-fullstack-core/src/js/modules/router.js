let Router = (window) => {
    function clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '')
    }
    return {
        routes: [],
        getFragment() {
            let fragment = ''
            fragment = clearSlashes(decodeURI(window.location.pathname + window.location.search))
            fragment = fragment.replace(/\?(.*)$/, '')
            return clearSlashes(fragment)
        },
        add(re, handler) {
            if (typeof re == 'function') {
                handler = re
                re = ''
            }
            this.routes.push({ re: re, handler: handler })
            return this
        },
        remove(param) {
            for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
                if (r.handler === param || r.re.toString() === param.toString()) {
                    this.routes.splice(i, 1)
                    return this
                }
            }
            return this
        },
        flush() {
            this.routes = []
            return this
        },
        check(currentFragment) {
            let fragment = currentFragment || this.getFragment();

            for (let i = 0; i < this.routes.length; i++) {

                let match = fragment.match(this.routes[i].re)
                if (match) {
                    match.shift()
                    this.routes[i].handler.apply({}, match)
                    return true
                }
            }
            return this
        }
    }
}

export default Router
