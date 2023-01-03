import utils from './index';

test('formatTime utils', () => {
  const result = utils.formatTime(1_672_584_872_000);
  expect(result).toBe('22:54 2023/0/1');
});
