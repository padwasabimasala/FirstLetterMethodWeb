import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import capitalize from "@/utils/capitalize";
import firstLetters from "./utils/firstLetters";

// Import the JSON at module initialization so it's loaded into memory when
// the server/worker boots. The file lives under `src/nlt.json`.
import nltData from "./nlt.json";
import type { NLTData } from "../types/nlt.d";

export type AppContext = {
  nlt: NLTData;
};

function nextVerse(book, chapter, verse) {
  const versesInChapter = Object.keys(nltData[book][chapter]);
  const verseIndex = versesInChapter.indexOf(verse.toString());
  if (verseIndex === -1) {
    return null; // Verse not found
  }
  if (verseIndex + 1 < versesInChapter.length) {
    // Next verse in the same chapter
    return {
      book,
      chapter,
      verse: parseInt(versesInChapter[verseIndex + 1], 10),
    };
  } else {
    // Move to the first verse of the next chapter
    const chaptersInBook = Object.keys(nltData[book]);
    const chapterIndex = chaptersInBook.indexOf(chapter.toString());
    if (chapterIndex + 1 < chaptersInBook.length) {
      const nextChapter = chaptersInBook[chapterIndex + 1];
      const firstVerseOfNextChapter = Object.keys(
        nltData[book][nextChapter]
      )[0];
      return {
        book,
        chapter: parseInt(nextChapter, 10),
        verse: parseInt(firstVerseOfNextChapter, 10),
      };
    } else {
      // No more chapters in the book
      return null;
    }
  }
}

function prevVerse(book, chapter, verse) {
  const versesInChapter = Object.keys(nltData[book][chapter]);
  const verseIndex = versesInChapter.indexOf(verse.toString());
  if (verseIndex === -1) {
    return null; // Verse not found
  }
  if (verseIndex > 0) {
    // Previous verse in the same chapter
    return {
      book,
      chapter,
      verse: parseInt(versesInChapter[verseIndex - 1], 10),
    };
  } else {
    // Move to the last verse of the previous chapter
    const chaptersInBook = Object.keys(nltData[book]);
    const chapterIndex = chaptersInBook.indexOf(chapter.toString());
    if (chapterIndex > 0) {
      const prevChapter = chaptersInBook[chapterIndex - 1];
      const versesInPrevChapter = Object.keys(nltData[book][prevChapter]);
      const lastVerseOfPrevChapter =
        versesInPrevChapter[versesInPrevChapter.length - 1];
      return {
        book,
        chapter: parseInt(prevChapter, 10),
        verse: parseInt(lastVerseOfPrevChapter, 10),
      };
    } else {
      // No previous chapters in the book
      return null;
    }
  }
}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // attach preloaded nlt data to the context so routes can access it from memory
    ctx.nlt = nltData as unknown as NLTData;
  },
  render(Document, [
    route("/", Home),
    route("/flm/:book/:chapter/:verse", function ({ request, params, ctx }) {
      const {
        book: nextBook,
        chapter: nextChapter,
        verse: nextVerseNum,
      } = nextVerse(
        capitalize(params.book),
        params.chapter.toString(),
        params.verse.toString()
      ) || {};

      const {
        book: prevBook,
        chapter: prevChapter,
        verse: prevVerseNum,
      } = prevVerse(
        capitalize(params.book),
        params.chapter.toString(),
        params.verse.toString()
      ) || {};

      const verse =
          ctx.nlt[capitalize(params.book)]?.[params.chapter.toString()]?.[
            params.verse.toString()
          ]
        || "Verse not found";

      return (
        <>
          <a href={`/flm/${prevBook}/${prevChapter}/${prevVerseNum}`}>
            Previous Verse
          </a>

          <a href={`/flm/${nextBook}/${nextChapter}/${nextVerseNum}`}>
            Next Verse
          </a>
          <h1>
            {capitalize(params.book)} {params.chapter}:{params.verse}
          </h1>
          <h1>{firstLetters(verse)}</h1>
          <h1>{verse}</h1>
        </>
      );
    }),
  ]),
]);
