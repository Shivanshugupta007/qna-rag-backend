import { Module } from '@nestjs/common';
import { IngestionService } from './service/ingestion.service';
import { IngestionController } from './controller/ingestion.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
