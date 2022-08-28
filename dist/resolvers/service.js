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
exports.serviceResolver = void 0;
const Service_1 = require("../entities/Service");
const type_graphql_1 = require("type-graphql");
const Salon_1 = require("../entities/Salon");
let ServiceOptions = class ServiceOptions {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ServiceOptions.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ServiceOptions.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ServiceOptions.prototype, "salonID", void 0);
ServiceOptions = __decorate([
    (0, type_graphql_1.InputType)()
], ServiceOptions);
let serviceResolver = class serviceResolver {
    async createService(options) {
        const salon = await Salon_1.Salon.findOneBy({ id: options.salonID });
        if (salon) {
            return await Service_1.Service.create({
                name: options.name,
                price: options.price,
                salon,
            }).save();
        }
        return { message: "This salon doesn't exists" };
    }
    async getServices() {
        return await Service_1.Service.find({});
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Service_1.Service),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ServiceOptions]),
    __metadata("design:returntype", Promise)
], serviceResolver.prototype, "createService", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Service_1.Service]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], serviceResolver.prototype, "getServices", null);
serviceResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], serviceResolver);
exports.serviceResolver = serviceResolver;
//# sourceMappingURL=service.js.map