import { App } from "../../../src/app"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('adds a bike in the database',async () => {
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bike)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bike.id)
        expect(persistedBike.id).toEqual(
            bike.id
        )
    })

    it('removes a bike from the database', async () => {
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike)
        await repo.remove(bike.id)
        const removedBike = await repo.find(bike.id)
        expect(removedBike).toBeNull()
    })

    it('lists bikes in the database', async () => {
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike1', 5, [])
        const bike2 = new Bike('caloi speedbike', 'speed bike',
        2345, 2345, 101.0, 'My bike2', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const bikeList = await repo.list()
        expect(bikeList.length).toEqual(2)
    })

    it('Updates a bike in the database', async () => {
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike)
        const avaliability = bike.available
        await repo.update(bike.id,bike)
        expect(bike.available).not.toEqual(
            avaliability
        )
    })
})