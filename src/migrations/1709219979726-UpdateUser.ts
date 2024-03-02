import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1709219979726 implements MigrationInterface {
    name = 'UpdateUser1709219979726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "photoUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "photoUrl"`);
    }

}
