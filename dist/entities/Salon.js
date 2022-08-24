"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salon = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Service_1 = require("./Service");
let Salon = class Salon extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.rating = 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Salon.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Salon.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Salon.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.salon),
    __metadata("design:type", Array)
], Salon.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Service_1.Service, (service) => service.salons),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Salon.prototype, "services", void 0);
Salon = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Salon);
exports.Salon = Salon;
//# sourceMappingURL=Salon.js.map