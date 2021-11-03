export class UserModel {
  public id: string;
  public name: string;
  public birthday: string;
  public address: string;
  public email: string;


  public constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
