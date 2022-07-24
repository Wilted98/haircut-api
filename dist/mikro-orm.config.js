"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const constants_1 = require("./constants");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
exports.config = {
    entities: [User_1.User],
    dbName: "haircut",
    password: "123",
    type: "postgresql",
    debug: constants_1.__prod__,
    allowGlobalContext: true,
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts}",
    },
};
//# sourceMappingURL=mikro-orm.config.js.map