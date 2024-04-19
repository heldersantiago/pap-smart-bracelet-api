// import { Request, Response } from "express";
// import { Bracelet } from "../models/Bracelet";
// import { HealthAnalisisService } from "../services/HealthAnalisisService";
// import { AlertService } from "../services/AlertService";
// import { BraceletController } from "../controllers/BraceletController";
// import { Status } from "../enums/status";
// import { UpdateOptions } from "sequelize";

// jest.mock("../services/HealthAnalisisService");
// jest.mock("../services/AlertService");
// jest.mock("../models/Bracelet");

// describe("BraceletController", () => {
//   let controller: BraceletController;
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let healthAnalyzer: jest.Mocked<HealthAnalisisService>;
//   let alertService: jest.Mocked<AlertService>;
//   let bracelet: jest.Mocked<Bracelet>;

//   beforeEach(() => {
//     controller = new BraceletController();
//     healthAnalyzer = new HealthAnalisisService(new AlertService());
//     alertService = new AlertService();
//     bracelet = {
//       update: jest.fn(),
//     };

//     (Bracelet as jest.Mock).mockImplementation(() => bracelet);
//     (HealthAnalisisService as jest.Mock).mockImplementation(() => healthAnalyzer);
//     (AlertService as jest.Mock).mockImplementation(() => alertService);

//     req = {
//       params: {
//         id: "1",
//       },
//       body: {
//         blood_pressure: 120,
//         heart_rate: 70,
//         body_temperature: 37,
//       },
//     };

//     res = {
//       status: jest.fn().mockReturnThis,
//       json: jest.fn(),
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should update a bracelet and call healthAnalyzer", async () => {
//     await controller.update(req as Request, res as Response);

//     expect(bracelet.update).toHaveBeenCalledWith(
//       {
//         blood_pressure: 120,
//         heart_rate: 70,
//         body_temperature: 37,
//       },
//       {
//         where: {
//           id: "1",
//         },
//         limit: 1,
//       }
//     );

//     expect(healthAnalyzer.analyzeBloodPressure).toHaveBeenCalledWith(120);
//     expect(healthAnalyzer.analyzeHeartRate).toHaveBeenCalledWith(70);
//     expect(healthAnalyzer.analyzeTemperature).toHaveBeenCalledWith(37);

//     if (Number(bracelet.update.mock.results[0].value) > 0) {
//       expect(res.status).toHaveBeenCalledWith(Status.ACCEPTED);
//       expect(res.json).toHaveBeenCalledWith({ message: "success" });
//     } else {
//       expect(res.status).toHaveBeenCalledWith(Status.NOT_FOUND);
//       expect(res.json).toHaveBeenCalledWith({ message: "bracelet not found" });
//     }
//   });
// });