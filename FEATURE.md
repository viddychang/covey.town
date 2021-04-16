#### Feature introduction

The current version of Covey.Town does not have a way for users to communicate with each other using text. Our feature offers users to chat with each other in a public chat room within each town. Additionally, users can privately chat with another user in the town. Users can switch between private and public chats by tab buttons that are included in the user interface. With this new feature, we are adding value to our users who may need to send text snippets to one another for project collaboration as well as increasing accessibility to Covey.Town to people who are Deaf or hard-of-hearing. 

This release of the chat feature includes:
- A dedicated public chat room for each Town.
- The ability to send private messages to other users in the Town.
- The ability to see previous chats that were sent before joining the Town.
- The ability to send emojis in messages.

#### Feature User Guide

This section provides a step by step user guide on how to use the chat feature in Covey.Town.

### Public Chat feature
1. When the user logs in, an icon will appear in the bottom right when clicked on will open up the chat window, where users can send text messages:
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/enter_the_town.png" width=50% height=50%>
</p>
2. By default, when the chat icon is clicked on, the recipient will be set to ‘Everyone’
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/public_chat.png" width=50% height=50%>
</p>
3. From there, a user can type messages in the input box and click the ‘arrow’ next to the input box or ‘return’ on the keyboard to send them to the public chat room:
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/send%20button.png" width=50% height=50%>
</p>
4. Alternatively, a user can also close this window by clicking on the ‘X’ button on the top right of the window. If the user reopens the chat, the messages received/sent during the time the user is logged into the Town will persist to show in the window:
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/close.png" width=50% height=50%>
</p>
5. In addition, if messages were sent to the public chat room before a user logged into the Town, those previous messages will appear in the chat window.

### Private Chat feature
1. At any time a user wants to enter a private chat with another user in the Town, the user can click on the dropdown menu to select a different recipient ordered by first name:
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/private.png" width=50% height=50%>
</p>
2. When a recipient is selected and a message is sent, the message can only be read by the recipient designated and the chat window will show which messages were sent/received privately and to/by whom:

<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/private_sent_messages.PNG" width=50% height=50%>
</p>
3. Just like for public chat messages, private chat messages received/sent when the user is logged in will appear in the window. This includes messages that were sent to the user when the user closed the chat window.

### Emoji Support
1. A fun way to express oneself through chat messages, emoji support! In the lower right-hand corner of the window next to the send button, a user can click on the ‘smiley’ to open up a window of emojis:
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/emoji%20icon.png" width=50% height=50%>
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/emoji%20menu.png" width=50% height=50%>
</p>
2. Once the emoji menu is opened, a user can search our emoji library and then double click on the emoji they want to use and it will be inserted into the input text box. When the user is ready to send the message, send it away!
<p align="center">
  <img src="https://github.com/viddychang/covey.town/blob/master/docs/emoji%20sent.png" width=50% height=50%>
</p>

#### Potential Enhancements
This version of our chat feature solved the core problem, which was to provide users an alternative to communicate versus using voice. However, there are some features that would help enhance the experience for various use cases. This section talks about three enhancements that would deliver additional value to users.
1. Styling options for sent messages - currently, the text sent in a chat message is a predetermined font and standard style. Having styling options such as bold, italicize, or code blocks would help users emphasize certain points. This would be extremely helpful in the use case where two users are working on a programming project and want to send small quick snippets of code. WIth styling options, users can separate the text in their messages as well as put additional meanings to their text content.
2. Group chat room - there are two options for the chat feature, a public chatroom that includes all users in the town and a private chat with one other user. As nice as it is to have a private conversation with another person, life can be more fun with a group! This enhancement would be solving for the use case of creating chat rooms with more than one user so that a group of users can seamlessly chat with one another versus using the public chat room or multiple one on one private chats.
3. @-mention notifications - to round out the chat feature, a notification system where users have an alert notifying them of @-mentions or direct messages would help get users’ attention for important messages. This would look similarly to how other messaging services such as Slack handle notifications.
