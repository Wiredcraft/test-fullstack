function feed(parent, args, context, info) {
  return context.prisma.links();
}

module.exports = {
  feed
};
