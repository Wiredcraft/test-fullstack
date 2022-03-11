import { LightningTalk } from "../src/entity/LightningTalk.entity";
import { DeleteResult, MigrationInterface, QueryRunner } from "typeorm";

const seeds = [
  {
    title: "Bugs in Hello World",
    description: `Hello World might be the most frequently written computer program. For decades, it's been the first program many people write, when getting started in a new programming language.
    Surely, this humble starting-point program should be bug free, right?`,
    user: "Sunfishcode",
    date_created: "March 08, 2022",
    poll: 10,
  },
  {
    title: "How to get the most out of your 1:1s",
    description: `As a Director of Engineering, I have monthly 1:1s with all of my direct reports. A 1:1 (one-on-one) is a recurring meeting with no set agenda between a manager and one of their reports.`,
    user: "erik.wiffin",
    date_created: "Mar 06, 2022",
    poll: 9,
  },
  {
    title: "Ask Slashdot: How Powerful is Your Computer?",
    description: `All of us have, at one time or another, played the 'I remember when' game. For me it was 'I remember when the first accoustic coupler modems came out for the Apple II'.`,
    user: "Kurt",
    date_created: "Feb 18, 2022",
    poll: 6,
  },
  {
    title: "How can we know if paid search advertising works?",
    description: `Google is an interesting firm in that what it sells and what it does aren’t exactly the same thing. What it does is lower search costs through algorithms that match people with other people. But search is not what it sells, at least not exactly.`,
    user: "scott cunningham",
    date_created: "March 07, 2022",
    poll: 3,
  },
  {
    title: "Low Process Culture, High Process Culture",
    description: `When I changed jobs in 2020, I went from a low-process culture to a high-process culture (or: what I perceive as high-process, all things are relative). It was a bit of a culture shock.`,
    user: "Sunfishcode",
    date_created: "Feb 28, 2022",
    poll: 2,
  },
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
