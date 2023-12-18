# RuoYi-Vue3

## v1.7.1 Bug

1. 配置菜单<strong style="color: #e44272;">路由末尾切记不要不小心加空格</strong>，否则会导致即使第一次点击正常，但是刷新后浏览器会自动去掉路由空格导致 404
2. 文件名最好不要是包含关系，<strong style="color: #e44272;">因为路由一般与文件名保持一致</strong>，意味着路由也会是包含关系，这样会导致接口调用错乱，例如：`/system/page`和`/system/page-user`，如果文件名是`page`和`page-user`，那么路由就会是`/system/page`和`/system/page-user`，这样就会导致`/system/page`接口调用的是`/system/page-user`的接口
3. crudSchemas.columns.search 添加配置不生效

## 登录页通用版

### Login.vue

```vue
<template>
  <div
    :class="prefixCls"
    class="relative h-[100%] lt-xl:bg-[var(--login-bg-color)] lt-md:px-10px lt-sm:px-10px lt-xl:px-10px"
  >
    <div class="relative mx-auto h-full flex">
      <div
        :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px lt-xl:hidden`"
      >
        <!-- 左上角的 logo + 系统标题 -->
        <div class="relative flex items-center text-white">
          <!-- <img alt="" class="mr-10px h-48px w-48px" src="@/assets/imgs/logo.png" /> -->
          <span class="text-20px font-bold">{{
            underlineToHump(appStore.getTitle)
          }}</span>
        </div>
        <!-- 左边的背景图 + 欢迎语 -->
        <div class="h-[calc(100%-60px)] flex items-center justify-center">
          <TransitionGroup
            appear
            enter-active-class="animate__animated animate__bounceInLeft"
            tag="div"
          >
            <img
              key="1"
              alt=""
              class="w-350px"
              src="@/assets/svgs/login-box-bg.svg"
            />
            <div key="2" class="text-3xl text-white">
              {{ t("login.welcome") }}
            </div>
            <div key="3" class="mt-5 text-14px font-normal text-white">
              {{ VITE_APP_TITLE }}
            </div>
          </TransitionGroup>
        </div>
      </div>
      <div
        class="relative flex-1 p-30px dark:bg-[var(--login-bg-color)] lt-sm:p-10px"
      >
        <!-- 右上角的主题、语言选择 -->
        <div
          class="flex items-center justify-between text-white at-2xl:justify-end at-xl:justify-end"
        >
          <div class="flex items-center at-2xl:hidden at-xl:hidden">
            <img
              alt=""
              class="mr-10px h-48px w-48px"
              src="@/assets/imgs/logo.png"
            />
            <span class="text-20px font-bold">{{
              underlineToHump(appStore.getTitle)
            }}</span>
          </div>
          <div class="flex items-center justify-end space-x-10px">
            <ThemeSwitch />
            <LocaleDropdown class="dark:text-white lt-xl:text-white" />
          </div>
        </div>
        <!-- 右边的登录界面 -->
        <Transition
          appear
          enter-active-class="animate__animated animate__bounceInRight"
        >
          <div
            class="m-auto h-full w-[100%] flex items-center at-2xl:max-w-500px at-lg:max-w-500px at-md:max-w-500px at-xl:max-w-500px"
          >
            <!-- 账号登录 -->
            <LoginForm
              class="m-auto h-auto p-20px lt-xl:(rounded-3xl light:bg-white)"
            />
            <!-- 手机登录 -->
            <!-- <MobileForm class="m-auto h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" /> -->
            <!-- 二维码登录 -->
            <!-- <QrCodeForm class="m-auto h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" /> -->
            <!-- 注册 -->
            <RegisterForm
              class="m-auto h-auto p-20px lt-xl:(rounded-3xl light:bg-white)"
            />
            <!-- 三方登录 -->
            <!-- <SSOLoginVue class="m-auto h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" /> -->
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { underlineToHump } from "@/utils";

import { useDesign } from "@/hooks/web/useDesign";
import { useAppStore } from "@/store/modules/app";
import { ThemeSwitch } from "@/layout/components/ThemeSwitch";
import { LocaleDropdown } from "@/layout/components/LocaleDropdown";

