import { Card } from '@/examples/card';
import type { ICard } from '@/examples/card/interface';
import { cardProps } from '@/examples/card/story-props';
import { ISanityBlogsPageQueryResponse } from '../../interface';
import { getRelativeURL } from '@/lib/routes';

export default function BlogListSectionBuilder({
  blogs,
}: Pick<ISanityBlogsPageQueryResponse, 'blogs'>) {
  return (
    <div className="section-padding-primary">
      <div
        className={
          'mx-auto grid max-w-[62.5rem] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {blogs.map((blog, index) => {
          const extractedCardContent: ICard = {
            author: blog.authorName,
            content: blog.description,
            date: blog.publishedOn,
            title: blog.title,
            url: getRelativeURL('blog', blog.slug),
            image: cardProps.image,
          };
          return <Card key={index} {...extractedCardContent} />;
        })}
      </div>
    </div>
  );
}
