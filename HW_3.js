db.tracks.find({ tags: "new" }, { title: 1 , _id:0}).limit(2)
db.users.find({}, { name: 1, balance: 1 }).sort({ balance: 1 }).limit(1)
db.users.find({ balance: { $gt: 0 } }, { name: 1 ,_id:0})
db.users.aggregate([
    { $match: { balance: { $lt: 1000 } } },
    { $count: 'count befor 1000' }
])

// Агрегация использует конвейерную модель, где данные последовательно проходят через 
//   различные этапы обработки, называемые операторами.

//     Основные операторы агрегации включают $match (для фильтрации данных), 
//     $project (для проекции полей), $sort (для сортировки) и другие. 
//      Операторы объединяются в конвейер, 
//     где результат одного оператора передается следующему.
// Пример 

db.collection.aggregate([
  { $match: { field: { $gte: 100 } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
])
