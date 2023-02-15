**Talk-Back**

**Explanation of the project:**

Developing a #C Web Api .Net & Angular.

TalkBack is a messaging system that allows users to chat with each other and play Tic-Tac-Toe against each other.
The system consists of clients that connect to a central application server, this allows them to see who is online,
and to choose whom to talk to or play Tic-Tac-Toe against.


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
