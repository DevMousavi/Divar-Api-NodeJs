class LoginDto {
    userName: string;
    password: string;

    private constructor(body: { userName: string; password: string }) {
        this.userName = body.userName;
        this.password = body.password;
    }

    static create(body: { userName: string; password: string }): LoginDto {
        return new LoginDto(body);
    }
}

export default LoginDto;
