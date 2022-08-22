import { MediaType } from '../../constants/media-type';
import { SubmissionSource } from '../../constants/submission-source';

export interface FileMissionData {
  media_type: MediaType;
  submission_source: SubmissionSource;
}
