import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigrations1731684444196 implements MigrationInterface {
    name = 'UserMigrations1731684444196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_reset_otps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT NOW(), "created_by" character varying, "updated_at" TIMESTAMP, "updated_by" character varying, "deleted_at" TIMESTAMP, "deleted_by" character varying, "otp" character varying, CONSTRAINT "PK_0b4f4c493a1ee383f93ff3a5017" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT NOW(), "created_by" character varying, "updated_at" TIMESTAMP, "updated_by" character varying, "deleted_at" TIMESTAMP, "deleted_by" character varying, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying, "avatar" character varying, "role" integer DEFAULT '10', "passwordResetOtpsId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "REL_a9263632bbd94d48a2df424e21" UNIQUE ("passwordResetOtpsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a9263632bbd94d48a2df424e21c" FOREIGN KEY ("passwordResetOtpsId") REFERENCES "password_reset_otps"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a9263632bbd94d48a2df424e21c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "password_reset_otps"`);
    }

}
