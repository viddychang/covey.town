#### Overview
Our project was centered around adding a chat feature to Covey.Town via a public chat “room” which included all users in the respective town, or privately with one other user in the town. This was accomplished by adding frontend components to the existing Covey.Town codebase. These components were built from scratch and used chakra-ui for custom styling. 

Additionally, to provide persistence and history of the chat messages that appear, we used a MongoDB database to store the messages. Additional changes were made to the server to listen to the communication.

#### High-level Architecture
In this section, we have a diagram of how our feature was implemented from the Frontend to the Backend pieces. In general, there is the main Chat component that will take in a user’s input and is responsible for showing the user all the messages exchanged during the user’s session. From the backend, the client handles the communication with the server and helps to get message data into the Frontend Chat components (chat history). The server listens for new connections from the client and then pushes data to MongoDB as well as retrieve data for the client.
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/chat-arch.png" >
</p>

#### CRC Cards
This section focuses on the classes that were added to the codebase.
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/crc.png" >
</p>

#### Data Model Design
This section includes a diagram of how the MongoDB data model is designed. There are two tables in the database: Messages and Rooms. The Messages table is responsible for storing all chat message data. The Rooms table is responsible for creating rooms for chat messages in the case for a private chat room. 
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/data_model_mdb.png" >
</p>

#### API endpoints to MongoDB
To send and retrieve data to and from MongoDB, we have designed some endpoints to accomplish this:
- GET /fetchAllMessages -- gets all the messages in the database
- GET /fetchAllMessages/:roomId -- gets the messages for a chat room (private)
- POST /message - creates a message record in the database
- POST /room - creates a room record in the database which represents a private chat room
