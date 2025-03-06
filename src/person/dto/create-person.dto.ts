export class CreatePersonDto {
    name: string;
    email: string;
    age?: number;
    gender?: string;
    ownerId: string;
}
