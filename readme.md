## API

### sso
1. verify token
    - *GET /sso/verifyToken?ssoToken=token*
    - header: `Authorization: Bearer brokertoken`

### broker
broker management

Broker management interface :
https://sso.kato.studio/broker

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

1. login 
    - *POST /api/auth/login*
    - param: `email` `password`
2. register
    - *POST /api/auth/register*
    - param: `email` `password` `role` `name`
3. logout 
    - *GET /api/sso/logout
4. list
    - *GET /api/auth*
    - header: `Authorization: Bearer brokertoken`
5. search
    - *GET /api/auth?q={"role": "pembina"}*
    - header: `Authorization: Bearer brokertoken`

### some light reading
- [Building A Simple Single Sign On(SSO) Server And Solution From Scratch In Node.js](https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340)
- [Logout problems in SSO](https://doi.org/10.1016/j.jisa.2014.03.005)
