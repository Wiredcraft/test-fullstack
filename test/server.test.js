const Model = require('../servers/model');

const create_talk = function(rank=0) {
  const time = new Date().getTime();
  return {
    user_id: `user_${time}`,
    title: `title_${time}`,
    content: `content_${time}`,
    rank: rank,
    created_at: time
  }
};

test('Test sort talks by rank', () => {
  const talk1 = create_talk(0);
  const talk2 = create_talk(3);
  const talk3 = create_talk(1);
  const talk4 = create_talk(8);

  let talks = [
    talk1,
    talk2,
    talk3,
    talk4,
  ]

  expect(Model.sortTalks(talks)).toStrictEqual([
    talk4,
    talk2,
    talk3,
    talk1,
  ]);
});


test('Test sort talks by created_at', () => {
  const talk1 = create_talk(0);
  const talk2 = create_talk(0);
  const talk3 = create_talk(0);
  const talk4 = create_talk(0);

  let talks = [
    talk1,
    talk2,
    talk3,
    talk4,
  ]

  expect(Model.sortTalks(talks)).toStrictEqual([
    talk1,
    talk2,
    talk3,
    talk4,
  ]);
});


test('Test sort talks by rank and created_at', () => {
  const talk1 = create_talk(5);
  const talk2 = create_talk(0);
  const talk3 = create_talk(0);
  const talk4 = create_talk(0);

  let talks = [
    talk1,
    talk2,
    talk3,
    talk4,
  ]

  expect(Model.sortTalks(talks)).toStrictEqual([
    talk1,
    talk4,
    talk3,
    talk2,
  ]);
});
