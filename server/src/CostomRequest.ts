import { Request } from "express";

export interface CostomRequest extends Request {
  AccessTokenSecret: string;
  RefreshTokenSecret: string;
  userId?: string ;
}