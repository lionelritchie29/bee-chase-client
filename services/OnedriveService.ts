import axios, { AxiosResponse } from 'axios';
import { BaseService } from './BaseService';
import { v4 as uuidv4 } from 'uuid';
import { FileAnswerData } from '../models/answer-data/FileAnswerData';

export type OnedriveUploadSessionParams = {
  file: File;
  gameId: string;
  gameTeamId: string;
  uploader: string;
  token: string;
};

export type OnedriveUploadBytesParams = {
  token: string;
  uploadUrl: string;
  file: File;
  rangeSize: number;
};

export class OnedriveService extends BaseService {
  private MESSIER_API_URL = 'https://bluejack.binus.ac.id/lapi/API';

  public async getOnedriveToken() {
    const response: AxiosResponse<{ token: string }> = await axios.get(
      `${this.MESSIER_API_URL}/Account/GetOneDriveToken`,
    );
    return response.data;
  }

  public async createUploadSession({
    file,
    gameId,
    gameTeamId,
    uploader,
    token,
  }: OnedriveUploadSessionParams) {
    const path = `/bee_chase/${gameId}/${gameTeamId}`;
    const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);

    const options = {
      path,
      fileName: `${uuidv4()}_${uploader}.${fileExt}`,
      rangeSize: 10 * 1024 * 1024,
    };

    const urlGraph = `https://graph.microsoft.com/v1.0/me/drive/root:${options.path}/${options.fileName}:/createUploadSession`;
    const payload = {
      item: {
        '@microsoft.graph.conflictBehavior': 'replace',
        '@odata.type': 'microsoft.graph.driveItemUploadableProperties',
        name: options.fileName,
      },
    };

    const urlGraphResponse: { uploadUrl: string } = await axios
      .put(urlGraph, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

    return urlGraphResponse;
  }

  public async uploadBytes({
    file,
    rangeSize,
    token,
    uploadUrl,
  }: OnedriveUploadBytesParams): Promise<FileAnswerData> {
    let minBytes = 0;
    let maxBytes = rangeSize - 1;

    while (true) {
      if (maxBytes >= file.size) maxBytes = file.size;

      const fileBlob = file.slice(minBytes, maxBytes);

      const response = await axios
        .put(uploadUrl, fileBlob, {
          headers: {
            'Content-Range': `bytes ${minBytes}-${maxBytes - 1}/${file.size}`,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);

      if (response['nextExpectedRanges'] !== undefined) {
        minBytes = maxBytes;
        maxBytes = minBytes + rangeSize;
      }

      if (response['id'] !== undefined) {
        console.log({ response });
        const fileId = response['id'];
        const downloadURL = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}`;
        const lastModifiedDateTime = response['lastModifiedDateTime'];
        const hash = response['file']['hashes']['quickXorHash'];
        const fileName = response['name'];
        return {
          download_url: downloadURL,
          last_modified_date_time: lastModifiedDateTime,
          hash,
          file_name: fileName,
          mime_type: response['file']['mimeType'],
          size: response['size'],
        };
      }
    }
  }
}
