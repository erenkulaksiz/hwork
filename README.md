![logo](https://i.hizliresim.com/47tz4nj.png)

A homework management system made with React Native & Redux. Used Mockapi.io as backend.

## Screenshots

https://drive.google.com/drive/folders/1BfGEINBitcuPoxY3M_aN-GGN0iZDX9RQ?usp=sharing

## Features

- If you log in and close the app, theres no need to log in on next launch of the app
- Ability to sign up as student
- Log in as teacher to give your students homework
- Ability to log in or sign up on same screen
- Ability to remove homeworks
- Ability to make planned homeworks, (e.g. you can put homework to 2 days later)
- Ability to list students under teachers if you log in as principle, you can remove students if you press on them
- Ability to see list of students who got the homework assignment if you log in as teacher and viewing a homework
- Ability to list all homeworks if you log in as principle, if you log in as teacher you will only see your given homeworks
- Ability to select class while signing up as a student, a teacher is automatically assigned to you when you select your class
- Ability to see your assigned and completed homeworks if you log in as student, if you didn't completed them yet, just press on them then press complete

## Known problems

- You cannot select individual students on homework giving student list
- You cannot sign up as teacher or principle
- You cannot send files as homework solutions, only link or a text is allowed since Mockapi.io is used in backend
- You cannot send files in homeworks, only link or a text is allowed same as reasons above
- No tests written for the project
- No proper API
- No error handling & if internet is off, the app will just wait

## Project description

I had to complete the project in 4 days. I've never took a project for a 'limited' time, when i got the project i found myself speedrunning the code. Since i was just speedrunning, i wasnt aware how the code became awful. I am not happy with the code i wrote, but there wasn't proper backend and i needed to simulate the stuff i needed. I was first planning to use React Native & Typescript and Firebase combination, but i never worked with that stack so i know i couldn't finish the project in time if i used that stack, so i just went with the stack i knew (React Native & Redux).
I'm just happy about how the frontend came out like same in Figma, its pixel-perfect.
I first designed the frontend with Figma, then i stuck at some point because i cannot see where the project could go, then i just started making screens while i am coding them without Figma.
I've used Mockapi.io to simulate backend \
https://618c4f3fded7fb0017bb950f.mockapi.io/api/students \
https://618c4f3fded7fb0017bb950f.mockapi.io/api/teachers \
https://618c4f3fded7fb0017bb950f.mockapi.io/api/principle \
https://618c4f3fded7fb0017bb950f.mockapi.io/api/homeworks

## Figma design file

https://www.figma.com/file/lqsnunjuvwTnpLONZWK6rg/HWork?node-id=0%3A1

## How to sign in?

The app uses ID (number) to confirm your identification. \
If you want to log in as student, you can use ID's between 1-54, \
If you want to log in as teacher, you can use ID's between 1-6, \
If you want to log in as principle, you can use ID's between 1-2. \
If you register as a new student, you will automatically sign in while you register. But if you want to log in later, you can check your id from the API: https://618c4f3fded7fb0017bb950f.mockapi.io/api/students

## Installation

First, make sure you have npm, Node.js and React Native CLI installed.

`git clone https://github.com/erenkulaksiz/hwork.git`

`cd hwork && npm install`

`react-native run-android`

No more configurations needed.
Make sure you have a device connected or have an emulator running before calling run-android.
