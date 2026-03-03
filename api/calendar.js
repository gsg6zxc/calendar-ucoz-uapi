export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ error: "Missing year or month" });
  }

  const formattedMonth = month.toString().padStart(2, "0");
  const date = `${year}-${formattedMonth}`;

  try {
    const response = await fetch(
      `https://yspexsnt.com/uapi/news?date=${date}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UCOZ_TOKEN}`,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