import { LoginForm, RegisterForm } from "./components";

defineOptions({ name: "Login" });

const { t } = useI18n();
const appStore = useAppStore();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("login");

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-login;

.#{$prefix-cls} {
  overflow: auto;

  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url("@/assets/svgs/login-bg.svg");
      background-position: center;
      background-repeat: no-repeat;
      content: "";
    }
  }
}
</style>
```

### LoginForm.vue

```vue
<template>
  <el-form
    v-show="getShow"
    ref="formLogin"
    :model="loginData.loginForm"
    :rules="LoginRules"
    class="login-form"
    label-position="top"
    label-width="120px"
    size="large"
  >
    <el-row style="margin-right: -10px; margin-left: -10px">
      <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <el-form-item>
          <LoginFormTitle style="width: 100%" />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <el-form-item v-if="loginData.tenantEnable === 'true'" prop="tenantName">
          <el-input v-model="loginData.loginForm.tenantName" :placeholder="t('login.tenantNamePlaceholder')"
            :prefix-icon="iconHouse" link type="primary" />
        </el-form-item>
      </el-col> -->
      <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <el-form-item prop="username">
          <el-input
            v-model="loginData.loginForm.username"
            :placeholder="t('login.usernamePlaceholder')"
            :prefix-icon="iconAvatar"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <el-form-item prop="password">
          <el-input
            v-model="loginData.loginForm.password"
            :placeholder="t('login.passwordPlaceholder')"
            :prefix-icon="iconLock"
            show-password
            type="password"
            @keyup.enter="getCode()"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        style="padding-right: 10px; padding-left: 10px; margin-top: -20px; margin-bottom: -20px"
      >
        <el-form-item>
          <el-row justify="space-between" style="width: 100%">
            <el-col :span="6">
              <el-checkbox v-model="loginData.loginForm.rememberMe">
                {{ t("login.remember") }}
              </el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-link style="float: right" type="primary">{{
                t("login.forgetPassword")
              }}</el-link>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <el-form-item>
          <XButton
            :loading="loginLoading"
            :title="t('login.login')"
            class="w-[100%]"
            type="primary"
            @click="getCode()"
          />
        </el-form-item>
      </el-col>
      <Verify
        ref="verify"
        :captchaType="captchaType"
        :imgSize="{ width: '400px', height: '200px' }"
        mode="pop"
        @success="handleLogin"
      />
      <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <el-form-item>
          <XButton
            :title="t('login.btnRegister')"
            class="w-[100%]"
            @click="setLoginState(LoginStateEnum.REGISTER)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { ElLoading } from "element-plus";
import LoginFormTitle from "./LoginFormTitle.vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

import { useIcon } from "@/hooks/web/useIcon";

import * as authUtil from "@/utils/auth";
import { usePermissionStore } from "@/store/modules/permission";
import * as LoginApi from "@/api/login";
import { LoginStateEnum, useFormValid, useLoginState } from "./useLogin";

defineOptions({ name: "LoginForm" });

const { t } = useI18n();
const message = useMessage();
const iconHouse = useIcon({ icon: "ep:house" });
const iconAvatar = useIcon({ icon: "ep:avatar" });
const iconLock = useIcon({ icon: "ep:lock" });
const formLogin = ref();
const { validForm } = useFormValid(formLogin);
const { setLoginState, getLoginState } = useLoginState();
const { currentRoute, push } = useRouter();
const permissionStore = usePermissionStore();
const redirect = ref<string>("");
const loginLoading = ref(false);
const verify = ref();
const captchaType = ref("blockPuzzle"); // blockPuzzle 滑块 clickWord 点击文字

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

const LoginRules = {
  tenantName: [required],
  username: [required],
  password: [required],
};
const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    tenantName: "芋道源码",
    username: "admin",
    password: "admin123",
    captchaVerification: "",
    rememberMe: false,
  },
});

const socialList = [
  { icon: "ant-design:wechat-filled", type: 30 },
  { icon: "ant-design:dingtalk-circle-filled", type: 20 },
  { icon: "ant-design:github-filled", type: 0 },
  { icon: "ant-design:alipay-circle-filled", type: 0 },
];

