import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import Prismic from '@prismicio/client';
import { createClient } from '../../services/prismic';
import styles from './posts.module.scss';

export default function Posts(): JSX.Element {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="/posts">
            <time>12 de março de 2022</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared
            </p>
          </a>
          <a href="/posts">
            <time>12 de março de 2022</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared
            </p>
          </a>
          <a href="/posts">
            <time>12 de março de 2022</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const posts = await client.getAllByType('post');
  console.log('posts', JSON.stringify(posts, null, 2));

  return {
    props: { posts }, // Will be passed to the page component as props
  };
};
