import { Alert } from "../models/Alert";

export class AlertService {
  public async createAlert(
    alertData: Alert,
    braceletId: number
  ): Promise<Alert> {
    const newAlert: Alert = await Alert.create<Alert>({
      title: alertData.title,
      description: alertData.description,
      type: alertData.type, // is critical, normal and so forth
      isActive: true,
      braceletId: braceletId,
    });
    return newAlert;
  }
  public async listAlerts(): Promise<Array<Alert>> {
    const alerts = await Alert.findAll<Alert>();
    return alerts;
  }
}
