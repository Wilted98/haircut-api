"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fasfas1664114806782 = void 0;
class fasfas1664114806782 {
    constructor() {
        this.name = 'fasfas1664114806782';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service" ADD "duration" integer NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "duration"`);
    }
}
exports.fasfas1664114806782 = fasfas1664114806782;
//# sourceMappingURL=1664114806782-fasfas.js.map