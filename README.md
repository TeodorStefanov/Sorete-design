
<h1>Sorete-Design-React.js</h1>

Sorete-Design Comfort and Elegance web site. Built as web project for the ReactJS fundamentals course at SoftUni.

It was generated with create-react-app, and used react and react-dom, and react-router-dom. All input forms are with validation of the entered information.

The Sorete-Design web application has three levels of access to it's content: registered user, guest user and Admin user roles are implemented.

After registration and subsequent successful validation of your Email you can Login to the system, a registered user is authorized to add products in Shopping cart. 

The guest user has access to general information about the site. All pages are public and visible to any visitor on Sorete-Design web site : "Products", "Details Product" "Register", "Login", "Contact us", "About us". But guest user cannot buy products.

On security reasons Admin user is only possible from backend, through changing the code. On default all users are isAdmin-false. The admin usur is authorized to upload new products.

The application is built entirely on latest JavaScript technologies: React.js (client side) and node.js (server side).

<h2>REST API and DB</h2>

The REST API of Sorete-Design is available in the repository. An open connection to MongoDB is required. An email registration is also needed.
.

<h2>Resolve Dependencies</h2>

When the project is cloned or downloaded, type in the terminal the following in both Server and Client directory:

<pre>

<code>npm / yarn install</code>

</pre>

<h2>Run the web server</h2>
add .env file in REST_API directory with following structure:
<pre>

<code>​
PORT=9000
PRIVATE_KEY=PROJECT-WORKSHOP-SOFTUNI
DATABASE_URL=Your mongoDB connection
EMAIL_SERVICE=Your email service using for email validation.
EMAIL_USER=Your email user
EMAIL_PASS=Your email password
EMAIL_ADMIN=Your email using to be send email from user.

</code>

</pre>
To run the server type in terminal the following:
<pre>
<code>npm start</code>
</pre>
<h2>Run the React app</h2>
The app uses React on client side. To run the React app type in terminal the following:
<pre>
<code>npm start</code>
</pre>
The app is running on:
<pre>
<code>localhost:3000</code>
</pre>
