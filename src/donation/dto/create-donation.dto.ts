import { IsNumber, IsOptional, Min } from "class-validator"

export class CreateDonationDto {

    @IsNumber()
    @Min(0.01, { message: 'Donation amount must be greater than 0' })
    amount: number
    
    @IsOptional()
    @IsNumber()
    UserId: number

}