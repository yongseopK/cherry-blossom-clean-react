# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### 🌲 프로젝트 구조

```
cherry-blossom-clean-react
├─ .eslintrc.cjs
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ fonts
│  │  └─ DoHyeon-Regular.ttf
│  ├─ images
│  │  ├─ googleLogin.png
│  │  ├─ kakaoLogin.png
│  │  ├─ memberBackground.jpg
│  │  ├─ mobile-member-background.jpeg
│  │  ├─ naverlogo.png
│  │  └─ trash-icon.png
│  └─ vite.svg
├─ readmeImg
│  ├─ adminMemberList.png
│  ├─ adminReportList.png
│  ├─ loginPage.png
│  ├─ mainPage1.png
│  ├─ mainPage2.png
│  ├─ mainPage3.png
│  ├─ registerPage1.png
│  ├─ registerPage2.png
│  ├─ reportList.png
│  ├─ reportPage1.png
│  ├─ reportPage2.png
│  ├─ userInfoPage1.png
│  ├─ userInfoPage2.png
│  └─ userInfoPage3.png
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ boundary
│  │  │  ├─ andongBoundary.json
│  │  │  ├─ busanBoundary.json
│  │  │  ├─ chuncheonBoundary.json
│  │  │  ├─ daeguBoundary.json
│  │  │  ├─ daejeonBoundary.json
│  │  │  ├─ gangneungBoundary.json
│  │  │  ├─ gwangjuBoundary.json
│  │  │  ├─ incheonBoundary.json
│  │  │  ├─ mokpoBoundary.json
│  │  │  ├─ seogwipoBoundary.json
│  │  │  ├─ seosanBoundary.json
│  │  │  ├─ seoulBoundary.json
│  │  │  ├─ ulsanBoundary.json
│  │  │  └─ yeosuBoundary.json
│  │  └─ react.svg
│  ├─ components
│  │  ├─ blossom-map
│  │  │  ├─ jsx
│  │  │  │  ├─ AdminMemberManagement.jsx
│  │  │  │  ├─ AdminReportList.jsx
│  │  │  │  ├─ CustomOverlay.jsx
│  │  │  │  └─ MapTemplate.jsx
│  │  │  └─ scss
│  │  │     ├─ AdminMemberManagement.scss
│  │  │     ├─ AdminReportList.scss
│  │  │     └─ MapTemplate.scss
│  │  ├─ layout
│  │  │  ├─ jsx
│  │  │  │  ├─ Dropdown.jsx
│  │  │  │  ├─ ErrorPage.jsx
│  │  │  │  ├─ Header.jsx
│  │  │  │  ├─ Modal.jsx
│  │  │  │  ├─ MyInfo.jsx
│  │  │  │  └─ Skeleton.jsx
│  │  │  └─ scss
│  │  │     ├─ Dropdown.scss
│  │  │     ├─ ErrorPage.scss
│  │  │     ├─ Header.scss
│  │  │     ├─ Modal.scss
│  │  │     ├─ MyInfo.scss
│  │  │     └─ WithdrawalModal.scss
│  │  └─ member
│  │     ├─ jsx
│  │     │  ├─ ForgetPassword.jsx
│  │     │  ├─ GoogleLoginComponent.jsx
│  │     │  ├─ Login.jsx
│  │     │  ├─ NaverLogin.jsx
│  │     │  ├─ NaverLoginComponent.jsx
│  │     │  └─ Resister.jsx
│  │     └─ scss
│  │        ├─ Login.scss
│  │        └─ Register.scss
│  ├─ config
│  ├─ index.css
│  ├─ main.jsx
│  └─ util
│     └─ login-util.jsx
└─ vite.config.js
```
