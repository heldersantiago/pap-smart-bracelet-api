import { Alert } from "../models/Alert";
import { AlertService } from "./AlertService";
import { HealthThreshold } from "./HealthThresholds";
import { TwilioService } from "./TwilioService";

const number = "+244937215016";

export class HealthAnalisisService {
  private bloodPressureThresholds =
    HealthThreshold.getBloodPressureThresholds();
  private temperatureThresholds = HealthThreshold.getTemperatureThresholds();
  private heartRateThresholds = HealthThreshold.getHeartRateThresholds();
  private bloodOxygenThresholds = HealthThreshold.getBloodOxygenThresholds();

  public static bloodPressureInvalidCount = 0;
  public static temperatureInvalidCount = 0;
  public static heartRateInvalidCount = 0;
  public static bloodOxygenInvalidCount = 0;

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
        description: `Pressão arterial: ${bloodPressure}mmHg`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "Pressão arterial está elevado"
            : "Pressão arterial está baixa",
        description: `Pressão arterial: ${bloodPressure}mmHg`,
        isActive: true,
      };
    }

    if (alertData) {
      HealthAnalisisService.bloodPressureInvalidCount++;
      console.log(HealthAnalisisService.bloodPressureInvalidCount);
      if (HealthAnalisisService.bloodPressureInvalidCount === 10) {
        await this.sendAlert(alertData as Alert);
        HealthAnalisisService.bloodPressureInvalidCount = 0;
      }
    } else {
      HealthAnalisisService.bloodPressureInvalidCount = 0;
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
        description: `Batimento cardíaco: ${heartRate}bpm`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "Batimento cardiaco está rápido."
            : "Batimento cardiaco está lento.",
        description: `Batimento cardíaco: ${heartRate}bpm`,
        isActive: true,
      };
    }

    if (alertData) {
      HealthAnalisisService.heartRateInvalidCount++;
      console.log(HealthAnalisisService.heartRateInvalidCount);
      if (HealthAnalisisService.heartRateInvalidCount === 10) {
        await this.sendAlert(alertData as Alert);
        HealthAnalisisService.heartRateInvalidCount = 0;
      }
    } else {
      HealthAnalisisService.heartRateInvalidCount = 0;
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
      this.temperatureThresholds.critical
    );

    console.log(`Analyzing temperature ${temperature}`);

    if (isOutsideCritical) {
      alertData = {
        type: "Crítico",
        title:
          thresholdType2 == "max"
            ? "Temperatura está muito alta"
            : "Temperatura está muito baixa.",
        description: `A temperatura corporal é: ${temperature}ºC`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "Temperatura está alta."
            : "Temperatura está baixa",
        description: `A temperatura corporal é: ${temperature}ºC`,
        isActive: true,
      };
    }

    if (alertData) {
      HealthAnalisisService.temperatureInvalidCount++;
      console.log(HealthAnalisisService.temperatureInvalidCount);
      if (HealthAnalisisService.temperatureInvalidCount === 10) {
        await this.sendAlert(alertData as Alert);
        HealthAnalisisService.temperatureInvalidCount = 0;
      }
    } else {
      HealthAnalisisService.temperatureInvalidCount = 0;
    }
  }

  public async analyzeBloodOxygen(bloodOxygen: number) {
    let alertData;

    const [isOutsideNormal, thresholdType1] = this.isOutsideThreshold(
      bloodOxygen,
      this.bloodOxygenThresholds.normal
    );
    const [isOutsideCritical, thresholdType2] = this.isOutsideThreshold(
      bloodOxygen,
      this.bloodOxygenThresholds.critical
    );

    console.log(`Analyzing bloodOxygen ${bloodOxygen}`);

    if (isOutsideCritical) {
      alertData = {
        type: "Crítico",
        title:
          thresholdType2 == "max"
            ? "O Oxigénio no sangue está muito elevado."
            : "O Oxigénio no sangue está muito baixo.",
        description: `A Oxigénio no sangue  é: ${bloodOxygen}%`,
        isActive: true,
      };
    } else if (isOutsideNormal) {
      alertData = {
        type: "Atenção",
        title:
          thresholdType1 == "max"
            ? "O Oxigénio no sangue está elevado."
            : "O Oxigénio no sangue está baixo.",
        description: `O Oxigénio no sangue  é: ${bloodOxygen}%`,
        isActive: true,
      };
    }

    if (alertData) {
      HealthAnalisisService.bloodOxygenInvalidCount++;
      console.log(HealthAnalisisService.bloodOxygenInvalidCount);
      if (HealthAnalisisService.bloodOxygenInvalidCount === 10) {
        await this.sendAlert(alertData as Alert);
        HealthAnalisisService.bloodOxygenInvalidCount = 0;
      }
    } else {
      HealthAnalisisService.bloodOxygenInvalidCount = 0;
    }
  }

  private async sendAlert(alertData: Alert) {
    await this.alertService.createAlert(alertData, this.braceletId);
    if (alertData.type == "Crítico") {
      TwilioService.makeCall(
        `[Estado: ${alertData.type}], Título: [${alertData.title}], Descrição: [${alertData.description}]`,
        number
      );
    }
    TwilioService.sendSMS(
      `[Estado: ${alertData.type}], Título: [${alertData.title}], Descrição: [${alertData.description}]`,
      number
    );
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
