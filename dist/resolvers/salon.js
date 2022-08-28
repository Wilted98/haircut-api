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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salonResolver = void 0;
const Salon_1 = require("../entities/Salon");
const type_graphql_1 = require("type-graphql");
let salonResolver = class salonResolver {
    async createSalon(name) {
        const salon = await Salon_1.Salon.create({
            name: name,
        }).save();
        return salon;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Salon_1.Salon),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], salonResolver.prototype, "createSalon", null);
salonResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], salonResolver);
exports.salonResolver = salonResolver;
//# sourceMappingURL=salon.js.map