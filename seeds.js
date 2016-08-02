var mongoose = require("mongoose");

var data = [
    {
    number: 1,
    name: "Black Box",
    WBS: "1.4",
    image: "Place",
    domain: "avionics",
    responsibleEngineer: "Tony",
    stage: "fs",
    description: "A telemetry recording box",
    quantity: 2,
    FTU: 2,
    EDU: 2,
    GTU: 3,
    MM_DM: 2,
    makeVsBuy: "make",
    weight: 1000,
    power: 500,
    size: "3x5x7",
    vendor: "SpaceMicro",
    cost: 5000,
    },
    
    {
    number: 2,
    name: "Rocket Fuel",
    WBS: "1.4.5",
    image: "Place",
    domain: "propulsion",
    responsibleEngineer: "Mark",
    stage: "fs",
    description: "Rocket fuel for flight",
    quantity: 1,
    FTU: 2,
    EDU: 2,
    GTU: 3,
    MM_DM: 2,
    makeVsBuy: "buy",
    weight: 10000,
    power: 0,
    size: "100x56x4",
    vendor: "OATK",
    cost: 10000,
    },
    
    {
    number: 3,
    name: "Nozzle",
    WBS: "1.4.3",
    image: "Place",
    domain: "Propulsion",
    responsibleEngineer: "Mark",
    stage: "fs",
    description: "Large Nozzle for flight",
    quantity: 2,
    FTU: 2,
    EDU: 2,
    GTU: 3,
    MM_DM: 2,
    makeVsBuy: "make",
    weight: 2400,
    power: 0,
    size: "3x5x6",
    vendor: "OATK",
    cost: 5000,
    },
    
    {
    number: 4,
    name: "Cableing",
    WBS: "1.4.6.7",
    image: "Place",
    domain: "avionics",
    responsibleEngineer: "Tony",
    stage: "fs",
    description: "Eithernet run cableing",
    quantity: 2,
    FTU: 2,
    EDU: 2,
    GTU: 3,
    MM_DM: 2,
    makeVsBuy: "buy",
    weight: 5,
    power: 1000,
    size: "100x1",
    vendor: "SpaceMicro",
    cost: 5000,
    },
    
    ]

function seedDB(Component){
    //Remove Components
    Component.remove({},function(err){
            if(err){
                console.log(err);
        } else {
            console.log("Components removed!");
        }
    });
    
    //Create Component seeds
    data.forEach(function(seed){
        Component.create(seed, function(err){
            if(err){
                console.log(err)
            } else {
                console.log("Created Component");
            }
        });
    });
    
    
};

module.exports = seedDB;