"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220716221114 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220716221114 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20220716221114 = Migration20220716221114;
//# sourceMappingURL=Migration20220716221114.js.map