import { UserProfileDto, LoginDto } from "src/mett/communication/types";

export interface IUserState {
	applicationUser: UserProfileDto | null;
	users: UserProfileDto[];
	loginData: LoginDto | null;
}

export interface ILoadUserRequest {
	userId?: number;
	userGuid?: string;
	serverSide?: boolean;
	useCache?: boolean;
}
