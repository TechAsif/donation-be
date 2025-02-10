import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DonationService } from './donation.service';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './entities/donation.entity';
import { UpdateDonationDto } from './dto/update-district.dto';
// error==
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Roles(Role.User, Role.SystemAdmin)
  @Post()
  create(@Body() createDonationDto: CreateDonationDto, @ActiveUser() user: ActiveUserData) {
    return this.donationService.create(createDonationDto, user);
  }

  @Roles(Role.SystemAdmin)
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) : Promise<Donation[]> {
      return this.donationService.findAll();
  }

  @Roles(Role.SystemAdmin)
  @Get('by-user/:id')
  findDonationByUserId(@Param('id') id: number): Promise<Donation[]> {
      return this.donationService.findDonationByUserid(id)
  }

  @Roles(Role.User, Role.SystemAdmin)
  @Get('by-me')
  findOwnDonation(@ActiveUser() user: ActiveUserData): Promise<Donation[]> {
      return this.donationService.findDonationByUserid(user.userId)
  }

  @Roles(Role.SystemAdmin)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Donation> {
      return this.donationService.findOne(id)
  }


  @Roles(Role.SystemAdmin)
  @Patch()
  update(@Body() updateDonationDto: UpdateDonationDto) {
    return this.donationService.update(updateDonationDto);
  }

  @Roles(Role.SystemAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationService.remove(+id);
  }

  @Roles(Role.SystemAdmin)
  @Get('analytics/summary')
  getDonationSummary() {
    return this.donationService.getDonationSummary();
  }

  @Roles(Role.SystemAdmin)
  @Get('analytics/monthly')
  getMonthlyDonations(@Query('year') year: number = new Date().getFullYear()) {
    return this.donationService.getMonthlyDonations(year);
  }

  @Roles(Role.SystemAdmin)
  @Get('analytics/top-donors')
  getTopDonors(@Query('limit') limit: number = 10) {
    return this.donationService.getTopDonors(limit);
  }

  @Roles(Role.SystemAdmin)
  @Get('analytics/recent')
  getRecentDonations(@Query('limit') limit: number = 5) {
    return this.donationService.getRecentDonations(limit);
  }
}
