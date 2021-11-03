export class UserAuthentication{
    userName: string;
    password: string;

    public constructor(init? : Partial<UserAuthentication>){
        Object.assign(this,init);
        this.userName = "";
        this.password = "";
    }
}