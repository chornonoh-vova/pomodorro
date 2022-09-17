# Pomodorro

Simple, lightweight and customizable Pomodoro timer built with React Native

## Features
- Customize duration of focus time, short and long breaks
- Auto starting of the next focus/break
- Customizable number of cycles
- Portrait and landscape friendly
- Background service that keeps running even when activity is closed
- Ongoing notification with countdown
- Transition notifications that are automatically dismissed when auto start is enabled

## Screenshots

| About screen | Main screen | Settings screen |
|---|---|---|
| ![screenshot of about screen](https://user-images.githubusercontent.com/26825416/188320691-d41864fc-f576-4c24-be1c-4b81b40d1ec8.jpg) | ![screenshot of main screen](https://user-images.githubusercontent.com/26825416/188320724-e1fceb6a-c5af-4516-859c-17be97122474.jpg) | ![screenshot of settings screen](https://user-images.githubusercontent.com/26825416/188320748-57f9f5e0-4378-4eea-a5d5-198c95621d8b.jpg) |


## Requirements
- Node v16+ https://nodejs.org/en/
- JDK v11+ https://openjdk.org/
- Android studio and Android SDK Platform 31 https://reactnative.dev/docs/environment-setup

## Development

Initializing project:

```bash
npm install
```

Starting metro server:

```bash
npm start
```

Starting application on device or emulator (Android):

```bash
npm run android
```
