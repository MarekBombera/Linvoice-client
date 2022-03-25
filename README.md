Linvoice - server -> https://github.com/MarekBombera/Linvoice-server/

# Linvoice - client

Linvoice is a full-stack SPA where users can create, update and delete invoices.

## How to use the app

- Log-in with your Google account
- Create a new invoice
- Click on the created invoice to view the whole invoice
- Edit, delete or mark the invoice as paid
- Filter invoices by their status
- Click on the profile pic to log-out

## Stack

- Front-end: React, Redux, Typescript, Sass
- Back-end: Node JS, Express, MySQL, Docker
- Testing: Jest, React Testing Library
- API: Google OAuth 2.0
- Cloud: AWS (EC2, RDS)

## How app works

### Client

Google OAuth is handled on the client-side and the app is just using client profile pic and client id.

The client's id is then sent to the server where the server fetches all invoices from the database associated with the client's id and returns the results back to the client.

Forms are made with Formik, React-Date-Picker and inputs are validated with Yup.

### Server

The server basically just fetches the desired data from the database and sends it back to the client.

The user's input and the whole post/patch request made from the client is validated to make sure nothing weird is being sent.

The server is using the Helmet package to help secure HTTP headers.

All data passed to query the database is escaped to prevent SQL injection.

### Cloud

The server is dockerized and deployed to AWS - EC2.

MySQL database is also deployed in AWS - RDS.

## Others

The reason why I made an app for invoices was to learn mainly these few things.

- How to handle forms with a lot of inputs and different input types
- Back-end technologies like Express, SQL database, Docker
- How to tie everything together to make a full-stack app

While testing I encountered a Formik bug https://github.com/jaredpalmer/formik/issues/1543 that just spams the whole console even if tests are passing.

I tried to stick with TDD as much as I could but at one point It became almost impossible and way too time-consuming to find an error with all that spam.

The app is built mobile-first with TDD in mind.
(although Formik made me stop writing tests and one point)
