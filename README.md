# Talk-Back

Developed using **C# Web API, Angular and Sql Server**.\
TalkBack is a messaging system that allows users to chat with each other and play Tic-Tac-Toe against each other.\
The system consists of clients that connect to a central application server,\
enabling them to see who is online and choose with whom to talk or play Tic-Tac-Toe.


## Running the Project

To run the **"Talk-Back"** project, execute the following commands:

### Server (C#):

1. Open Visual Studio 2022.

2. Open the **TalkBack.Server** file.

3. To run all 4 projects of the API, follow these steps:

**How to run multiple projects?**
* Right-click on the solution and select Properties.
* Select the option "Multiple startup projects."
* In the Action column, change the value of 4 APIs (Api.TalkBack.User, Api.TalkBack.Contact, Api.TalkBack.Chat, Api.TalkBack.Game) from "None" to "Start."
4. Change my **ConnectionString (appsettings.Json)** to yours in files **User and Contact API**.
5. Run the project using the shortcut Ctrl + F5.

**Client Side:**

1. Open Visual Studio Code.
2. Open the **TalkBack.Client** file.
3. Click on Terminal and select New Terminal.
4. Make sure the URL ends with **\TalkBack\TalkBack.Client**.
5. Type the command **ng serve** and press Enter.
6. The local server must be running on **http://localhost:4200/**.
