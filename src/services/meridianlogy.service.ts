import { CreateMeridianLogyDto, CreateMeridianLogyTypeDto, UpdateMeridianLogyTypeDto } from './../dtos/meridianlogy.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import meridianLogyModel from '@models/meridianlogy.model';
import { MeridianLogy } from '@/interfaces/meridianlogy.interface';

class MeridianLogyService {
  public meridianLogy = meridianLogyModel;

  public async createMeridianlogy(data: CreateMeridianLogyDto): Promise<MeridianLogy> {
    try {
      const meridianLogy = await this.meridianLogy.create(data);
      return meridianLogy;
    } catch (err) {
      throw err;
    }
  }

  public async updateMeridianlogy(data: UpdateMeridianLogyTypeDto): Promise<MeridianLogy> {
    try {
      let meridianLogy = await this.meridianLogy.findOne({ _id: data._id });
      const types = meridianLogy.types;
      const updatedBodyParts = [];
      for (const type of types) {
        if (type._id == data.typeId) {
          const updatedData = type;
          if (data.name) {
            updatedData.name = data.name;
          }

          if (data.videos) {
            updatedData.videos = data.videos;
          }
          if (data.model3D) {
            updatedData.model3D = data.model3D;
          }
          updatedBodyParts.push(updatedData);
        } else {
          updatedBodyParts.push(type);
        }
      }
      meridianLogy.types = updatedBodyParts;

      meridianLogy = await meridianLogy.save();

      return await this.findMeridanlogyById(data._id);
    } catch (err) {
      throw err;
    }
  }

  public async removeItemOnce(arr, value) {
    for (const array of arr) {
      const index = array.id.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
  }

  public async addMeridianlogyType(data: CreateMeridianLogyTypeDto): Promise<MeridianLogy> {
    try {
      const meridianLogy = await this.meridianLogy.findOne({ _id: data._id });

      meridianLogy.types.push({
        model3D: data.model3D,
        videos: data.videos,
        name: data.name,
        headToToeOrder: 1,
      });
      await meridianLogy.save();
      return await this.findMeridanlogyById(data._id);
    } catch (err) {
      throw err;
    }
  }

  public async findMeridanlogyById(meridianLogyId: string): Promise<MeridianLogy> {
    if (isEmpty(meridianLogyId)) throw new HttpException(400, 'There is not meridianlogy');

    const findMeridanlogy: MeridianLogy = await this.meridianLogy.findOne({ _id: meridianLogyId });
    if (!findMeridanlogy) throw new HttpException(409, 'There is not meridianlogy');

    return findMeridanlogy;
  }

  public async findMeridianLogy(): Promise<any> {
    const findMeridanlogy: MeridianLogy[] = await this.meridianLogy.find();

    return findMeridanlogy[0].types;
  }

  public async deleteMeridian(meridianId: string, id: string): Promise<MeridianLogy> {
    let meridianlogy = await this.meridianLogy.findById({ _id: meridianId });

    const types = meridianlogy.types;
    const updatedBodyPartsAndLocation = [];
    for (const bodyPart of types) {
      if (bodyPart._id != id) {
        updatedBodyPartsAndLocation.push(bodyPart);
      }
    }
    meridianlogy.types = updatedBodyPartsAndLocation;
    meridianlogy = await meridianlogy.save();
    return meridianlogy;
  }
}

export default MeridianLogyService;
