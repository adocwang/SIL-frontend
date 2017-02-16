import CodeMirror from 'codemirror/lib/codemirror.js';
window.CodeMirror = CodeMirror;
import 'codemirror/addon/mode/overlay.js';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/mode/markdown/markdown.js';
// <!-- htmlmixed start -->
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
// <!-- htmlmixed end -->
// <!-- clike start -->
import 'codemirror/mode/clike/clike.js';
import hljs from 'highlight/src/highlight.js';
window.hljs = hljs;
import marked from 'marked';
window.marked = marked;
