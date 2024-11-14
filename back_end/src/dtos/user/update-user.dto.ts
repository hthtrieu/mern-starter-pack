export class UpdateUserDTO {
  email: string | null;
  username: string | null;
  constructor({
    email,
    username,
  }: {
    email: string | null;
    username: string | null;
  }) {
    this.email = email;
    this.username = username;
  }
}
