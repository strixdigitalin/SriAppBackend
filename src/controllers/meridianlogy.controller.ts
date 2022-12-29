import { uploadFileToCloudinary, uploadToCloudinary, uploadVideoToCloudinary } from './../services/multer.service';
import { CreateMeridianLogyTypeDto } from './../dtos/meridianlogy.dto';
import { MeridianLogy } from './../interfaces/meridianlogy.interface';
import { NextFunction, Request, Response } from 'express';

import MeridianLogyService from '@services/meridianlogy.service';
import { CreateMeridianLogyDto, UpdateMeridianLogyTypeDto } from '@/dtos/meridianlogy.dto';
import { log } from 'console';
class MeridianLogyController {
  public meridianLogyService = new MeridianLogyService();

  public createMeridianlogy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const meridianlogyData: CreateMeridianLogyDto = req.body;
      const createMeridianlogyData: MeridianLogy = await this.meridianLogyService.createMeridianlogy(meridianlogyData);

      res.status(201).json({ data: createMeridianlogyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMeridianlogy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const meridianlogyData: UpdateMeridianLogyTypeDto = req.body;

      const typeId = meridianlogyData.typeId;

      const model3DFiles = req.files['model3D'];
      const videosFiles = req.files['videos'];

      const model3Dlinks = [];
      const videosLinks = [];
      if (model3DFiles)
        for (const model3D of model3DFiles) {
          const url = await uploadToCloudinary(model3D.path);
          model3Dlinks.push(url);
        }
      if (meridianlogyData.availableVideos)
        for (const url of meridianlogyData.availableVideos) {
          videosLinks.push(url);
        }
      if (meridianlogyData.availableModels)
        for (const url of meridianlogyData.availableModels) {
          model3Dlinks.push(url);
        }

      if (videosFiles)
        for (const video of videosFiles) {
          const url = await uploadVideoToCloudinary(video.path);
          videosLinks.push(url);
        }

      const meridianlogy = await this.meridianLogyService.updateMeridianlogy({
        typeId: typeId,
        model3D: model3Dlinks,
        videos: videosLinks,
        _id: meridianlogyData._id,
        name: meridianlogyData.name,
        headToToeOrder: meridianlogyData.headToToeOrder,
      });

      res.status(201).json({ data: meridianlogy, message: 'updated' });
    } catch (error) {
      console.log(error, 'error');
      next(error);
    }
  };

  public createMeridianlogyType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const meridianlogyData: CreateMeridianLogyTypeDto = req.body;
      const model3DFiles = req.files['model3D'];
      const videosFiles = req.files['videos'];

      const model3Dlinks = [];
      const videosLinks = [];
      for (const model3D of model3DFiles) {
        const url = await uploadFileToCloudinary(model3D.path);
        model3Dlinks.push(url);
      }
      for (const video of videosFiles) {
        const url = await uploadVideoToCloudinary(video.path);
        videosLinks.push(url);
      }
      const meridianlogy = await this.meridianLogyService.addMeridianlogyType({
        model3D: model3Dlinks,
        videos: videosLinks,
        _id: meridianlogyData._id,
        name: meridianlogyData.name,
        headToToeOrder: meridianlogyData.headToToeOrder,
      });

      res.status(201).json({ data: meridianlogy, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public getAllMeridianlogy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reflexolgy = await this.meridianLogyService.findMeridianLogy();
      // console.log(reflexolgy)
      // reflexolgy = reflexolgy.map(ref => {
      //   return {
      //     _id: ref._id,
      //     name: ref.name,
      //     description: ref.description,
      //   };
      // });
      res.status(201).json({ data: reflexolgy, message: 'success' });

    } catch (error) {
      next(error);
    }
  };

  public getAllMeridianlogyByid = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const meridianId = req.params.id;
      const meridian = await this.meridianLogyService.findMeridanlogyById(meridianId);

      res.status(201).json({ data: meridian, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMeridianLogy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const meridianlogyId: string = req.params.meridianlogyId;

      const deleteMeridianData: MeridianLogy = await this.meridianLogyService.deleteMeridian(meridianlogyId, typeId);

      res.status(200).json({ data: deleteMeridianData, message: 'deleted' });
    } catch (error) {
      console.log(error, 'errorerror');
      next(error);
    }
  };
}

export default MeridianLogyController;
