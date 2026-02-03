import { ISanitySchemaMarkup } from '@/backend/sanity/fragments/root/schema-markup/interface';

interface Props {
  schemaMarkups?: ISanitySchemaMarkup['schemaMarkupDefinitions'];
}

export function SchemaMarkupScript({ schemaMarkups }: Props) {
  return (
    <>
      {!!schemaMarkups?.length &&
        schemaMarkups.map((schema, i) => {
          return (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: schema.code }}
            />
          );
        })}
    </>
  );
}
