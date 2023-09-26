import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./Errors/bike-not-found-error"
import { UnavailableBikeError } from "./Errors/Unavailable-bike-error"
import { UserNotFoundError } from "./Errors/User-not-found-error"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        const NewYork = new Location(40.753056, -73.983056)
        //app.registerBike(bike)
        app.moveBikeTo(bike.id, NewYork)
        expect(() =>  {
            app.moveBikeTo(app.findBike(bike.id).id, NewYork)
        }).not.toThrow(BikeNotFoundError)
    })
    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it('should throw user not found error when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })

    it('should test RegisterUser', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@gmail.com','1234')
        await app.registerUser(user)
        expect(
            app.findUser(user.email)
        ).toBeDefined()
    })
    it('should test RegisterBike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        expect(
            app.findBike(bike.id)
        ).toBeDefined()
    })

    it('should test removeUser', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@gmail.com','1234')
        await app.registerUser(user)
        app.removeUser(user.email)
        expect(
            app.users.find(user => user.id === user.id)
        ).not.toBeDefined()
    })

    it('should test returnBike', async () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const user = new User('Jose', 'jose@gmail.com','1234')
        app.registerBike(bike)
        await app.registerUser(user)
        app.rentBike(bike.id,user.email)
        app.returnBike(bike.id,user.email)
        expect(
            app.rents.find(rent => rent.bike.id === bike.id && 
                                rent.user.email === user.email &&
                                !rent.end)
        ).not.toBeDefined()
    })

    it('should test findBike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        expect(
            app.bikes.find(bike => bike.id === bike.id)
        ).toBeDefined()
    })
})