import { MigrationInterface, QueryRunner } from "typeorm";

export class Update21709276520919 implements MigrationInterface {
  name = "Update21709276520919";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "created_time" TIMESTAMP NOT NULL DEFAULT now(), "messageId" uuid, CONSTRAINT "PK_2d64b690d92c5ffcfd162cec31c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "created_time" TIMESTAMP NOT NULL DEFAULT now(), "sender_id" uuid, "recipient_id" uuid, CONSTRAINT "REL_5e6c92cf7e83f784a8ad39c3a2" UNIQUE ("sender_id"), CONSTRAINT "REL_93544d7557593f67fb2522858e" UNIQUE ("recipient_id"), CONSTRAINT "PK_ecc722506c4b974388431745e8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Images" ADD CONSTRAINT "FK_d32682fec42e894c66d7343fc40" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Messages" ADD CONSTRAINT "FK_5e6c92cf7e83f784a8ad39c3a26" FOREIGN KEY ("sender_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Messages" ADD CONSTRAINT "FK_93544d7557593f67fb2522858e1" FOREIGN KEY ("recipient_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Messages" DROP CONSTRAINT "FK_93544d7557593f67fb2522858e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Messages" DROP CONSTRAINT "FK_5e6c92cf7e83f784a8ad39c3a26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Images" DROP CONSTRAINT "FK_d32682fec42e894c66d7343fc40"`,
    );
    await queryRunner.query(`DROP TABLE "Messages"`);
    await queryRunner.query(`DROP TABLE "Images"`);
  }
}
