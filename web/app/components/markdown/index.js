import marked from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.setOptions({ 
    "breaks": true
});

const sanitizeOptions = {
    allowedTags: ["html", "body", "div", "span", "applet", "object", "iframe", "h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "pre", "a", "abbr", "acronym", "address", "big", "cite", "code", "del", "dfn", "em", "img", "ins", "kbd", "q", "s", "samp", "small", "strike", "strong", "sub", "sup", "tt", "var", "b", "u", "i", "center", "dl", "dt", "dd", "ol", "ul", "li", "fieldset", "form", "label", "legend", "table", "caption", "tbody", "tfoot", "thead", "tr", "th", "td", "article", "aside", "canvas", "details", "embed", "figure", "figcaption", "footer", "header", "hgroup", "menu", "nav", "output", "ruby", "section", "summary", "time", "mark", "audio", "video", "br"]
}

export default function(props) {
    return (
        <div 
            className="markdown-body" 
            dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(props.children), sanitizeOptions)}} 
        />
    )
}