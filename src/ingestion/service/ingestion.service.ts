import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IngestionService {
  private ingestionUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.ingestionUrl =
      this.configService.get<string>('PYTHON_INGESTION_URL') ?? 'http://localhost:8000/ingest';
  }

  async triggerIngestion(documentId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.ingestionUrl, { documentId }),
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message, error.response?.data);
        throw new InternalServerErrorException(error.response?.data || 'Ingestion failed');
      } else if (error instanceof Error) {
        console.error('Unknown error:', error.message);
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('Unexpected ingestion error');
      }
    }
  }
}
