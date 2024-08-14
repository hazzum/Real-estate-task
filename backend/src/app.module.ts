import { Module } from '@nestjs/common';

import { ApartmentModule } from './apartment/apartment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreModule, UserModule, ApartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
