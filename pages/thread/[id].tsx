import { useRouter } from 'next/router';
import { FC } from 'react';
import { CategoryType, LineType, Thread } from '~/@types/resources/thread';
import { Layout, CreatedDateTime, Thumbnail, Meta, Category, Hashtag } from '~/molecules/thread';

const { Container, Header, TaskList, Task, Title, SubTitle, MetaList } = Layout;

const mockingData: Thread = {
  id: 123,
  thumbnailUrl:
    'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F99B87D3359AF7F3821B671',
  title: '비사이드 협업 잘하는 방법',
  subTitle: '협업의 A to Z',
  categories: [CategoryType.DEVELOP, CategoryType.DESIGN],
  hashtags: ['해시태그', '해시태그2'],
  contents: [
    {
      type: LineType.TEXT,
      value:
        '동일생산과정 또는 관련된 생산과정에서 다수의 노동자가 계획적으로 협력하는 노동형태이다.',
    },
    {
      type: LineType.IMAGE,
      value: 'https://inline-image.url',
    },
    {
      type: LineType.CODE,
      format: 'javascript',
      value: "function example() { console.log('example') };",
    },
    { type: LineType.DEVIDER },
  ],
  createdDateTime: Date.now(),
};

const ThreadPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return (
    <Container>
      <Header>
        <CreatedDateTime dateTime={mockingData.createdDateTime} />
        <TaskList>
          <Task>편집</Task>
          <Task>토론</Task>
          <Task>히스토리</Task>
        </TaskList>
      </Header>
      {mockingData.thumbnailUrl && <Thumbnail url={mockingData.thumbnailUrl} />}
      <Title>{mockingData.title}</Title>
      {mockingData.subTitle && <SubTitle>{mockingData.subTitle}</SubTitle>}
      <MetaList>
        <Meta label="직군">
          {mockingData.categories.map((categoryType) => (
            <Category key={categoryType} type={categoryType} />
          ))}
        </Meta>
        {mockingData.hashtags.length > 0 && (
          <Meta label="주제태그">
            {mockingData.hashtags.map((hashtag) => (
              <Hashtag key={hashtag} url="/#" title={hashtag} />
            ))}
          </Meta>
        )}
      </MetaList>
    </Container>
  );
};

export default ThreadPage;