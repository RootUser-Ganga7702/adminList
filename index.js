const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "adminListTable.db");
let db;

const initializeServerAndDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server is running at http://localhost:3001");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
  }
};

initializeServerAndDB();

app.post("/adminListTableCreateEx/", async (request, response) => {
  const createTableQuery = `
        CREATE TABLE adminTableList(
            id INTEGER,
            imageUrl VARCHAR(200),
            companyName VARCHAR(200),
            role VARCHAR(200),
            date VARCHAR(200),
            jobType VARCHAR(200),
            workLocation VARCHAR(200),
            skills VARCHAR(200)
            );`;
  const tableCreateResponse = await db.run(createTableQuery);
  response.send("Table Created Successfully");
});

app.post("/insertAdminListDetailsEx/", async (request, response) => {
  const insertAdminListQuery = `
        INSERT INTO 
            adminTableList(id,imageUrl,companyName,role,date,jobType,workLocation,skills)
        VALUES 
            (1,"https://k4ung14.netlify.app/images/photosnap.svg","Photosnap","Senior Frontend Developer","1d ago","Full Time","USA Only","Frontend Senior HTML CSS JavaScript"),
            (2,"https://k4ung14.netlify.app/images/manage.svg","Manage","Fullstack Developer","1d ago","Part Time","Remote","Fullstack Midweight Python React"),
            (3,"https://k4ung14.netlify.app/images/account.svg","Account","Junior Frontend Developer","2d ago","Part Time","USA Only","Frontend Junior JavaScript React Sass"),
            (4,"https://k4ung14.netlify.app/images/myhome.svg","MyHome","Junior Frontend Developer","5d ago","Contract","USA Only","Frontend Junior CSS JavaScript"),
            (5,"https://k4ung14.netlify.app/images/loop-studios.svg","Loop Studios","Software Engineer","1w ago","Full Time","Worldwide","Fullstack Midweight JavaScript Ruby Sass"),
            (6,"https://k4ung14.netlify.app/images/faceit.svg","FaceIt","Junior Backend Developer","2w ago","Full Time","UK Only","Backend Junior Ruby RoR"),
            (7,"https://k4ung14.netlify.app/images/shortly.svg","Shortly","Junior Developer","2w ago","Full Time","Worldwide","Frontend Junior HTML JavaScript Sass"),
            (8,"https://k4ung14.netlify.app/images/insure.svg","Insure","Junior Frontend Developer","2w ago","Full Time","USA Only","Frontend Junior JavaScript Vue Sass"),
            (9,"https://k4ung14.netlify.app/images/eyecam-co.svg","Eyecam Co.","Fullstack Engineer","3w ago","Full Time","Worldwide","Fullstack Midweight JavaScript Python Django"),
            (10,"https://k4ung14.netlify.app/images/the-air-filter-company.svg","The Air Filter Company","Front-end Dev","1mo ago","Part Time","Worldwide","Frontend Junior JavaScript ReactSass");`;

  const insertAdminDetailsRes = await db.run(insertAdminListQuery);
  response.send("Successfully inserted admin list details");
});

app.get("/insertAdminListDetailsEx/", async (request, response) => {
  const getAdminListQuery = `
    SELECT * 
    FROM adminTableList`;
  const getAdminListResponse = await db.all(getAdminListQuery);
  response.send(getAdminListResponse);
});
