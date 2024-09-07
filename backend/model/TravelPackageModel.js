const { model} = require("mongoose");

const { TravelPackageSchema } = require("../schemas/TravelPackageSchema")

const TravelPackageModel = new model("Travel" , TravelPackageSchema)

module.exports = {TravelPackageModel} ; 