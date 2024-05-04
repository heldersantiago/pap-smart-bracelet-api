import { Alert } from "../models/Alert";
import { AlertService } from "./AlertService";
import { HealthThreshold } from "./HealthThresholds";
import { TwilioService } from "./TwilioService";

export class HealthAnalisisService {
  private bloodPressureThresholds =
    HealthThreshold.getBloodPressureThresholds();
  private temperatureThresholds = HealthThreshold.getTemperatureThresholds();
  private heartRateThresholds = HealthThreshold.getHeartRateThresholds();

  public constructor(
    private alertService: AlertService,
    private braceletId: number
  ) {
    TwilioService.initialize();
  }

  public async analyzeBloodPressure(bloodPressure: number) {
    let alertData;
    const [isOutsideNormal, thresholdType1] = this.isOutsideThreshold(
      bloodPressure,
      this.bloodPressureThresholds.normal.systolic
    );
    const [isOutsideCritical, thresholdType2] = this.isOutsideThreshold(
      bloodPressure,
      this.bloodPressureThresholds.critical.systolic
    );

    console.log(`Analyzing bloodPressure ${bloodPressure}`);

    if (isOutsideCritical) {
      alertData = {
        type: "Crítico",
        title:
          thresholdType2 == "max"
            ? "Pressão arterial está muito elevado"
            : "Pressão arterial está muito baixo",
        description: `Pressão arterial: ${bloodPressure} mmHg`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "Pressão arterial está elevado"
            : "Pressão arterial está baixa",
        description: `Pressão arterial: ${bloodPressure} mmHg`,
        isActive: true,
      };
    }

    if (alertData) {
      await this.alertService.createAlert(alertData as Alert, this.braceletId);
      TwilioService.sendSMS(
        `[Estado: ${alertData.type}], Título: [${alertData.title}], Descrição: [${alertData.description}]`,
        "+244927871797"
      );
    }
  }

  public async analyzeHeartRate(heartRate: number) {
    let alertData;

    const [isOutsideNormal, thresholdType1] = this.isOutsideThreshold(
      heartRate,
      this.heartRateThresholds.normal
    );
    const [isOutsideCritical, thresholdType2] = this.isOutsideThreshold(
      heartRate,
      this.heartRateThresholds.critical
    );

    console.log(`Analyzing bloodPressure ${heartRate}`);

    if (isOutsideCritical) {
      alertData = {
        type: "Crítico",
        title:
          thresholdType2 == "max"
            ? "Batimento cardíaco está muito rápido."
            : "Batimento cardíaco está muito lento.",
        description: `Batimento cardíaco: ${heartRate} bpm`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "Batimento cardiaco está rápido."
            : "Batimento cardiaco está lento.",
        description: `Batimento cardíaco: ${heartRate} bpm`,
        isActive: true,
      };
    }

    if (alertData) {
      await this.alertService.createAlert(alertData as Alert, this.braceletId);
      TwilioService.sendSMS(
        `[Estado: ${alertData.type}], Título: [${alertData.title}], Descrição: [${alertData.description}]`,
        "+244927871797"
      );
    }
  }

  public async analyzeTemperature(temperature: number) {
    let alertData;

    const [isOutsideNormal, thresholdType1] = this.isOutsideThreshold(
      temperature,
      this.temperatureThresholds.normal
    );
    const [isOutsideCritical, thresholdType2] = this.isOutsideThreshold(
      temperature,
      this.temperatureThresholds.normal
    );

    console.log(`Analyzing temperature ${temperature}`);

    if (isOutsideCritical) {
      alertData = {
        type: "Crítico",
        title:
          thresholdType2 == "max"
            ? "Temperatura está muito alta"
            : "Temperatura está muito baixa.",
        description: `A temperatura corporal é: ${temperature} ºC`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "Temperatura está alta."
            : "Temperatura está baixa",
        description: `A temperatura corporal é: ${temperature} ºC`,
        isActive: true,
      };
    }

    if (alertData) {
      await this.alertService.createAlert(alertData as Alert, this.braceletId);
      TwilioService.sendSMS(
        `[Estado: ${alertData.type}], Título: [${alertData.title}], Descrição: [${alertData.description}]`,
        "+244927871797"
      );
    }
  }

  private isOutsideThreshold(
    value: number,
    thresholds: { min: number; max: number }
  ): [boolean, string] {
    if (value < thresholds.min) {
      return [true, "min"];
    } else if (value > thresholds.max) {
      return [true, "max"];
    } else {
      return [false, "none"];
    }
  }
}
