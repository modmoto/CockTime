import {Moment} from "moment";

export class SunRise {
    constructor(time: Moment) {
        this.time = time;
    }

    time: Moment;
}
