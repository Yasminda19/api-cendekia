##  api for something with operation *get* *post* *put* *delete*
#### something as in just probably gonna need this for one operation or something, lets just make the api before even the design lads comes in
*somethingId as params*

1. Make new something
`POST /something`

2. Retrieve all something
`GET /something`

3. Retrieve one something
`*PUT /something/:somethingId`

4. update something
`PUT /something/:somethingId`

5. deleting an something
`DELETE /something/:somethingId`


### oh i also made auth token or something like that, with *register* *login* and *logout* endpoints. perhaps someone actually do it.

1. login
*POST /app/auth/login*

2. register
*POST /app/auth/register*

2. logout
*GET /app/auth/logout*
