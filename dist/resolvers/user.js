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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
let UserRegisterOptions = class UserRegisterOptions {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserRegisterOptions.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)({}),
    __metadata("design:type", String)
], UserRegisterOptions.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserRegisterOptions.prototype, "password", void 0);
UserRegisterOptions = __decorate([
    (0, type_graphql_1.InputType)()
], UserRegisterOptions);
let ErrorsField = class ErrorsField {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorsField.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorsField.prototype, "message", void 0);
ErrorsField = __decorate([
    (0, type_graphql_1.ObjectType)()
], ErrorsField);
let userResponse = class userResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ErrorsField], { nullable: true }),
    __metadata("design:type", Array)
], userResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], userResponse.prototype, "user", void 0);
userResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], userResponse);
let loginOptions = class loginOptions {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], loginOptions.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], loginOptions.prototype, "password", void 0);
loginOptions = __decorate([
    (0, type_graphql_1.InputType)()
], loginOptions);
let userResolver = class userResolver {
    async register(options, { em, req }) {
        const errors = [];
        if (options.username.length <= 2) {
            errors.push({
                field: "Username",
                message: "Username is too short!",
            });
        }
        if (options.password.length <= 3) {
            errors.push({
                field: "Password",
                message: "Password is too short!",
            });
        }
        if (options.email.length <= 3) {
            errors.push({
                field: "Email",
                message: "Email is too short!",
            });
        }
        if (!options.email.includes("@")) {
            errors.push({
                field: "Email",
                message: "Invalid email!",
            });
        }
        if (errors.length > 0) {
            return {
                errors,
            };
        }
        const checkIfExists = await em.findOne(User_1.User, { email: options.email });
        if (checkIfExists) {
            return {
                errors: [
                    {
                        message: "This email is aleardy taken",
                        field: "Email",
                    },
                ],
            };
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
        const user = em.create(User_1.User, {
            name: options.username,
            email: options.email,
            password: hashedPassword,
        });
        await em.persistAndFlush(user);
        req.session.userId = user.id;
        return {
            user,
        };
    }
    async getUsers({ em }) {
        const users = em.find(User_1.User, {});
        return users;
    }
    async me({ em, req }) {
        if (!req.session.userId) {
            return null;
        }
        const me = await em.findOne(User_1.User, { id: req.session.userId });
        return me;
    }
    async login({ em, req }, options) {
        const user = await em.findOne(User_1.User, { email: options.email });
        if (!user) {
            return {
                user: undefined,
                errors: [{ field: "Email", message: "This user doesn't exists!" }],
            };
        }
        const checkPassword = await argon2_1.default.verify(user.password, options.password);
        if (checkPassword) {
            req.session.userId = user.id;
            return {
                errors: undefined,
                user,
            };
        }
        else {
            return {
                errors: [
                    {
                        message: "Invalid email or password!",
                        field: "Email",
                    },
                ],
                user: undefined,
            };
        }
    }
    async logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie("qid");
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => userResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterOptions, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, loginOptions]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "logout", null);
userResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], userResolver);
exports.userResolver = userResolver;
//# sourceMappingURL=user.js.map