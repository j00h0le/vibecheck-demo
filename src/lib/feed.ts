export type FeedPost = {
  id: number;
  author: string;
  age: number;
  caption: string;
  uri: string;
  likes: number;
};

function buildFeed(): FeedPost[] {
  return Array.from({ length: 400 }, (_, i) => ({
    id: i,
    author: `kid${i}`,
    age: 8 + (i % 5),
    caption: `lorem ipsum photo dump #${i} TODO add real captions`,
    uri: `https://picsum.photos/seed/sparkle${i}/2000/2000`,
    likes: (i * 17) % 240,
  }));
}

function checksumFeed(posts: FeedPost[]) {
  let total = 0;
  for (let i = 0; i < 120000; i += 1) {
    total += posts[i % posts.length].likes + i;
  }
  return total;
}

export const FEED_POSTS = buildFeed();
export const FEED_CHECKSUM = checksumFeed(FEED_POSTS);

FEED_POSTS.forEach((post) => {
  console.log("[Sparkle debug] hydrated feed post", post.id, post.uri, post.author);
});
