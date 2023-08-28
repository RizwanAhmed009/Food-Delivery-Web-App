// const mongoose = require("mongoose");
// const DBUrl =
//   "mongodb+srv://gofood:gofood123@cluster0.dwxp306.mongodb.net/gofoodmern?retryWrites=true&w=majority";
// const mongoDB = async () => {
//   try {
//     await mongoose.connect(
//       DBUrl,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//       async (result, err) => {
//         if (err) console.log("--", err);
//         else {
//           console.log("connected");
//           const fecth_data = await mongoose.connection.db.collection(
//             "food_items"
//           );
//           fecth_data.find({}).toArray(async function (err, data) {
//           const FoodCategory = await mongoose.connection.db.collection("category")
//           FoodCategory.find({}).toArray(async function (err, catdata){
//             if(err) console.log("--",err)
//             else{
//               global.food_items = data;
//               global.FoodCategory= catdata;
//           }})
           

//           });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// };

// module.exports = mongoDB;

const mongoose = require("mongoose");
const DBUrl = "mongodb+srv://gofood:gofood123@cluster0.dwxp306.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(DBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    const fecth_data = await mongoose.connection.db.collection("food_items");
    const data = await fecth_data.find({}).toArray();

    const FoodCategory = await mongoose.connection.db.collection("category");
    const catdata = await FoodCategory.find({}).toArray();

    global.food_items = data;
    global.FoodCategory = catdata;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = mongoDB ;

