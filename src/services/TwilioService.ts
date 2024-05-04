import * as dotenv from "dotenv";
import path = require("path");
import { Twilio } from "twilio";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export class TwilioService {
  private static client: Twilio;

  // Initialize Twilio client
  static initialize() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    // Check if the required environment variables are provided
    if (!accountSid || !authToken || !phoneNumber) {
      throw new Error("Twilio credentials not provided.");
    }

    TwilioService.client = new Twilio(accountSid, authToken);
  }

  // Static method to send SMS
  static async sendSMS(body: any, to: string) {
    try {
      // Ensure client is initialized before sending SMS
      if (!TwilioService.client) {
        throw new Error("Twilio client not initialized.");
      }

      const message = await TwilioService.client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });
      console.log("SMS sent successfully:", message.sid);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  }

  static async makeCall(body: any, to: string) {
    try {
      // Ensure client is initialized before sending SMS
      if (!TwilioService.client) {
        throw new Error("Twilio client not initialized.");
      }

      const message = await TwilioService.client.calls.create({
        twiml: `<Response><Say>${body}</Say></Response>`,
        to,
        from: String(process.env.TWILIO_PHONE_NUMBER),
      });
      console.log("SMS sent successfully:", message.sid);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  }
}