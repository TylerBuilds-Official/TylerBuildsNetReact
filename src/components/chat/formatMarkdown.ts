/**
 * Lightweight markdown-to-HTML for chat bubbles.
 * Handles: **bold**, *italic*, `inline code`, [links](url), list items, and line breaks.
 */
export function formatMarkdown(text: string): string {
    // Escape HTML entities first
    let result = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Inline code (before bold/italic so backticks aren't processed)
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic (single asterisk, not inside words)
    result = result.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '<em>$1</em>');

    // Links
    result = result.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

    // Bare URLs (https only, not already inside an href)
    result = result.replace(/(?<!")https:\/\/[^\s<)]+/g, '<a href="$&" target="_blank" rel="noreferrer">$&</a>');

    // List items: group consecutive "- " lines into <ul>
    result = result.replace(/(^|\n)(- .+(?:\n- .+)*)/g, (_match, prefix, block) => {
        const items = block
            .split('\n')
            .map((line: string) => `<li>${line.replace(/^- /, '')}</li>`)
            .join('');

        return `${prefix}<ul>${items}</ul>`;
    });

    // Line breaks (for remaining non-list newlines)
    result = result.replace(/\n/g, '<br/>');

    return result;
}
