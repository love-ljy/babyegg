This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

@tanstack/react-query 是一款强大的库，用于在 React 应用中处理服务器状态的异步数据获取、缓存、同步和更新。这个库主要旨在解决频繁出现的问题，例如数据获取、数据缓存、状态更新、以及数据的后台同步，从而使得开发者可以更专注于构建应用，而不是处理这些常见但复杂的问题。以下是 @tanstack/react-query 的一些主要功能和用途：

1. 数据获取与缓存
@tanstack/react-query 自动处理数据的加载、缓存、重新获取和更新。它可以帮助你减少不必要的网络请求，通过缓存机制优化应用性能和用户体验。

2. 后台数据更新
它支持后台数据更新，即在用户与应用交互时，react-query 可以在后台静默地刷新过时的数据，保证用户总是看到最新的信息。

3. 数据同步
react-query 提供了内置的机制来处理数据的同步和状态的一致性，确保应用中的数据随着用户的操作或预定义的条件自动更新。

4. 自动处理加载状态和错误
它自动管理请求的加载状态和错误状态，开发者可以容易地通过钩子从组件中访问这些状态，并相应地更新 UI。

5. 强大的开发者工具
@tanstack/react-query 提供了一个开发者工具包，可以作为浏览器扩展安装，使开发者能够观察和管理查询状态、缓存数据以及其他与数据获取相关的活动。

6. 查询无效化和数据重新获取
当依赖的数据变更时，你可以很容易地使一个或多个查询无效，这将迫使应用重新获取那些数据，保证数据的最新性。

7. 灵活的查询控制
提供了多种方式来精细控制如何、何时以及为什么进行数据获取和重新获取，例如重试机制、轮询间隔、依赖查询等。

使用示例
这里是一个简单的使用 @tanstack/react-query 进行数据获取的例子：

jsx
Copy code
import { useQuery } from '@tanstack/react-query';

function fetchProjects() {
  return fetch("https://api.example.com/projects")
    .then(res => res.json());
}

function Projects() {
  const { data, error, isLoading } = useQuery(['projects'], fetchProjects);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {data.map(project => (
        <p key={project.id}>{project.name}</p>
      ))}
    </div>
  );
}
在这个例子中，useQuery 钩子用于加载和显示一个项目列表。它处理数据加载时的等待状态、出错状态以及数据的渲染。