**Talk-Back Project**

**Project Description:**

Developed a **#C Web API using .NET and Angular**.
<br>
TalkBack is a messaging system that allows users to chat with each other and play Tic-Tac-Toe against each other.
<br>
The system consists of clients that connect to a central application server,
<br>
enabling them to see who is online and choose with whom to talk or play Tic-Tac-Toe.


**How to run the project?**

**Server Side:**

1) Open Visual Studio 2022.

2) Open the **TalkBack.Server** file.

3) To run all 4 projects of the API, follow these steps:

**How to run multiple projects?**
* Right-click on the solution and select Properties.
* Select the option "Multiple startup projects."
* In the Action column, change the value of 4 APIs (Api.TalkBack.User, Api.TalkBack.Contact, Api.TalkBack.Chat, Api.TalkBack.Game) from "None" to "Start."
4) A SQL Server Database is used and you will need to adapt it to your local server,
  database server is defined in the **appsettings.Json** file
  in the **User and Contact API** Change the **ConnectionString** to your local server.
5) Run the project using the shortcut Ctrl + F5.

**Client Side:**

1) Open Visual Studio Code.
2) Open the **TalkBack.Client** file.
3) Click on Terminal and select New Terminal.
4) Make sure the URL ends with **\TalkBack\TalkBack.Client**.
5) Type the command **ng serve** and press Enter.
6) The local server must be running on **http://localhost:4200/**.
