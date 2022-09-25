import { MigrationInterface, QueryRunner } from "typeorm";

export class fasfasa1664115024164 implements MigrationInterface {
    name = 'fasfasa1664115024164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "duration" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "duration"`);
    }

}
