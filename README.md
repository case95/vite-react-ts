# React + TypeScript + Vite

Quick project to showcase the use of:

- Vite
- React
- Typescript
- Tailwind
- React Custom Hooks
- Typescript Generics
- React Component Generics
- Atomic Design
- API query

## Technologies

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Extras
I was initially displaying the .gif images but after a lighthouse run I've opted to display the mp4 as it's supposed to have a lighter payload in the assets requests.


I didn't have time for many extra features but I have some comments:

- Add pagination: GIPHY provides offset, total_count and count in the pagination data to handle subsequent cals, I've refactored useSearch to handle a *show more* call but too many gifs playing simultaneously slow the page down, so I've decided not to push it. A solution might be to virtualize the list of video with packages such as react-virtualize (it would have taken too much off-scope time to implement a virtualizer)
- Show skeletons on load: ✅ 
- A user should be able to save and unsave GIFs: global state managers like RTK, RQ, SWR, Zustand help with this task, otherwise saving an array of items in the local storage and querying the local storage on page load works fine too. 
- Add an animation to the "save"  button: tailwind has some basic animations but custom ones can be created by extending the theme. For more complex ones Framer Motion comes in handy.
