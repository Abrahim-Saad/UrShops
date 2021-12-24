const db = require("../../../config/db.config");

let storeModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`store` ( `_id` VARCHAR(255) NOT NULL , `storeName` VARCHAR(150) NOT NULL , \
    `storeLogoURL` VARCHAR(255) NOT NULL , `telephoneNumber` VARCHAR(50) NOT NULL , `email` VARCHAR(150) NOT NULL , \
    PRIMARY KEY (`_id`)) ENGINE = InnoDB;");
}


let storeCategoriesModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`storecategories` ( `_id` VARCHAR(255) NOT NULL , `storeId` VARCHAR(255) NOT NULL , \
    `categoryId` VARCHAR(255) NOT NULL , PRIMARY KEY (`_id`) , FOREIGN KEY (`storeId`) REFERENCES `store`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE \
    , FOREIGN KEY (`categoryId`) REFERENCES `category`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB;");
}

module.exports = {
    storeModel,
    storeCategoriesModel
}