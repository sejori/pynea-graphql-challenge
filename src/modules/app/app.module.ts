import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from '../auth/auth.module';
import { GravatarModule } from '../gravatar/gravatar.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    AuthModule,
    AuthModule,
    ConfigModule.forRoot(),
    GravatarModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: '../../generated/schema.graphql',
      context: ({ req }) => ({ req }),
      graphiql: true,
    }),
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}