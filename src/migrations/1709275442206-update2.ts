import { MigrationInterface, QueryRunner } from "typeorm";

export class Update21709275442206 implements MigrationInterface {
    name = 'Update21709275442206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Images" DROP CONSTRAINT "FK_d32682fec42e894c66d7343fc40"`);
        await queryRunner.query(`ALTER TABLE "Images" RENAME COLUMN "messageId" TO "message_id"`);
        await queryRunner.query(`ALTER TABLE "Images" ADD CONSTRAINT "FK_380f1b9c3d89878f173fd331625" FOREIGN KEY ("message_id") REFERENCES "Messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Images" DROP CONSTRAINT "FK_380f1b9c3d89878f173fd331625"`);
        await queryRunner.query(`ALTER TABLE "Images" RENAME COLUMN "message_id" TO "messageId"`);
        await queryRunner.query(`ALTER TABLE "Images" ADD CONSTRAINT "FK_d32682fec42e894c66d7343fc40" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
