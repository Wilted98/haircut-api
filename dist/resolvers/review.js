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
exports.reviewResolver = void 0;
const Review_1 = require("../entities/Review");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let ReviewOptions = class ReviewOptions {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReviewOptions.prototype, "postedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(5, 200),
    __metadata("design:type", String)
], ReviewOptions.prototype, "comment", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(1, 5),
    __metadata("design:type", Number)
], ReviewOptions.prototype, "rating", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReviewOptions.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReviewOptions.prototype, "salon", void 0);
ReviewOptions = __decorate([
    (0, type_graphql_1.InputType)()
], ReviewOptions);
let reviewResolver = class reviewResolver {
    async createReview(options) {
        const review = await Review_1.Review.create({
            postedBy: options.postedBy,
            comment: options.comment,
            rating: options.rating,
            user: { id: options.user },
            salon: { id: options.salon },
        }).save();
        return review;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Review_1.Review),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReviewOptions]),
    __metadata("design:returntype", Promise)
], reviewResolver.prototype, "createReview", null);
reviewResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], reviewResolver);
exports.reviewResolver = reviewResolver;
//# sourceMappingURL=review.js.map