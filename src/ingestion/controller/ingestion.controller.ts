import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { IngestionService } from '../service/ingestion.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('ingestion')
@ApiTags('Ingestion')
@ApiBearerAuth('access-token')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger/:documentId')
  @ApiOperation({
    summary: 'Trigger ingestion for a specific document by ID',
    description: 'Calls the Python service to begin document processing.',
  })
  @ApiParam({
    name: 'documentId',
    type: Number,
    example: 1,
    description: 'The ID of the document to ingest',
  })
  triggerIngestion(@Param('documentId', ParseIntPipe) id: number) {
    return this.ingestionService.triggerIngestion(id);
  }
}
