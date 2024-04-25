import { Request, Response } from "express";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";

export class RolePermissionController {
  public async listRoles(req: Request, res: Response) {
    const roles = await Role.findAll<Role>();
    return roles;
  }
  public async listPermissions(req: Request, res: Response) {
    const permissions = await Permission.findAll<Permission>();
    return permissions;
  }
}
