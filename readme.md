## API

### sso
1. verify token
    - *GET /sso/verifyToken?ssoToken=token*

### broker
broker management

1. add broker
    - *POST /api/broker*
    - param: `name` `url`
2. delete broker
    - *DELETE /api/broker/{id}*
3. update broker
    - *PATCH /api/broker/{id}*
    - param: `name` `url`
4. list broker
    - *GET /api/broker*

### auth
buat register dan list user

1. login (jangan dipake)
    - *POST /api/auth/login*
    - param: `email` `password`
2. register
    - *POST /api/auth/register*
    - - param: `email` `password` `role` `name`
2. logout (jangan dipake)
    - *GET /api/auth/logout*

wait did they actually are going to use this, arent we supposed to have different non integrated app as modules thingg
wait i just realised they actually call that miniscule service.


### some light reading
- [Building A Simple Single Sign On(SSO) Server And Solution From Scratch In Node.js](https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340)
- [Logout problems in SSO](https://doi.org/10.1016/j.jisa.2014.03.005)
