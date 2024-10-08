import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ExpensesModule } from './features/expenses/expenses.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,  // Don't use this in production
    }),
    AuthModule,
    UsersModule,
    ExpensesModule
  ],
})
export class AppModule {}
