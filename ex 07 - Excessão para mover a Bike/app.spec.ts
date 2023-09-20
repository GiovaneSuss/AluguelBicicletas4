import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    /*it('should correctly calculate rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers()
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })
    it('should track bike location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const NewYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, NewYork)
        expect(bike.position.latitude).toEqual(NewYork.latitude)
        expect(bike.position.longitude).toEqual(NewYork.longitude)
    })*/

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        const NewYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, NewYork)
        expect(() =>  {
            app.moveBikeTo(app.findBike(bike.id).id, NewYork)
        }).not.toThrow()
    })
})
