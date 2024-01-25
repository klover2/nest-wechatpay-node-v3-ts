import { DynamicModule, Module, Provider } from '@nestjs/common';
import { WECHAT_PAY_MANAGER, WECHAT_PAY_MODULE_OPTIONS } from './constants';
import { WeChatPayModuleAsyncOptions, WeChatPayOptionsFactory } from './interface';
import { createWeChatPayManager } from './providers';

@Module({})
export class WeChatPayModule {
  static registerAsync(options: WeChatPayModuleAsyncOptions): DynamicModule {
    return {
      global: !!options.global,
      module: WeChatPayModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), ...(options.extraProviders ?? [])],
      exports: [options?.name ?? WECHAT_PAY_MANAGER],
    };
  }

  private static createAsyncProviders(options: WeChatPayModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options), createWeChatPayManager(options.name)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
        createWeChatPayManager(options.name),
      ];
    }
    return [];
  }

  private static createAsyncOptionsProvider(options: WeChatPayModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: WECHAT_PAY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: WECHAT_PAY_MODULE_OPTIONS,
      useFactory: async (optionsFactory: WeChatPayOptionsFactory) => optionsFactory.createWeChatPayOptions(),
      inject: [options?.useExisting || options?.useClass || ''],
    };
  }
}
