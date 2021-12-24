const db = require("../../../config/db.config");

let categoryModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`category` ( `_id` VARCHAR(255) NOT NULL, `categoryName` VARCHAR(75) NOT NULL , \
    `categoryImageURL` VARCHAR(255) NOT NULL , PRIMARY KEY (`_id`)) ENGINE = InnoDB;");
}

module.exports = {
    categoryModel
}