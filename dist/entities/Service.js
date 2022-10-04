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
exports.Service = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Salon_1 = require("./Salon");
var Currency;
(function (Currency) {
    Currency["LEI"] = "LEI";
    Currency["EUR"] = "EUROS";
    Currency["DOLLARS"] = "DOLLARS";
})(Currency || (Currency = {}));
let Service = class Service extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Currency,
        default: Currency.LEI,
    }),
    __metadata("design:type", String)
], Service.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Salon_1.Salon, (salon) => salon.services),
    (0, type_graphql_1.Field)(() => Salon_1.Salon, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: "salon_id",
    }),
    __metadata("design:type", Salon_1.Salon)
], Service.prototype, "salon", void 0);
Service = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Service);
exports.Service = Service;
//# sourceMappingURL=Service.js.map