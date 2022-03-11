import { getConnection } from "typeorm";
import { LightningTalk } from "../entity/LightningTalk.entity";

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
];

export const lightningTalkSeed = async (): Promise<LightningTalk[]> => {
  const connection = await getConnection();
  const lightningTalkRepo = await connection.getRepository(LightningTalk);
  const promises: Promise<LightningTalk>[] = seeds.map((seed) =>
    lightningTalkRepo.save(seed)
  );
  return Promise.all(promises);
};
