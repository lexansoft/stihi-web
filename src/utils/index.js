import Cookies from 'js-cookie';

export const getAuthToken = () => Cookies.get('token');
export const getUserId = () => Cookies.get('parsedToken') ? JSON.parse(Cookies.get('parsedToken')).sub : 0;
export const parseMarkdown = (markdownText) => {
    const htmlText = markdownText
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\> (.*$)/gim, '<p>$1</p>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, '<br />')

    return { __html: htmlText.trim() };
};

export default {
    getAuthToken,
    getUserId,
    parseMarkdown
}