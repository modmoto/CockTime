import {Moment} from "moment";

export class NotificationTouple {
    notification: { android: { sound: boolean; sticky: boolean; vibrate: boolean; priority: string }; title: string; body: string; ios: { sound: boolean; vibrate: boolean } };
    schedule: { time: Date };

    constructor(title: string, body: string, time: Moment) {
        this.notification = {
            title: title,
            body: body,
            ios: {
                sound: true,
                vibrate: true
            },
            android:
                {
                    sound: true,
                    priority: 'high',
                    sticky: false,
                    vibrate: true
                }
        };
        this.schedule = {
            time: time.toDate()
        };
    }
}
