const express = require("express");
const app = express();

const db = require("./database");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/redeem", async (req, res) => {
  const { promocode } = req.body;

  // เช็คว่า promocode เติมได้
  const result = await db.query(
    "SELECT * FROM code WHERE promocode = ? AND status = 0",
    [promocode]
  );

  if (result.length > 0) {
    // อัพเดท point
    await db.query("UPDATE user SET point = point + ? WHERE user_id = 1", [
      result[0].value,
    ]);

    // อัพเดทว่าสถานะว่าเติมไปแล้ว
    await db.query("UPDATE code SET status = 1 WHERE promocode = ? ", [
      promocode,
    ]);

    res.json({ result });
  } else {
    res.json({ status: false, message: "" });
  }
});

app.listen(3000, console.log("Start API Port 3000"));
