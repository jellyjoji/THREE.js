# 패키지 설치

터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.

```jsx
npm i -D @babel/cli @babel/core @babel/preset-env babel-loader clean-webpack-plugin copy-webpack-plugin core-js cross-env html-webpack-plugin source-map-loader terser-webpack-plugin webpack webpack-cli webpack-dev-server
```

```jsx
npm i three
```

# 개발용 서버 구동

터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.

```jsx
npm start
```

# 빌드(배포용 파일 생성)

터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.

```jsx
npm run build
```

(!)
npm start 또는 npm run build 실행 시 에러가 난다면 Node.js를 LTS 버전(장기 지원 버전)으로 설치 후 다시 시도해 보세요.
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르면 설치할 수 있어요.

```jsx
n lts
```

(!)
ERROR in unable to locate '경로...'
위와 같은 에러가 발생한다면, webpack.config.js의 CopyWebpackPlugin에 설정된 파일이 있는지 확인해주세요.
CSS나 이미지 폴더 등이 필요하지 않다면 webpack.config.js에서 CopyWebpackPlugin 부분 전체를 주석 처리 해주세요.

# 참고링크

https://threejs.org/

https://sketchfab.com/
모델링 GLB 로 받아서 사용

https://studiomeal.com/
https://studiomeal.com/blog

# 참고 이미지

![complete img](./completed%20img/image_1_basic_scene.png)
![complete img2](./completed%20img/image_2_near_far.png)

# 완성 이미지

![complete img3](./completed%20img/chair.png)
