const { model} = require("mongoose");

const { TravelPackageSchema } = require("../schemas/TravelPackageSchema")

const TravelPackageModel = new model("TravelPackage" , TravelPackageSchema)

module.exports = {TravelPackageModel} ; 