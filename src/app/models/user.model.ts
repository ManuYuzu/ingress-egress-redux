
export class User {

  static fromFirebase( { uid, user, email }: User ) {

    return new User( uid, user, email );
  }

  constructor(
    public uid: string,
    public user: string,
    public email: string,
  ) {}
}
