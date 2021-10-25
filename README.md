# driver-assignment
 This project was (a lot of fun!) to build with React.js, Node.js, Express, and MongoDB.
 
 Other dependencies include:
 - React-Hook-Form
 - Font Awesome
 - Axios

## Set up for viewing
- Fork and clone this repository
- Use the `npm install` command in the root directory to install dependencies
- To setup access to the database, create a `config.env` file in the server directory with the following blurb, replacing `<myGitHubUsername>` with my github username and `<yourCompanyName>` with your company name (no spaces, all lowercase)
```
ATLAS_URI=mongodb+srv://<myGithubUsername>:<yourCompanyName>@cluster0.h4cne.mongodb.net/driverDataNew?retryWrites=true&w=majority
PORT=5000
```
- Run the server: run the development web server using the `npm start` command from within the server directory
- Run the client: run the development client using the `npx nodemon` command from within the client directory
- If the app does not run automatically, browse to http://localhost:3000/ in your browser of choice (Chrome recommended!)

## Known bugs:
- Occasional stutter/lag after dropping item in new driver table
- Drop location indicator of currently dragged item does not show up
- Number inputs in create / edit forms will not accept decimal points due to the "Number" type restriction as RegEx as pattern will not work (use whole numbers only) 
