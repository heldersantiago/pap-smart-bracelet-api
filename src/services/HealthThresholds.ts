export class HealthThreshold {
  // Private constructor to prevent instantiation
  private constructor() {}

  private static bloodPressureThresholds = {
    normal: {
      systolic: { min: 90, max: 120 },
      diastolic: { min: 60, max: 80 },
    },
    critical: {
      systolic: { min: 60, max: 150 },
      diastolic: { min: 40, max: 60 },
    },
  };

  private static temperatureThresholds = {
    normal: { min: 36.5, max: 37.5 },
    critical: { min: 35.5, max: 38.5 },
  };

  private static heartRateThresholds = {
    normal: { min: 60, max: 120 },
    critical: { min: 50, max: 150 },
  };

  public static getBloodPressureThresholds(): any {
    return HealthThreshold.bloodPressureThresholds;
  }

  public static getTemperatureThresholds(): any {
    return HealthThreshold.temperatureThresholds;
  }

  public static getHeartRateThresholds(): any {
    return HealthThreshold.heartRateThresholds;
  }
}
