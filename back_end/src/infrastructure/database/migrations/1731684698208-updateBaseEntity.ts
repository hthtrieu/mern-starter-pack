import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBaseEntity1731684698208 implements MigrationInterface {
    name = 'UpdateBaseEntity1731684698208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a9263632bbd94d48a2df424e21c"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP CONSTRAINT "PK_0b4f4c493a1ee383f93ff3a5017"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD CONSTRAINT "PK_0b4f4c493a1ee383f93ff3a5017" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_a9263632bbd94d48a2df424e21"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetOtpsId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetOtpsId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a9263632bbd94d48a2df424e21c" UNIQUE ("passwordResetOtpsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a9263632bbd94d48a2df424e21c" FOREIGN KEY ("passwordResetOtpsId") REFERENCES "password_reset_otps"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a9263632bbd94d48a2df424e21c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a9263632bbd94d48a2df424e21c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetOtpsId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetOtpsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_a9263632bbd94d48a2df424e21" UNIQUE ("passwordResetOtpsId")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP CONSTRAINT "PK_0b4f4c493a1ee383f93ff3a5017"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD CONSTRAINT "PK_0b4f4c493a1ee383f93ff3a5017" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a9263632bbd94d48a2df424e21c" FOREIGN KEY ("passwordResetOtpsId") REFERENCES "password_reset_otps"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
