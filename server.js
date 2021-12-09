const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');


PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/data', async (req, res) => {
	try{
	const teach		 = await db.all('SELECT * FROM instructor');
	const courses	 = await db.all('SELECT * FROM course');
	const sections	 = await db.all('SELECT * FROM course_instructor');
res.json({	teacher : teach,
			courses : courses,
			section : sections
			});
		}catch(e){
			console.log(e);
		}
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
