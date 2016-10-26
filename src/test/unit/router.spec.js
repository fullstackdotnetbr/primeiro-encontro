'use strict'
import chai from 'chai'
import routerModule from '../../js/modules/router'
let router = routerModule()
let window = {
    location: {
        pathname: "/step1.html",
        search: "?type=1",
        href: "http://localho3032/step1.html?type=1"
    }
}

chai.should()

describe('Router', () => {
    describe('add route', () => {
        beforeEach(() => {
            router.flush();
        })
        it("should return one route when a single route is added with 2 parameters", () => {
            let handler = () => {}
            let routeRegex = /i/
            router.add(routeRegex, handler)
            router.routes.length.should.be.equal(1)
            router.routes[0].re.should.be.equal(routeRegex)
            router.routes[0].handler.should.be.equal(handler)
        })
        it("should return one route when a single route is added with 1 parameter", () => {
            let handler = () => {}
            router.add(handler)
            router.routes.length.should.be.equal(1)
            router.routes[0].re.should.be.string('')
            router.routes[0].handler.should.be.equal(handler)
        })
        it("should have zero routes when remove route", () => {
            let handler = () => {}
            let routeRegex = /i/
            router.add(routeRegex, handler)
            router.remove(routeRegex)
            router.routes.length.should.be.equal(0)
        })

        it("should return router when remove pattern not found", () => {
            let handler = () => {}
            let routeRegex = /i/
            router.add(routeRegex, handler)
            router.remove(routeRegex)
            router.routes.length.should.be.equal(0)
        })

        it("should return router when remove pattern not found", () => {
            let routeRegex = /i/
            let result = router.remove(routeRegex)
            result.should.be.equal(router)
        })
        it("should return router when check do not matches a route", () => {
            let router = routerModule(window)
            let handler = () => {}
            let routeRegex = /i/
            router.add(routeRegex, handler)
            let result = router.check()
            result.should.be.equal(router)
        })
        it("should return true when check matches a route", () => {
            let router = routerModule(window)
            let handler = () => {}
            let routeRegex = /step1/
            router.add(routeRegex, handler)
            let result = router.check()
            result.should.be.equal(true)
        })
    })
})
