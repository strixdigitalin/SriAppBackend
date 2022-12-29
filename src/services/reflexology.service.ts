import { CreateReflexologHealthTypeDto, CreateBodyTypeAndLocationDto, UpdateReflexologBodyTypeAndLocationDto } from './../dtos/reflexology.dto';
import { Reflexology } from './../interfaces/reflexology.interface';
import { CreateMeridianLogyDto, CreateMeridianLogyTypeDto } from './../dtos/meridianlogy.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import meridianLogyModel from '@models/meridianlogy.model';
import { MeridianLogy } from '@interfaces/meridianlogy.interface';
import reflexologyModel from '@models/reflexology.model';
import { CreateReflexologyDto } from '@/dtos/reflexology.dto';

class ReflexologyService {
  public meridianLogy = meridianLogyModel;

  public reflexology = reflexologyModel;

  public async createReflexology(data: CreateReflexologyDto): Promise<Reflexology> {
    try {
      const reflexology = await this.reflexology.create(data);
      return reflexology;
    } catch (err) {
      throw err;
    }
  }

  public async addReflexologyHealthType(data: CreateReflexologHealthTypeDto): Promise<Reflexology> {
    try {
      const reflexology = await this.reflexology.findOne({ _id: data._id });
      reflexology.types.healthCondition.push({
        description: data.description,
        name: data.name,
        images: data.images,
        title: data.title,
        videos: [],
        headToToeOrder: data.headToToeOrder,
      });

      await reflexology.save();
      return await this.findReflexologyById(data._id);
    } catch (err) {
      throw err;
    }
  }

  // public async updateReflexology(reflexologyData: CreateReflexologyDto): Promise<Reflexology> {
  //   const meridianLogy = await this.reflexology.findOne({ _id: reflexologyData._id });
  //   if (!meridianLogy) {
  //     throw new HttpException(400, "MeridianLogy Not found");
  //   }
  //   console.log(reflexologyData, "reflexologyDatareflexologyData")
  //   if (isEmpty(reflexologyData)) throw new HttpException(400, "You're not MeridianLogy");

  //   const updateReflexoLogyById: Reflexology = await this.reflexology.findByIdAndUpdate(reflexologyData._id, { reflexologyData });
  //   if (!updateReflexoLogyById) throw new HttpException(409, "You're not Reflexo logy");

  //   return updateReflexoLogyById;
  // }

  public async addReflexologyBodyTypeAndLocation(data: CreateBodyTypeAndLocationDto): Promise<Reflexology> {
    try {
      const reflexology = await this.reflexology.findOne({ _id: data._id });
      reflexology.types.bodyPartsAndLocation.push({
        description: data.description,
        name: data.name,
        images: data.images,
        title: data.title,
        videos: [],
        headToToeOrder: data.headToToeOrder,
      });

      await reflexology.save();
      return await this.findReflexologyById(data._id);
    } catch (err) {
      throw err;
    }
  }
  public async updateReflexologyHealthAndCondition(data: UpdateReflexologBodyTypeAndLocationDto): Promise<Reflexology> {
    try {
      let reflexology = await this.reflexology.findOne({ _id: data._id });

      const healthAndCondition = reflexology.types.healthCondition;
      const updatedHealthAndCondtion = [];
      for (const healthCondition of healthAndCondition) {
        if (healthCondition._id == data.typeId) {
          const updatedData = healthCondition;
          if (data.name) {
            updatedData.name = data.name;
          }
          if (data.description) {
            updatedData.description = data.description;
          }
          if (data.title) {
            updatedData.title = data.title;
          }
          if (data.images) {
            updatedData.images = data.images;
          }
          updatedHealthAndCondtion.push(updatedData);
        } else {
          updatedHealthAndCondtion.push(healthCondition);
        }
      }
      reflexology.types.healthCondition = updatedHealthAndCondtion;

      reflexology = await reflexology.save();
      return reflexology;
    } catch (err) {
      throw err;
    }
  }
  public async updateReflexologyBodyParts(data: UpdateReflexologBodyTypeAndLocationDto): Promise<Reflexology> {
    try {
      let reflexology = await this.reflexology.findOne({ _id: data._id });

      const bodyPartsAndLocation = reflexology.types.bodyPartsAndLocation;
      const updatedBodyParts = [];
      for (const bodyParts of bodyPartsAndLocation) {
        if (bodyParts._id == data.typeId) {
          const updatedData = bodyParts;
          if (data.name) {
            updatedData.name = data.name;
          }
          if (data.description) {
            updatedData.description = data.description;
          }
          if (data.title) {
            updatedData.title = data.title;
          }
          if (data.images) {
            updatedData.images = data.images;
          }
          updatedBodyParts.push(updatedData);
        } else {
          updatedBodyParts.push(bodyParts);
        }
      }
      reflexology.types.bodyPartsAndLocation = updatedBodyParts;

      reflexology = await reflexology.save();
      return reflexology;
    } catch (err) {
      throw err;
    }
  }

  public async findReflexologyById(reflexologyId: string): Promise<Reflexology> {
    if (isEmpty(reflexologyId)) throw new HttpException(400, 'There is not reflexologyId');

    const findReflexology: Reflexology = await this.reflexology.findOne({ _id: reflexologyId });
    if (!findReflexology) throw new HttpException(409, 'There is not reflexologyId');

    return findReflexology;
  }

  public async findReflexology(): Promise<Reflexology[]> {
    const findReflexology: Reflexology[] = await this.reflexology.find();

    return findReflexology;
  }

  public async deletereflexologyBodyPartAndLocation(reflexologyId: string, typeId: string): Promise<Reflexology> {
    let reflexology = await this.reflexology.findById({ _id: reflexologyId });

    const bodyPartsAndLocation = reflexology.types.bodyPartsAndLocation;
    const updatedBodyPartsAndLocation = [];
    for (const bodyPart of bodyPartsAndLocation) {
      if (bodyPart._id != typeId) {
        updatedBodyPartsAndLocation.push(bodyPart);
      }
    }
    reflexology.types.bodyPartsAndLocation = updatedBodyPartsAndLocation;
    reflexology = await reflexology.save();
    return reflexology;
  }
  public async deletereflexologyHealthAndConditon(reflexologyId: string, typeId: string): Promise<Reflexology> {
    let reflexology = await this.reflexology.findById({ _id: reflexologyId });

    const healthCondition = reflexology.types.healthCondition;
    const updatedHealthCondition = [];
    for (const healthConditon of healthCondition) {
      if (healthConditon._id != typeId) {
        updatedHealthCondition.push(healthConditon);
      }
    }
    reflexology.types.healthCondition = updatedHealthCondition;
    reflexology = await reflexology.save();
    return reflexology;
  }
}

export default ReflexologyService;
