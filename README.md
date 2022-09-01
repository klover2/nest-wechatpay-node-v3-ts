# nest-qbit

## 安装

`npm install nest-wechatpay-node-v3`

`npm install wechatpay-node-v3`

## 注册

```js
import { WeChatPayModule } from 'nest-wechatpay-node-v3';

@Module({
  imports: [
    WeChatPayModule.registerAsync({
      useFactory: async () => {
        return {
          appid: '直连商户申请的公众号或移动应用appid',
          mchid: '商户号',
          publicKey: fs.readFileSync('./apiclient_cert.pem'), // 公钥
          privateKey: fs.readFileSync('./apiclient_key.pem'), // 秘钥
        };
      },
    }),
  ],
})
export class AppModule {}

// 或者动态配置 useFactory: async (configService: ConfigService)
```

## 交互

`import WxPay from 'wechatpay-node-v3';`

`import { WECHAT_PAY_MANAGER } from 'nest-wechatpay-node-v3';`

`constructor(@Inject(WECHAT_PAY_MANAGER) private wxPay: WxPay) {}`

## 使用

`const res = await this.wxPay.batches_transfer();`
