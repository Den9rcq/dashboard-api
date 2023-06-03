export interface IConfigService {
	get: <string>(key: string) => string;
}
