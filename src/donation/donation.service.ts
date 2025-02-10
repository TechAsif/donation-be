import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-district.dto';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Injectable()
export class DonationService {

  constructor(
    @InjectRepository(Donation) 
    private readonly donationRepository: Repository<Donation>
  ){

  }

  create(createDonationDto: CreateDonationDto, user: ActiveUserData) {
    createDonationDto.UserId = user.userId
    return this.donationRepository.save(createDonationDto)
  }

  findAll(): Promise<Donation[]> {
    return this.donationRepository.find({
        relations: ['User'],
        select: {
            User: {
                email: true
            }
        }
    });
  }
  
  async findOne(id): Promise<Donation> {
    const donation = await this.donationRepository.findOne({
        where: { id: id },
    })
    if (!donation) {
        throw new NotFoundException(`Donation #${id} not found`)
    }
    return donation;
}

  async findDonationByUserid(id): Promise<Donation[]> {
    const donation = await this.donationRepository.find({
        where: { UserId: id },
    })
    if (!donation) {
        throw new NotFoundException(`Donation of User #${id} not found`)
    }
    return donation;
 } 

  async update(updateDonationDto: UpdateDonationDto) {
    return this.donationRepository.save(updateDonationDto)
  }



  async remove(id: number) {
    const donation = await this.findOne(id)
    return this.donationRepository.remove(donation)
  }

  async getDonationSummary() {
    const totalDonations = await this.donationRepository
      .createQueryBuilder('donation')
      .select('COUNT(*)', 'totalCount')
      .addSelect('SUM(donation.amount)', 'totalAmount')
      .getRawOne();

    const todayDonations = await this.donationRepository
      .createQueryBuilder('donation')
      .select('COUNT(*)', 'todayCount')
      .addSelect('SUM(donation.amount)', 'todayAmount')
      .where('DATE(donation.createdDate) = CURRENT_DATE')
      .getRawOne();

    return {
      total: {
        count: parseInt(totalDonations.totalCount) || 0,
        amount: parseFloat(totalDonations.totalAmount) || 0
      },
      today: {
        count: parseInt(todayDonations.todayCount) || 0,
        amount: parseFloat(todayDonations.todayAmount) || 0
      }
    };
  }

  async getMonthlyDonations(year: number) {
    return this.donationRepository
      .createQueryBuilder('donation')
      .select('EXTRACT(MONTH FROM donation.createdDate)', 'month')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(donation.amount)', 'totalAmount')
      .where('EXTRACT(YEAR FROM donation.createdDate) = :year', { year })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }

  async getTopDonors(limit: number) {
    return this.donationRepository
      .createQueryBuilder('donation')
      .select('user.name', 'donorName')
      .addSelect('user.email', 'donorEmail')
      .addSelect('COUNT(*)', 'donationCount')
      .addSelect('SUM(donation.amount)', 'totalAmount')
      .leftJoin('donation.User', 'user')
      .groupBy('user.id')
      .orderBy('totalAmount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getRecentDonations(limit: number) {
    return this.donationRepository.find({
      relations: ['User'],
      select: {
        id: true,
        amount: true,
        createdDate: true,
        User: {
          name: true,
          email: true
        }
      },
      order: {
        createdDate: 'DESC'
      },
      take: limit
    });
  }
}
