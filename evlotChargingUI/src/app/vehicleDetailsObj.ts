export interface VehicleDetailsObject { 

    vehicleDetailId: Number,
    registrationNumber: String,
    vehicle:{
      vehicleId:Number,
      brandName:String,
      modelName:String,
      modelNumber:String,
      batteryCapacity:Number,
      supportsFastCharging:String,
      supportsSuperFastCharging:String,
      seatingCapacity:Number,
      drivingRange:Number
    }

}
