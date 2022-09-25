"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fasfasa1664115024164 = void 0;
class fasfasa1664115024164 {
    constructor() {
        this.name = 'fasfasa1664115024164';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service" ADD "duration" integer NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "duration"`);
    }
}
exports.fasfasa1664115024164 = fasfasa1664115024164;
//# sourceMappingURL=1664115024164-fasfasa.js.map