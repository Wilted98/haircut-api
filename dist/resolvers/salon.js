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
const app_data_source_1 = require("../app-data-source");
let salonResolver = class salonResolver {
    async createSalon(name) {
        const salon = await Salon_1.Salon.create({
            name: name,
        }).save();
        return salon;
    }
    async getSalon(id) {
        const salon = await Salon_1.Salon.findOne({
            where: { id },
            relations: {
                services: true,
                users: true,
            },
        });
        return salon;
    }
    async getAllSalons() {
        const salons = await app_data_source_1.myDataSource
            .createQueryBuilder(Salon_1.Salon, "salon")
            .leftJoinAndSelect("salon.review", "review")
            .getMany();
        salons.forEach((item) => (item.rating =
            item.review.reduce((prev, curr) => prev + curr.salon_rating, 0) /
                item.review.length));
        return salons;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Salon_1.Salon),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], salonResolver.prototype, "createSalon", null);
__decorate([
    (0, type_graphql_1.Query)(() => Salon_1.Salon, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], salonResolver.prototype, "getSalon", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Salon_1.Salon], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], salonResolver.prototype, "getAllSalons", null);
salonResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], salonResolver);
exports.salonResolver = salonResolver;
//# sourceMappingURL=salon.js.map