// 获取验证码
const getCode = async () => {
  // 情况一，未开启：则直接登录
  if (loginData.captchaEnable === "false") {
    await handleLogin({});
  } else {
    // 情况二，已开启：则展示验证码；只有完成验证码的情况，才进行登录
    // 弹出验证码
    verify.value.show();
  }
};
// 获取租户 ID
const getTenantId = async () => {
  if (loginData.tenantEnable === "true") {
    const res = await LoginApi.getTenantIdByName(
      loginData.loginForm.tenantName
    );
    authUtil.setTenantId(res);
  }
};
// 记住我
const getCookie = () => {
  const loginForm = authUtil.getLoginForm();
  if (loginForm) {
    loginData.loginForm = {
      ...loginData.loginForm,
      username: loginForm.username
        ? loginForm.username
        : loginData.loginForm.username,
      password: loginForm.password
        ? loginForm.password
        : loginData.loginForm.password,
      rememberMe: loginForm.rememberMe ? true : false,
      tenantName: loginForm.tenantName
        ? loginForm.tenantName
        : loginData.loginForm.tenantName,
    };
  }
};
// 根据域名，获得租户信息
const getTenantByWebsite = async () => {
  const website = location.host;
  const res = await LoginApi.getTenantByWebsite(website);
  if (res) {
    loginData.loginForm.tenantName = res.name;
    authUtil.setTenantId(res.id);
  }
};
const loading = ref(); // ElLoading.service 返回的实例
// 登录
const handleLogin = async (params) => {
  loginLoading.value = true;
  try {
    await getTenantId();
    const data = await validForm();
    if (!data) {
      return;
    }
    loginData.loginForm.captchaVerification = params.captchaVerification;
    const res = await LoginApi.login(loginData.loginForm);
    if (!res) {
      return;
    }
    loading.value = ElLoading.service({
      lock: true,
      text: "正在加载系统中...",
      background: "rgba(0, 0, 0, 0.7)",
    });
    if (loginData.loginForm.rememberMe) {
      authUtil.setLoginForm(loginData.loginForm);
    } else {
      authUtil.removeLoginForm();
    }
    authUtil.setToken(res);
    if (!redirect.value) {
      redirect.value = "/";
    }
    // 判断是否为SSO登录
    if (redirect.value.indexOf("sso") !== -1) {
      window.location.href = window.location.href.replace(
        "/login?redirect=",
        ""
      );
    } else {
      push({ path: redirect.value || permissionStore.addRouters[0].path });
    }
  } finally {
    loginLoading.value = false;
    loading.value.close();
  }
};

// 社交登录
const doSocialLogin = async (type: number) => {
  if (type === 0) {
    message.error("此方式未配置");
  } else {
    loginLoading.value = true;
    if (loginData.tenantEnable === "true") {
      // 尝试先通过 tenantName 获取租户
      await getTenantId();
      // 如果获取不到，则需要弹出提示，进行处理
      if (!authUtil.getTenantId()) {
        await message
          .prompt("请输入租户名称", t("common.reminder"))
          .then(async ({ value }) => {
            const res = await LoginApi.getTenantIdByName(value);
            authUtil.setTenantId(res);
          });
      }
    }
    // 计算 redirectUri
    // tricky: type、redirect需要先encode一次，否则钉钉回调会丢失。
    // 配合 Login/SocialLogin.vue#getUrlValue() 使用
    const redirectUri =
      location.origin +
      "/social-login?" +
      encodeURIComponent(`type=${type}&redirect=${redirect.value || "/"}`);

    // 进行跳转
    const res = await LoginApi.socialAuthRedirect(
      type,
      encodeURIComponent(redirectUri)
    );
    window.location.href = res;
  }
};
watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string;
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  getCookie();
  getTenantByWebsite();
});
</script>

<style lang="scss" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}

.login-code {
  float: right;
  width: 100%;
  height: 38px;

  img {
    width: 100%;
    height: auto;
    max-width: 100px;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
```
