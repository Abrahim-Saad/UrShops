const db = require("../../../config/db.config");

let userModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`user` ( `_id` VARCHAR(255) NOT NULL , `firstName` VARCHAR(150) NOT NULL , \
    `lastName` VARCHAR(150) NOT NULL , `email` VARCHAR(150) NOT NULL , `password` VARCHAR(255) NOT NULL , \
    `profilePictureURL` VARCHAR(255) NULL DEFAULT NULL , `country` VARCHAR(90) NULL DEFAULT NULL , \
    `city` VARCHAR(90) NULL DEFAULT NULL , `street` VARCHAR(150) NULL DEFAULT NULL , \
    `role` VARCHAR(10) NOT NULL DEFAULT 'user' , PRIMARY KEY (`_id`)) ENGINE = InnoDB;");
}

let recoveryCodeModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`recoverycode` ( `_id` VARCHAR(255) NOT NULL , `userEmail` VARCHAR(150) NOT NULL , \
    `recoveryCode` BIGINT NOT NULL , PRIMARY KEY (`_id`)) ENGINE = InnoDB;");
}

let messageModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`message` ( `_id` VARCHAR(255) NOT NULL , `contactEmail` VARCHAR(150) NOT NULL , \
    `subject` VARCHAR(90) NOT NULL , `message` TEXT NOT NULL , PRIMARY KEY (`_id`)) ENGINE = InnoDB;");
}

module.exports = {
    userModel,
    recoveryCodeModel,
    messageModel
}