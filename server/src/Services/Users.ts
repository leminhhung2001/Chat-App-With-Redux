import { Socket } from "socket.io";
class UserService {
  users = [];
  generateUserName() {
    const userNum = Math.round(Math.random() * 1000);
    const userName = `user${userNum}`;
    return userName;
  }
  getUsers() {
    return this.users;
  }

  getUser(socketId: string) {
    return new Promise((resolve, reject) => {
      const users = [...this.getUsers()];
      const userIndex = users.findIndex((user) => user.socketId === socketId);
      if (userIndex >= 0) {
        resolve(users[userIndex]);
      } else reject();
    });
  }

  addNewUser(socket: Socket, userName?) {
    if (userName) {
      const userIndex = this.users.findIndex((user) => user.name === userName);
      if (userIndex >= 0) this.addNewUser(socket);
      else {
        this.users.push({
          socketId: socket.id,
          name: userName,
          joined: new Date(socket.handshake.time).getTime(),
        });
        return userName;
      }
    } else {
      const createdUser = this.generateUserName();
      const userIndex = this.users.findIndex(
        (user) => user.name === createdUser
      );
      if (userIndex >= 0) this.addNewUser(socket);
      else {
        this.users.push({
          socketId: socket.id,
          name: userName,
          joined: new Date(socket.handshake.time).getTime(),
        });
        return createdUser;
      }
    }
  }

  changeUserName(socketId: string, newUserName: string) {
    return new Promise((resolve, reject) => {
      const users = [...this.getUsers()];
      const userIndex = users.findIndex((user) => user.socketId === socketId);
      if (userIndex >= 0) {
        const user = users[userIndex];
        user.name = newUserName;
        users.splice(userIndex, 1, user);
        this.users = [...users];
        resolve("Success");
      }
      reject("failure");
    });
  }

  removeUser(socketId: string) {
    return new Promise((resolve, reject) => {
      const userIndex = this.users.findIndex(
        (user) => user.socketId === socketId
      );
      if (userIndex >= 0) {
        const userName = this.users[userIndex].name;
        this.users.splice(userIndex, 1);
        resolve(`User with name ${userName} has left room chat`);
      }
      reject("User not found");
    });
  }
}

export default new UserService();
