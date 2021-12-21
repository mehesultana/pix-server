const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b4chv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
	try {
		await client.connect();
		// console.log('connected');
		const database = client.db('pix');
		const servicesCollection = database.collection('services');
		const blogsCollection = database.collection('blogs');
		const ratingsCollection = database.collection('ratings');

		// Add services API
		app.get('/services', async (req, res) => {
			const cursor = servicesCollection.find({});
			const services = await cursor.toArray();
			res.send(services);
		});

		// post API
		app.post('/services', async (req, res) => {
			const service = req.body;

			console.log('hit the post api', service);
			const result = await servicesCollection.insertOne(service);
			console.log(result);
			res.json(result);
		});
		// Add blogs API
		app.get('/blogs', async (req, res) => {
			const cursor = blogsCollection.find({});
			const blogs = await cursor.toArray();
			res.send(blogs);
		});

		// post API
		app.post('/blogs', async (req, res) => {
			const blog = req.body;

			console.log('hit the post api', blog);
			const result = await blogsCollection.insertOne(blog);
			console.log(result);
			res.json(result);
		});
		// Add ratings API
		app.get('/ratings', async (req, res) => {
			const cursor = ratingsCollection.find({});
			const ratings = await cursor.toArray();
			res.send(ratings);
		});

		// post API
		app.post('/ratings', async (req, res) => {
			const rating = req.body;

			console.log('hit the post api', rating);
			const result = await ratingsCollection.insertOne(rating);
			console.log(result);
			res.json(result);
		});
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Hello !');
});

app.listen(port, () => {
	console.log('listening at', port);
});
