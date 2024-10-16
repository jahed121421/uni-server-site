const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.get('/',(req, res)=>{
    res.send("Hello World")
})

const uri = "mongodb+srv://asif:1214214987@cluster0.qutetvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const database = client.db("university-data").collection("all-data");
    await client.connect();
    // Send a ping to confirm a successful connection
    app.get("/user-data", async (req, res) => {
        const result = await database.find().toArray();
        res.send(result);
      });

    app.post("/post", async(req, res)=>{
        const body = req.body;
        const result = await database.insertOne(body);
        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`example app listen frorm ${port}`);
})