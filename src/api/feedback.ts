import express from "express";
import FeedbackService from "../services/feedback";
import asyncHandler from "../utils/async_handle";
import ENDPONTAPI from "../submodule/common/endpoint";
import TTCSconfig from "../submodule/common/config";
import { sendMail } from "../../utils/email";

const feedbackRouter = express.Router();
const feedbackService = new FeedbackService();

feedbackRouter.get(
  ENDPONTAPI.GET_FEEDBACKS,
  asyncHandler(async (req, res) => {
    const { data, count } = await feedbackService.getFeedbacks();
    return res.json({
      data,
      count,
      status: TTCSconfig.STATUS_SUCCESS,
    });
  })
);

feedbackRouter.post(
  ENDPONTAPI.GET_FEEDBACKS_BY_COURSE,
  asyncHandler(async (req, res) => {
    const { data, count } = await feedbackService.getFeedbacksByCourse({
      idCourse: `${req.query.idCourse}`,
    });
    return res.json({
      data,
      count,
      status: TTCSconfig.STATUS_SUCCESS,
    });
  })
);

feedbackRouter.post(
  ENDPONTAPI.GET_FEEDBACKS_BY_TYPE_OR_COURSE,
  asyncHandler(async (req, res) => {
    const { data, count } = await feedbackService.getFeedbacksByTypeOrCourse({
      type: req.query.type as string[],
      idCourse: `${req.query.idCourse}`,
    });
    return res.json({
      data,
      count,
      status: TTCSconfig.STATUS_SUCCESS,
    });
  })
);

feedbackRouter.post(
  ENDPONTAPI.CREATE_FEEDBACK,
  asyncHandler(async (req, res) => {
    const data = await feedbackService.createFeedback(req.body);
    return res.json({
      data,
      status: TTCSconfig.STATUS_SUCCESS,
    });
  })
);
feedbackRouter.post(
  ENDPONTAPI.DELETE_FEEDBACK,
  asyncHandler(async (req, res) => {
    const { data, count } = await feedbackService.deleteFeedback(req.body);
    return res.json({
      data,
      status: TTCSconfig.STATUS_SUCCESS,
    });
  })
);
feedbackRouter.post(
  ENDPONTAPI.FeedbackEmail,
  asyncHandler(async (req, res) => {
    const { email, subject, message } = req.body;
    console.log(email, subject, message);
    const result = await sendMail(email, subject, message);
    return res.json(result);
  })
);

export { feedbackRouter };
