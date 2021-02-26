import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AbstractEntryProvider } from './abstract-entry';

@Injectable()
export class Swagger extends AbstractEntryProvider {
  public setup() {
    super._setup();
  }

  public get basePath() {
    return 'doc';
  }

  public getDocumentOptions() {
    // const getConfig = this.getConfig;
    const serverBasePath = this.getConfig('SERVER_BASE_PATH');
    const sessionName = this.getConfig('SESSION_NAME');
    return new DocumentBuilder()
      .setTitle('FEEDx')
      .setDescription('The api document for FEEDx')
      .setVersion('1.0')
      .addServer(serverBasePath)
      .addCookieAuth(sessionName)
      .addBasicAuth()
      .addBearerAuth({
        scheme: 'Bearer',
        type: 'http',
        name: 'Bearer Authentication',
        in: 'header',
      })
      .build();
  }

  public getSetupOptions() {
    return <SwaggerCustomOptions>{
      swaggerOptions: {
        persistAuthorization: true,
      },
      // customCssUrl: '../swagger/swagger.css',
      // customfavIcon: '../swagger/favicon.png',
      customSiteTitle: 'Daylighted',
    };
  }
}
