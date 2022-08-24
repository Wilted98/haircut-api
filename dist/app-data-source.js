"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    username: "postgres",
    password: "123",
    database: "haircut",
    entities: ["./dist/entities/*.{ts,js}"],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map