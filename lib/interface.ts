import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export interface WeChatPayModuleOptions {
  /** 直连商户申请的公众号或移动应用appid。 */
  appid: string;
  /** 商户号 */
  mchid: string;
  /** 证书序列号 */
  serial_no?: string;
  /** 公钥 */
  publicKey: Buffer;
  /** 密钥 */
  privateKey: Buffer;
  /** 认证类型，目前为WECHATPAY2-SHA256-RSA2048 */
  authType?: string;
  /** 自定义请求头 */
  userAgent?: string;
  /** v3回调key */
  key?: string;
}

/**
 * Interface describing a `WeChatPayOptionsFactory`.  Providers supplying configuration
 * options for the WeChatPay module must implement this interface.
 * @publicApi
 */
export interface WeChatPayOptionsFactory {
  createWeChatPayOptions(): Promise<WeChatPayModuleOptions> | WeChatPayModuleOptions;
}

/**
 * Options for dynamically configuring the WeChatPay module.
 * @publicApi
 */
export interface WeChatPayModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * When "true", makes a module global-scoped.
   *
   * Once imported into any module, a global-scoped module will be visible
   * in all modules. Thereafter, modules that wish to inject a service exported
   * from a global module do not need to import the provider module.
   *
   * @default false
   */
  global?: boolean;
  name?: string;
  /**
   * Injection token resolving to an existing provider. The provider must implement
   * the `WeChatPayOptionsFactory` interface.
   */
  useExisting?: Type<WeChatPayOptionsFactory>;
  /**
   * Injection token resolving to a class that will be instantiated as a provider.
   * The class must implement the `WeChatPayOptionsFactory` interface.
   */
  useClass?: Type<WeChatPayOptionsFactory>;
  /**
   * Function returning options (or a Promise resolving to options) to configure the
   * cache module.
   */
  useFactory?: (...args: any[]) => Promise<WeChatPayModuleOptions> | WeChatPayModuleOptions;
  /**
   * Dependencies that a Factory may inject.
   */
  inject?: any[];
  extraProviders?: Provider[];
}
