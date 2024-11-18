import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateuserEntity1731687074305 implements MigrationInterface {
    name = 'UpdateuserEntity1731687074305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`);
    }

}
