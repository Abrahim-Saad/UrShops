const db = require("../../../config/db.config");

let productModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`product` ( `_id` VARCHAR(255) NOT NULL , `productName` VARCHAR(150) NOT NULL , \
    `productImageURL` VARCHAR(150) NOT NULL , `price` BIGINT NOT NULL , `rate` INT NULL DEFAULT '0' ,  \
    `inStock` BOOLEAN NULL DEFAULT TRUE , `topProduct` BOOLEAN NULL DEFAULT FALSE , `storeId` VARCHAR(255) NOT NULL , \
    `categoryId` VARCHAR(255) NOT NULL , PRIMARY KEY (`_id`), FOREIGN KEY (`storeId`) \
    REFERENCES `store`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`categoryId`) REFERENCES `category`(`_id`) \
    ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB;");
}

module.exports = {
    productModel
}
