import { Alert } from "../models/Alert";

export class PushNotification {
  // Private constructor to prevent instantiation
  private constructor() {}
  private readonly apiUrl: string = "https://fcm.googleapis.com/fcm/send";
  private readonly serverKey: string = "";

  public sendNotification(notification: Alert) {
    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `key=${this.serverKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}
