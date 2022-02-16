import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToUser1645024363538 implements MigrationInterface {
    name = 'AddNameToUser1645024363538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
