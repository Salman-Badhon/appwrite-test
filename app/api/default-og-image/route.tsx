import { ImageResponse } from 'next/og';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title');

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
