export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public latitude: number = 0,
        public longitude: number = 0,
        public id?: string
    ) {}

    getLocation(): void{
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
        else {
            alert("Geolocation is not supported by this browser")
        }
    }
}