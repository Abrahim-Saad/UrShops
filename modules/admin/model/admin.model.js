const db = require("../../../config/db.config");

let adminModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`admin` ( `_id` VARCHAR(255) NOT NULL , `firstName` VARCHAR(35) NOT NULL , \
    `lastName` VARCHAR(35) NOT NULL , `userName` VARCHAR(20) NOT NULL , `password` VARCHAR(50) NOT NULL , \
    `role` VARCHAR(20) NOT NULL DEFAULT 'admin' , PRIMARY KEY (`_id`)) ENGINE = InnoDB;");
}

module.exports = {
    adminModel
}