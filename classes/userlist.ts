import { User } from "./user";

export class Userlist {
    private list: User[] = [];

    constructor() { }

    public addUser(user: User) {
        this.list = [...this.list, user];
        return user;
    }

    public updateNname(id: string, name: string) {
        this.list = this.list.map(user => {
            if (user.id === id) {
                user.name = name;
            }
            return user;
        });
    }

    public getUserlist() {
        return this.list.filter(user => user.name !== 'no-name'); // Filter out users without a name
    }

    public getUser(id: string) {
        return this.list.find(user => {
            return user.id === id
        });
    }

    public getUserByRoom(room: string) {
        return this.list.filter(user => {
            return user.room === room;
        });
    }

    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => {
            return user.id !== id;
        });
        return tempUser;
    }
}