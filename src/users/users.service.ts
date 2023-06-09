import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

// Service - отвечает за бизнес логику
@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get<string>('SALT');
		await newUser.setPassword(password, Number(salt));
		// проверка что он есть
		// Если есть - возвращаем null
		// Если нет, создаём
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return false;
	}
}
