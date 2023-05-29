import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user.login.dto';
import { injectable } from 'inversify';

// Service - отвечает за бизнес логику
@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// проверка что он есть
		// Если есть - возвращаем null
		// Если нет, создаём
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return false;
	}
}
