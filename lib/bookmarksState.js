import { createContext, useContext } from 'react';
import { useState } from 'react/cjs/react.development';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function BookmarksStateProvider({ children }) {
    const [bookmarks, setBookmarks] = useState(
        typeof window !== 'undefined' &&
            localStorage.getItem('bookmarks') !== null
            ? [...JSON.parse(localStorage.getItem('bookmarks'))]
            : []
    );

    function addBookmark(bookmark) {
        setBookmarks([...bookmarks, bookmark]);

        const storageBookmarks = [...bookmarks, bookmark];
        if (typeof window !== 'undefined') {
            localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));
        }
    }

    function removeBookmark(articleId) {
        const filteredBookmarks = bookmarks.filter(
            (item) => item.articleId !== articleId
        );
        setBookmarks(filteredBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
    }

    function isBookmarked(articleId) {
        return bookmarks.some((item) => item?.articleId === articleId);
    }

    return (
        <LocalStateProvider
            value={{
                bookmarks,
                setBookmarks,
                addBookmark,
                removeBookmark,
                isBookmarked,
            }}
        >
            {children}
        </LocalStateProvider>
    );
}

function useBookmarks() {
    const all = useContext(LocalStateContext);
    return all;
}

export { BookmarksStateProvider, useBookmarks };
