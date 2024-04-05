export interface ChargingPortObject { 

  chargingPointId: Number,
  chargingStationId: Number,
  rateNormalCharging: Number,
  supportsFastCharging: String,
  rateFastCharging: Number,
  supportsSuperFastCharging: String,
  rateSuperFastCharging: Number,
  status:String

}
