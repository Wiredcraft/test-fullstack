import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTalksAndVotes1645201465621 implements MigrationInterface {
    name = 'AddTalksAndVotes1645201465621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "talkId" uuid NOT NULL, CONSTRAINT "PK_a3b4042b3d12fdd2b61308cae87" PRIMARY KEY ("userId", "talkId"))`);
        await queryRunner.query(`CREATE TABLE "talk" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "voteCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_0ff209b8f3268fa3bb8c6f50189" UNIQUE ("title"), CONSTRAINT "PK_645e0089c9f92048125eef3d8eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_8031ceec97b8f3dd743f14198b9" FOREIGN KEY ("talkId") REFERENCES "talk"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "talk" ADD CONSTRAINT "FK_39e08499e59d1c7c0adad1cbb9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talk" DROP CONSTRAINT "FK_39e08499e59d1c7c0adad1cbb9f"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_8031ceec97b8f3dd743f14198b9"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "talk"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
