## API for something with operation _get_ _post_ _put_ _delete_

## Requirement Postman or Insomnia for testing our API.

`make sure to select the body on x-www-form-urlencoded`
`anything that has` _AUTH_ `on it means you should use the user latest JWT (user.tokens and see the latest generated token) on Authorization tab and select "Bearer Token" and paste the token on the text field.`

### Auth is needed to confirm if user already logged in

1. login
   route: _POST /api/auth/login_
   body: email (string), password (string)
   return: user model and its token
   note: if user already logged in, they will have a new JWT generated.

2. register
   route: _POST /api/auth/register_
   body: name (string), email (string), password (string), we got isAdmin (bool) and role (string) ["Siswa", "Tendik", "Guru", "Staff"] atributte just in case but we haven't use it yet.
   return: user model and its token

3. logout
   route: _GET /api/auth/logout_
   _AUTH_

4. logout all
   route: _GET /api/auth/logoutall_
   _AUTH_
   It's for logout-ing all user from the system, idk what is this for but its pretty OP.

`for` _forgot password_ `and` _reset password_ `you could try it on your browser as it is, no need to use Postman or Insomnia`

`we use a dummy email that sometimes need a lot of configuration of privacy and security to be used perfectly, you could check the email and password on user controller line 68-70`

5. forgot password
   it use a html page and feel free to enter the email that the password you wanted to reset.
   route: _/api/auth/forgot_password_
   body: email (string)
   return: an email, go check it on your inbox!

6. reset password
   it also use a html page, you could access it by clicking the link on your reset password email, you just need to fill the new password.
   route: _/api/auth/reset_password_
   body: reset_password]\_token
   return: json message "Passowrd reset"

### Post as in article, bulletin, news, etc. it could be multifunctional i guess as long is it a text. We havent add the option to add the media upload tho

_postId as params_

1. Make new post
   route: _POST `/api/auth/post`_
   _AUTH_
   body: title (string), content (string), category (number)
   return: the post itself

2. Retrieve all post
   route: _GET /api/auth/post_
   return: all the post that have been created

3. Retrieve one post
   route: _GET /api/auth/post/:postId_
   params: postId
   return: the post with that ID

4. Update post
   route:`PUT /api/auth/post/:postId`
   body: title (string), content (string), category (number)
   params: postId
   return: the post that has been updated with that ID

5. deleting an something
   route:`DELETE /api/auth/post/:postId`
   params:postId
   return: json message "Post telah success terhapus!"
