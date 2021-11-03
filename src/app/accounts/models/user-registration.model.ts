export class UserRegistration{
    name: string;
    username: string;
    email: string;
    birthday: string;
    password: string;
    confirmPassword: string;
    address: string;

    public constructor(init? : Partial<UserRegistration>){
        Object.assign(this,init);
        this.name = "";
        this.username = "";
        this.email = "";
        this.birthday ="";
        this.confirmPassword = "";
        this.address = "";
        this.password = "";
    }
}