
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;  

  try {
    let url = "https://yspexsnt.com/uapi/news/category";  

    if (id) {
      url += `/${id}`;  
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.UCOZ_TOKEN}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`uAPI error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Не удалось получить категории",
      details: error.message
    });
  }
}
