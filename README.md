<h1 style='text-align: center;'>Vacancies</h1>
<h3 style='text-align: center'>This project is a set of two microservices that can be used for job postings for 
any organisation. It is based on Nestjs and MongoDB
</h3>
<h4 style='text-align: center; font-weight: 900'>Note: Since MongoDB is hosted on free tier of Mongodb service, the application amy take a minute or two to connect to the database.</h4>
<h3>It consists on two microservices</h3>
<ul>
<li>Authentication</li>
<li>Vacancies</li>
</ul>
<div id='auth'>
<h2>Authentication</h2>
<p>Authentication service is a microservice that allows users to sign up and log in to access vacancies apis. It is a rest service.</p>
<h3>Steps to use:</h3>
<ul>
<li>
<code>cd authentication/</code>

</li>
<li>
<code>sudo sh init.sh</code>

</li>

</ul>
<h3>What it does</h3>
<p>It starts a dockerized container for authentication service that is running on <code>http://localhost:8000</code> and the api endpoint lives on <code>
/auth/**</code>.</p>
<h4><code>/login</code> endpoint:</h4>
<p>This endpoint is a <strong>post</strong> request and can be used for logging in to the server.</p>
<h4>request body:</h4>
<table>
<thead>

<tr>
<th>name</th>
<th>type</th></tr>

</thead>
    <tbody>
    <tr>
    <td>username</td>
<td>string</td>
</tr>
 <tr>
    <td>password</td>
<td>string</td>
</tr>

</tbody>
</table>
<h4>What it returns:</h4>
<p>It returns a <code>JSON</code>object containing an access token. This token contains username and role and is valid for one hour if the request is successful. If the credentials are invalid then it return status of <code>401</code>.</p>
<h4><code>/signup</code> endpoint:</h4>
<p>This endpoint is a <strong>post</strong> request and can be used for logging in to the server.</p>
<h4>request body:</h4>
<table>
<thead>

<tr>
<th>name</th>
<th>type</th></tr>

</thead>
    <tbody>
    <tr>
    <td>username</td>
<td>string</td>
</tr>
 <tr>
    <td>password</td>
<td>string</td>
</tr>
<tr>
    <td>role</td>
<td>string</td>
</tr>

</tbody>
</table>
The role can be one of <code>admin</code> or <code>user</code>
<h4>What it returns:</h4>
<p>It returns a <code>JSON</code>object containing an access token. This token contains username and role and is valid for one hour if the request is successful. If the username is already taken then it returns a status of <code>409</code>.</p>

</div>
<div>
<h2>Vacancies</h2>
<p>
This is a microservice that allows users to view, edit, create or delete a vacancies. It is a protected microservice meaning that it can only be accessed if the user has a valid access token. To how to generate token, see <a href='#auth'>Authentication</a>
This is a graphql api.

</p>
<h3>Steps to use:</h3>
<ul>
<li>
<code>cd vacancies/</code>

</li>
<li>
<code>sudo sh init.sh</code>

</li>

</ul>
<h3>What it does</h3>
<p>It starts a dockerized container for vacancies service that is running on <code>http://localhost:8080</code> and the api endpoint lives on <code>
/graphql</code>.</p>
It consists of <code>2 queries</code> and <code>3 mutations</code>
<h4>To run the queries or mutations, we will need to pass token generated in <a href='#auth'>authentication</a> in the headers</h4>
<h3>
Mutations:
</h3>
<ul>
<li>addVacancy

</li>
input format:<br/> <code>
{<br/>
mutation { <br/>
addVacancy(input:{title:"job1",jobDescription:"desc",datePosted:"date"}){
<br/>
    id,<br/>
    title,<br/>
    jobDescription,<br/>
    datePosted<br/>
  }<br/>
}
</code>

<li>deleteVacancy</li>
input format:<br/> <code>
{<br/>
mutation { <br/>
deleteVacancy(id:"<code>id</code>"){
<br/>
    id,<br/>
  }<br/>
}
</code>


<li>
updateVacancy
</li>
input format:<br/> <code>
{<br/>
mutation { <br/>
updateVacancy(input:{id:"<code>id</code>" ,title:"job1 updated",jobDescription:"desc updated",datePosted:"date updated"}){
<br/>
    id,<br/>
  }<br/>
}
</code>
</ul>


<h3>Queries</h3>
<ul>
<li>getAllVacancies</li>
input format:<br/> <code>
{<br/>
query { <br/>
getAllVacancies{
<br/>
    id,<br/>
    title,<br/>
    jobDescription,<br/>
    datePosted<br/>
  }<br/>
}
</code>
<li>findOne</li>
input format:<br/> <code>
{<br/>
query { <br/>
findOne(id: "<code>id</code>"){
<br/>
    id,<br/>
    title,<br/>
    jobDescription,<br/>
    datePosted<br/>
  }<br/>
}
</code>
</ul>
</div>

<h2>Testing</h2>
To run tests:
<br/>

<ul>
<li><code>cd authentication/</code></li>
<li><code>npm run test: watch</code> or <code>npm run test</code></li>
</ul>







