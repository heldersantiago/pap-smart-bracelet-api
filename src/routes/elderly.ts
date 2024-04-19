import { ElderlyController } from "../controllers/ElderlyController";
import { BraceletController } from "../controllers/BraceletController";

export class ElderlyRoutes {
  private readonly apiUrl: string = "/api/v1/users/elderlies";
  public elderlyController: ElderlyController = new ElderlyController();
  public braceletController: BraceletController = new BraceletController();

  public routes(app: any): void {
    /**
     * @openapi
     * /users/elderlies:
     *   get:
     *     summary: Get all Elderlies Users
     *     description: Get all Elderlies.
     *     responses:
     *       '200':
     *         description: A successful response
     *       '500':
     *         description: Internal server error
     */
    app.get(this.apiUrl, this.elderlyController.index);
    /**
     * @openapi
     * /users/elderlies:
     *   post:
     *     summary: Create a new Elderly User
     *     description: Creates a new elderly user.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the elderly user.
     *               email:
     *                 type: string
     *                 description: The name of the elderly user.
     *               password:
     *                 type: string
     *                 description: The name of the elderly user.
     *               phone:
     *                 type: string
     *                 description: The name of the elderly user.
     *               role_id:
     *                 type: integer
     *                 description: The name of the elderly user.
     *             required:
     *               - name
     *               - email
     *               - password
     *               - phone
     *               - role_id
     *     responses:
     *       '200':
     *         description: A successful response
     *       '500':
     *         description: Internal server error
     */

    app.post(this.apiUrl, this.elderlyController.create);
    app
      .route(this.apiUrl + "/:id")
      .get(this.elderlyController.show)
  }
}
