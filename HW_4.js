вывести две случайных eur-транзакции

db.txs.aggregate([
  {
    $match: {
      currency: "eur"
    }
  },
  {
    $sample: {
      size: 2
    }
  }
]);

вывести юзеров, которые не отправляли средства (не делали транзакции)

db.clients.aggregate([
  {
    $lookup: {
      from: "txs",
      localField: "_id",
      foreignField: "sender_id",
      as: "userTransactions"
    }
  },
  {
    $match: {
      userTransactions: { $size: 0 }
    }
  }
]);

db.clients.aggregate([
  {
    $lookup: {
      from: "txs",
      localField: "_id",
      foreignField: "sender_id",
      as: "userTransactions"
    }
  },
  {
    $match: {
      userTransactions: { $size: 0 }
    }
  }
]);


вывести сумму отправленных EUR-транзакций для каждого юзера

db.clients.aggregate([
  {
   $lookup: {
      from: "txs",
      localField: "_id",
      foreignField: "sender_id",
      as: "userTransactions"
    }
  },
  {
    $unwind: "$userTransactions" 
  },
  {
    $match: {
      "userTransactions.currency": "eur"
    }
  },
  {
    $group: {
      _id: "$_id", 
      fullname: { $first: "$fullname" }, 
      totalSentEur: { $sum: "$userTransactions.amount" } 
    }
  }
]);
