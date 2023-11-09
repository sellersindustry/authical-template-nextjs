![alt text](https://raw.githubusercontent.com/sellersindustry/authical-template-nextjs/main/banner.png)

# Authical - UI Components (NextJS Template)
This is the **UI Components** for the Authical Authentication Framework. This
NextJS template is a great starting point for building any application
that utilized Authical for authenication. But this repository also consists of
all the React UI components that can be copied into any project, just simply 
copy the `./src/Authical/` directory into any project.


You might also want to check out...
- **[Authical Core](https://github.com/sellersindustry/authical-core)** - Client and Server SDK for calling the backend server
- **[Authical Backend Server](https://github.com/sellersindustry/authical-backend)** - Backend API Service for managing authenication

<br>

### What is Authical?
Authical is an open source authentication framework that uses one-time passwords
to authenicate users. A user can simply enter their email (no matter if they are
a new user or an existing user) and they will receive an email within seconds
with a one-time password (OTP) they can enter to confirm their identity. Authical
is a easy to deploy framework that will manage one-time passwords, sessions, and
user accounts.


<br>

## React Components
- **AuthicalProvider** - Wrapper to provide Authical components with important
    information like the domain of the backend Authical server.
- **IsSignedIn** - Only show content if the user is currently signed in.
- **IsSignedOut** - Only show content if the user is NOT currently signed in.
- **RequireSignedIn** - Redirect the user to the login page if the user is not
    currently signed in.
- **SignOut** - Sign the user out.
- **SignIn** - Sign the user in.
- **UserButton** - Show user favicon and upon click show options to log out and
    manage account settings.
- **UserProfile** - Allow the user to modify their profile.
- **VerifyEmail** - Verify the new email address from verification email.

