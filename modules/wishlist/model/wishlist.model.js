const db = require("../../../config/db.config");

let wishlistModel = () => {
    db.execute("CREATE TABLE IF NOT EXISTS `urshopsdb`.`wishlist` ( `_id` VARCHAR(255) NOT NULL , `userId` VARCHAR(255) NOT NULL , \
    `productId` VARCHAR(255) NOT NULL , PRIMARY KEY (`_id`), FOREIGN KEY (`userId`) REFERENCES `user`(`_id`) ON DELETE CASCADE \
    ON UPDATE CASCADE, FOREIGN KEY (`productId`) REFERENCES `product`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB;");
}

module.exports = {
    wishlistModel
}