import { Refractor, registerLanguage, hasLanguage } from 'react-refractor';
import { ISanityCode } from '@/backend/sanity/fragments/root/common';
import { Syntax } from 'refractor';

import js from 'refractor/lang/javascript.js';
import typescript from 'refractor/lang/typescript';
import tsx from 'refractor/lang/tsx';

// Sanity backend is currently using only these three coding languages
registerLanguage(js);
registerLanguage(typescript);
registerLanguage(tsx);

interface Props {
  code: ISanityCode;
}

export default function CodeElement({ code }: Props) {
  /**
   * ISSUE: Sanity code block does not set a language value by default.
   * We have set 'typescript' as default language in sanity.
   */
  if (!code.language) {
    return (
      <Refractor
        language={'typescript'}
        value={code.code}
        markers={code.highlightedLines}
      />
    );
  }

  let language: Syntax | undefined = undefined;

  switch (code.language) {
    case 'typescript':
      language = typescript;
      break;
    case 'javascript':
      language = js;
      break;
    case 'tsx':
      language = tsx;
      break;
  }

  if (language && hasLanguage(language.displayName)) {
    return (
      <Refractor
        language={code.language}
        value={code.code}
        markers={code.highlightedLines}
      />
    );
  } else {
    return (
      <div className="rounded-5 bg-warning p-4">
        <b>Language not supported!</b>
      </div>
    );
  }
}
