**Talk-Back**

**Explanation of the project:**

Developing a **#C Web Api .Net & Angular** to build Talk Back using **SignalR** - Communication between
the server and the client ,using a **JWT Token**, a registration and login screen,displaying all
connected and disconnected users,the possibility of a game(Tic-Tac-Toe) between 2 users and taking 
to each other with a chat between them.

**How to run the project?**

**Server Side:**

1) Open Visual Studio 2022.

2) Open the **TalkBack.Server** file.

3) We need to run all 4 projects of the API.

**How to run multiple projects?**

* Right click on the solution -> Properties -> Mark the option: Multiple startup projects -> In the Action column, change **4** API
  (**Api.TalkBack.User,Api.TalkBack.Contact,Api.TalkBack.Chat,Api.TalkBack.Game**) from None to Start.
4) A **database (SQLServer)** is used and we need to adapt it to our local server,
  The definition of the database server is found in the **appsettings.Json** file
  in the **User and Contact API** where we will have to change to our local server in the **ConnectionString**.
5) Run the project (Ctrl + f5).

**Client Side:**

1) Open Visual Studio Code.
2) Open the **TalkBack.Client** file.
3) Click on Terminal -> New Terminal.
4) Make sure URL ends with **\TalkBack\TalkBack.Client**.
5) Write the command **ng serve**.
6) The local server must be running on **http://localhost:4200/**.
