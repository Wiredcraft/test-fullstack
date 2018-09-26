'use strict';
const timeago = require('timeago.js');

const app = require('../../server/server');

module.exports = function(LightningTalk) {
  // hooks
  LightningTalk.beforeRemote('create', async function(ctx, user) {
    ctx.args.data.upCounts = 0;
    ctx.args.data.createdAt = Date.now();
  });

  LightningTalk.afterRemote('find', async function(ctx, lt) {
    if (!ctx.result) return;

    ctx.result.forEach((item) => {
      item.upped = false;
    });

    const ids = ctx.result.map((item) => item.id.toString());

    const UpRecord = app.models.UpRecord;
    const promises = ids.map((id) => {
      return UpRecord.findOne({
        where: {
          lightningTalkId: id
        },
        order: 'createdAt DESC'
      });
    });
    return Promise.all(promises).then((latestUpRecords) => {
      const latestUpMapping = {};
      if (latestUpRecords.length) {
        latestUpRecords.forEach((record) => {
          if (record) latestUpMapping[record.lightningTalkId] = record;
        });
      }

      ctx.result.forEach((item) => {
        const latestUp = latestUpMapping[item.id];
        if (latestUp) {
          item.uper = {
            username: latestUp.username,
            timeago: timeago().format(latestUp.createdAt.getTime())
          };
        }
      });
    }).then(() => {
      const token = ctx.req.accessToken;
      if (!token) return;
      const userId = token.userId.toString();

      return UpRecord.find({
        where: {
          and: [{
            lightningTalkId: { inq: ids },
          }, {
            userId: userId
          }]
        }
      }).then((myUpRecords) => {
        const myUpMapping = {};
        if (myUpRecords.length) {
          myUpRecords.forEach((record) => {
            myUpMapping[record.lightningTalkId] = record;
          });
        }

        ctx.result.forEach((item) => {
          if (myUpMapping[item.id]) {
            item.upped = true;
          }
        });
      });
    }).catch((err) => {
      return 'db error';
    });
  });

  // methods
  LightningTalk.up = function(id, options) {
    const UpRecord = app.models.UpRecord;
    const User = app.models.User;

    // IMPORTANT: forward the options arg
    return LightningTalk.findById(id, null, options).then(ltDoc => {
      if (!ltDoc) return 'data not exist';

      const token = options && options.accessToken;
      const userId = token.userId;
      return User.findById(userId).then((user) => {
        return UpRecord.create({
          userId,
          username: user.email,
          lightningTalkId: ltDoc.id,
          createdAt: new Date()
        });
      }).then(() => {
        LightningTalk.dataSource.settings.allowExtendedOperators = true;
        return ltDoc.updateAttributes({
          $inc: { upCounts: 1 }
        });
      }).then((result) => {
          if (result.count === 0) return 'data not existed';
          return 'success';
      });
    }).catch((err) => {
      return 'db error';
    });
  };

  LightningTalk.down = function(id, options) {
    const UpRecord = app.models.UpRecord;

    return LightningTalk.findById(id).then(ltDoc => {
      if (!ltDoc) return 'data not exist';

      const token = options && options.accessToken;
      const userId = token.userId.toString();
      return UpRecord.remove({
        userId,
        lightningTalkId: ltDoc.id.toString()
      }).then((result) => {
        if (result.count === 1) {
          LightningTalk.dataSource.settings.allowExtendedOperators = true;
          return ltDoc.updateAttributes({
            $inc: { upCounts: -1 }
          });
        }
      }).then((result) => {
          if (result.count === 0) return 'data not existed';
          return 'success';
      });
    }).catch((err) => {
      if (err) return 'db error';
    });
  };
};
