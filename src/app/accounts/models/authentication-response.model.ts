export interface AuthenticationResponse{
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}