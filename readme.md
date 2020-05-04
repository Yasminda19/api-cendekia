## API for something with operation _get_ _post_ _put_ _delete_

## Requirement Postman or Insomnia for testing our API.

_make sure to select the body on x-www-form-urlencoded_
_anything that has_ `AUTH` _on it means you should use the user latest JWT (user.tokens and see the latest generated token) on Authorization tab and select "Bearer Token" and paste the token on the text field._

### Auth is needed to confirm if user already logged in.

1. **LOGIN**  
   route: `POST /api/auth/login`  
   body: email (string), password (string)  
   return: user model and its token  
   note: if user already logged in, they will have a new JWT generated.  

2. **REGISTER**  
   route: `POST /api/auth/register`  
   body: name (string), email (string), password (string), we got isAdmin (bool) and role (string) ["Siswa", "Tendik", "Guru", "Staff"] atributte just in case but we haven't use it yet.  
   return: user model and its token  

3. **LOGOUT**  
   route: `GET /api/auth/logout`  
   `AUTH`  

4. **LOGOUT ALL**  
   route: `GET /api/auth/logoutall`  
   `AUTH`  
   It's for logout-ing all user from the system, idk what is this for but its pretty OP.  

_for_ `forgot password` _and_ `reset password` _you could try it on your browser as it is, no need to use Postman or Insomnia_  

_we use a dummy email that sometimes need a lot of configuration of privacy and security to be used perfectly, you could check the email and password on user controller line 68-70_  

5. **FORGOT PASSWORD**  
   it use a html page and feel free to enter the email that the password you wanted to reset.  
   route: `/api/auth/forgot_password`  
   body: email (string)  
   return: an email, go check it on your inbox!  

6. **RESET PASSWORD**  
   it also use a html page, you could access it by clicking the link on your reset password email, you just need to fill the new password.  
   route: `/api/auth/reset_password`  
   body: reset_password_token  
   return: json message "Password reset"  

### Post as in article, bulletin, news, etc. it could be multifunctional i guess as long is it a text. We havent add the option to add the media upload tho

_postId as params_  

1. **MAKE NEW POST**  
   route: _POST `/api/auth/post`  
   `AUTH`  
   body: title (string), content (string), category (number)  
   return: the post itself  

2. **RETRIEVE ALL POST**  
   route: `GET /api/auth/post`  
   return: all the post that have been created  

3. **RETRIEVE ONE POST**
   route: `GET /api/auth/post/:postId`  
   params: postId  
   return: the post with that ID  

4. **UPDATE POST**
   route:`PUT /api/auth/post/:postId`  
   body: title (string), content (string), category (number)  
   params: postId  
   return: the post that has been updated with that ID  

5. **DELETING POST**  
   route:`DELETE /api/auth/post/:postId`  
   params: postId  
   return: json message "Post telah success terhapus!"  
