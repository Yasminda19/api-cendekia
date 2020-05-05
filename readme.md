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
*POST /api/auth/login*

2. register
*POST /api/auth/register*

2. logout
*GET /api/auth/logout*

wait did they actually are going to use this, arent we supposed to have different non integrated app as modules thingg
wait i just realised they actually call that miniscule service.


### some light reading
- [Building A Simple Single Sign On(SSO) Server And Solution From Scratch In Node.js](https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340)
- [Logout problems in SSO](https://doi.org/10.1016/j.jisa.2014.03.005)
