import { LightningTalk } from "../src/entity/LightningTalk.entity";
import { DeleteResult, MigrationInterface, QueryRunner } from "typeorm";

const seeds = [
];

export class seed1646907234610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const lightningTalkRepo = await queryRunner.connection.getRepository(
      LightningTalk
    );
    const promises: Promise<LightningTalk>[] = seeds.map((seed) =>
      lightningTalkRepo.save(seed)
    );
    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const lightningTalkRepo = await queryRunner.connection.getRepository(
      LightningTalk
    );
    const promises: Promise<DeleteResult>[] = seeds.map((seed) =>
      lightningTalkRepo.delete(seed)
    );
    await Promise.all(promises);
  }
}
