class SendOtpDto {
    public mobile: string;

    private constructor(body: { mobile: string }) {
        this.mobile = body.mobile;
    }

    static create(body: { mobile: string }): SendOtpDto {
        return new SendOtpDto(body);
    }
}

export default SendOtpDto;
