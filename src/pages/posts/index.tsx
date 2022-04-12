import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { RichText } from 'prismic-dom';
import { createClient } from '../../services/prismic';
import styles from './posts.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.slug} href="/posts">
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });
  const response = await client.getAllByType('post');

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: post.data.content.map(item =>
        item.body.map(i => (i.type === 'paragraph' ? i.text : ''))
      ),
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
